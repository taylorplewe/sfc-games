<script lang="ts">
  import { onMount } from "svelte";

  import { getTitleDisplayName, getFullImageAssetUrl, getGenreDisplayName } from "../utils";
  import type GameData from "../GameData";
  import type ViewSettings from "../ViewSettings";
  import RadioSlider from "./RadioSlider.svelte";
  import GameListItem from "./GameListItem.svelte";
  import gamesRaw from "../games.json";
  import gamePlayOrderRaw from "../game-play-order.json";
  const games: Record<string, GameData> = gamesRaw;
  const gamePlayOrder: string[] = gamePlayOrderRaw;

  interface Props {
    selectedGame: GameData | null,
    viewSettings: ViewSettings,
  }
  let { selectedGame = $bindable(), viewSettings = $bindable(), }: Props = $props();

  const setSelectedGame = (game: GameData) => {
    viewSettings.scrollY = window.document.scrollingElement?.scrollTop ?? 0;
    selectedGame = game;
  };

  let gamesToDisplay = $derived.by(() => {
    const unorganizedGames = Object.values(games);

    const filteredGames = () => {
      switch (viewSettings.filterBy) {
        case "genre": return unorganizedGames.filter(game => game.genre === viewSettings.selectedGenre);
        case "mapping": return viewSettings.selectedMapping ? mappings[viewSettings.selectedMapping] : unorganizedGames;
        case "played": return unorganizedGames.filter(game => gamePlayOrder.indexOf("played") < gamePlayOrder.indexOf(game.id));
        default: return unorganizedGames;
      }
    };

    switch (viewSettings.orderBy) {
      case "title":
        return filteredGames().toSorted((a, b) => getTitleDisplayName(a).localeCompare(getTitleDisplayName(b)));
      case "playOrder":
        return filteredGames().toSorted((a, b) => gamePlayOrder.indexOf(a.id) - gamePlayOrder.indexOf(b.id));
      case "date":
      default:
        return filteredGames().toSorted((a, b) => new Date(a.releaseDate).valueOf() - new Date(b.releaseDate).valueOf());
    }
  });

  const genres: string[] = [...new Set(Object.values(games).map(({ genre }) => genre))]
    .toSorted((a, b) => getGenreDisplayName(a)?.localeCompare(getGenreDisplayName(b)));
  const mappings = Object.values(games).reduce<Record<string, GameData[]>>((prev, curr) => {
    let key = "";
    if (curr.sizeRomInMebibits <= 16) {
      key += "<= 16Mb ROM";
    } else if (curr.sizeRomInMebibits <= 32) {
      key += "16-32Mb ROM";
    } else {
      key += "> 32Mb ROM";
    }
    if (curr.sizeSramInKibibits === 0) {
      key += "; no SRAM";
    } else {
      key += `; ${curr.sizeSramInKibibits}Kb SRAM`;
    }

    if (key in prev) {
      return {...prev, [key]: [...prev[key], curr]};
    } else {
      return {...prev, [key]: [curr]};
    }
  }, {});

  onMount(() => {
    if (window.document.scrollingElement) {
      window.document.scrollingElement.scrollTop = viewSettings.scrollY;
    }
  });
</script>

<hgroup>
  <h1 class="page-heading">Taylor's list of notable Super Famicom games</h1>
  <p>Never released in the USA</p>
</hgroup>
<nav>
  <details>
    <summary>View options</summary>
    <RadioSlider
      label="View"
      items={[
        { id: "grid", label: "Grid" },
        { id: "list", label: "List" },
      ]}
      bind:selectedItem={viewSettings.mode}
    />
    <RadioSlider
      label="Filter by"
      items={[
        { id: "none", label: "None" },
        { id: "genre", label: "Genre" },
        { id: "mapping", label: "Mapping" },
        { id: "played", label: "Already Played" },
      ]}
      bind:selectedItem={viewSettings.filterBy}
    />
    <RadioSlider
      label="Order by"
      items={[
        { id: "title", label: "Title" },
        { id: "playOrder", label: "Play Order" },
        { id: "date", label: "Release Date" },
      ]}
      bind:selectedItem={viewSettings.orderBy}
    />
    {#if viewSettings.filterBy === "genre"}
      <select bind:value={viewSettings.selectedGenre}>
        {#each genres as genre}
          <option label={getGenreDisplayName(genre)} value={genre}></option>
        {/each}
      </select>
    {:else if viewSettings.filterBy === "mapping"}
      <select bind:value={viewSettings.selectedMapping}>
        {#each Object.entries(mappings) as [mapping]}
          <option label={mapping} value={mapping}></option>
        {/each}
      </select>
    {/if}
  </details>
</nav>
<main>
  {#if viewSettings.mode === "grid"}
    <div class="games">
      {#each gamesToDisplay as game}
        <div
          class="game"
          role="button"
          tabindex="0"
          onclick={() => setSelectedGame(game)}
          onkeydown={({ key }) => (key === "space" || key === "enter") && setSelectedGame(game)}
        >
          <img class={["game-boxart", game.isBoxArtPortrait && "portrait"]} src={getFullImageAssetUrl(game.id, "boxarts-thumb", "jpg")} alt={game.titleEn}>
          <h3 class="game-title">{getTitleDisplayName(game)}</h3>
          <p>{game.titleJp}</p>
          {#if game.titleEn}
            <p>{game.titleJpRomaji}</p>
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <table id="game-list">
      {#each gamesToDisplay as game}
        <GameListItem
          game={game}
          onclick={() => setSelectedGame(game)}
          onkeydown={({ key }) => (key === "space" || key === "enter") && setSelectedGame(game)}
        />
      {/each}
    </table>
  {/if}
</main>

<style>
  hgroup {
    width: max-content;
    margin: 64px auto 32px auto;
  }

  nav {
    width: max-content;
    max-width: 100%;
    box-sizing: border-box;
    margin: 32px auto;

    details {
      padding: 16px;
      overflow: hidden;
      text-align: center;

      > summary {
        cursor: pointer;
      }

      &::details-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }
  }

  main {
    margin: 0 auto 128px auto;
    max-width: 90%;
  }

  table {
    border-spacing: 0;
  }

  .page-heading {
    font-family: "Bebas Neue", "Helvetica", sans-serif;
  }

  .game-title {
    font-size: 18pt;
    font-weight: 600;
    font-style: italic;
  }

  .games {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 48px;
  }
  .game {
    padding: 8px;
    border-radius: 8px;
    margin: auto 0;
    height: max-content;
    text-align: center;
    cursor: pointer;
    transition: scale 0.5s ease;
    &:hover {
      scale: 1.1;
    }
  }
  .game-boxart {
    object-fit: contain;
    width: 100%;
    &.portrait {
      aspect-ratio: 1;
    }
  }

  @media screen and (max-width: 1200px) {
    hgroup {
      width: 100%;
      text-align: center;
      padding: 0 16px;
      box-sizing: border-box;
    }

    .games {
      grid-template-columns: 100%;
    }
  }
</style>

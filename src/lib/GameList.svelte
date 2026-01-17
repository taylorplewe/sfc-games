<script lang="ts">
  import { getTitleDisplayName, getFullImageAssetUrl } from "../utils";
  import type GameData from "../GameData";
  import gamesRaw from "../games.json";
  const games: Record<string, GameData> = gamesRaw;

  interface Props {
    selectedGame: GameData | null,
  }
  let { selectedGame = $bindable() }: Props = $props();

  const setSelectedGame = (game: GameData) => selectedGame = game;
</script>

<hgroup>
  <h1 class="page-heading">Taylor's list of notable Super Famicom games</h1>
  <p>Never released in the USA</p>
</hgroup>
<main>
  <div class="games">
    {#each Object.values(games) as game}
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
</main>

<style>
  main {
    margin: 0 auto 128px auto;
    max-width: 90%;
  }

  hgroup {
    width: max-content;
    margin: 64px auto 128px auto;
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

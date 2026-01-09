<script lang="ts">
  import type GameData from "../GameData";
  import gamesRaw from "../games.json";
  import { getFullImageAssetUrl } from "../utils";
  const games: GameData[] = gamesRaw;

  interface Props {
    selectedGame: GameData | null,
  }
  let { selectedGame = $bindable() }: Props = $props();

  const getGameTitle = (game: GameData) => game.titleEn || game.titleJpRomaji;
  const setSelectedGame = (game: GameData) => selectedGame = game;
</script>

<hgroup>
  <h1 class="page-heading">Taylor's list of notable Super Famicom games</h1>
  <p>Never released in the USA</p>
</hgroup>
<main>
  <div class="games">
    {#each games as game}
      <div
        class="game"
        role="button"
        tabindex="0"
        onclick={() => setSelectedGame(game)}
        onkeydown={({ key }) => (key === "space" || key === "enter") && setSelectedGame(game)}
      >
        <img class={["game-boxart", game.isBoxArtPortrait && "portrait"]} src={getFullImageAssetUrl(game.boxArtImageName, "boxarts-full")} alt={game.titleEn}>
        <h3 class="game-title">{getGameTitle(game)}</h3>
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
    grid-template-columns: repeat(auto-fill, minmax(400px, auto));
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
</style>

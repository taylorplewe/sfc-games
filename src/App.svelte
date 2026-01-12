<script lang="ts">
  import GameList from "./lib/GameList.svelte";
  import GamePage from "./lib/GamePage.svelte";
  import type GameData from "./GameData";
  import gamesRaw from "./games.json";
  const games: Record<string, GameData> = gamesRaw;

  let selectedGame: GameData | null = $state(null);

  const game = new URLSearchParams(window.location.search).get("game");
  if (game && game! in games) {
    selectedGame = games[game!];
  }
</script>

{#if selectedGame === null}
  <GameList bind:selectedGame={selectedGame} />
{:else}
  <GamePage game={selectedGame!} />
{/if}

<style>
</style>

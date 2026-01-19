<script lang="ts">
  import GameList from "./lib/GameList.svelte";
  import GamePage from "./lib/GamePage.svelte";
  import type GameData from "./GameData";
  import gamesRaw from "./games.json";
  const games: Record<string, GameData> = gamesRaw;

  let selectedGame: GameData | null = $state(null);
  let listScrollY: number = $state(0);

  // I previously had:
  // $effect(() => void (window.location.search = selectedGame ? `?game=${selectedGame!.id}` : ""));
  // but that would re-navigate
  $effect(() => {
    const url = new URL(window.location.href);
    if (selectedGame) {
      url.searchParams.set("game", selectedGame!.id);
    } else {
      url.search = "";
    }
    window.history.replaceState(null, "", url);
  });

  const game = new URLSearchParams(window.location.search).get("game");
  if (game && game! in games) {
    selectedGame = games[game!];
  }
</script>

{#if selectedGame === null}
  <GameList bind:selectedGame={selectedGame} bind:listScrollY={listScrollY} />
{:else}
  <GamePage game={selectedGame!} onBack={() => selectedGame = null} />
{/if}

<style>
</style>

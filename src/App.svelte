<script lang="ts">
  import type GameData from "./GameData";
  import GameList from "./lib/GameList.svelte";
  import GamePage from "./lib/GamePage.svelte";

  let selectedGame: GameData | null = $state(null);
</script>

{#if selectedGame === null}
  <GameList bind:selectedGame={selectedGame} />
{:else}
  <GamePage game={selectedGame!} />
{/if}

<style>
</style>

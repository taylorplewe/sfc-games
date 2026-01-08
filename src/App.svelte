<script lang="ts">
import GameData from "./GameData";
import gamesRaw from "./games.json";

const games: GamesData[] = gamesRaw;

const getGameTitle = game => game.titleEn || game.titleJpRomaji;
</script>

<main>
  <div class="games">
    {#each games as game}
      <div class="game">
        <img class="game-boxart" src={game.boxArtUrl}>
        <h3 class="title">{getGameTitle(game)}</h3>
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

.title {
  font-size: 18pt;
  font-weight: 600;
  font-style: italic;
}

.games {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, auto));
  gap: 32px;
}
.game {
  padding: 8px;
  border-radius: 8px;
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
  aspect-ratio: 1;
}
</style>

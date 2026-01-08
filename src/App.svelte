<script lang="ts">
import GameData from "./GameData";
import gamesRaw from "./games.json";
const games: GamesData[] = gamesRaw;

const getGameTitle = game => game.titleEn || game.titleJpRomaji;
let gameBoxArtEls: ImgElement[] = [];
const getIsBoxArtPortrait = (i): boolean => {
  console.log(i);
  // console.log(gameBoxArtEls);
  // console.log(JSON.stringify(gameBoxArtEls[i]));
  console.log(gameBoxArtEls[i]?.clientWidth);
  console.log(gameBoxArtEls[i]?.clientHeight);
  return gameBoxArtEls[i]
    ? gameBoxArtEls[i].clientHeight > gameBoxArtEls[i].clientWidth
    : true;
}
</script>

<hgroup>
  <h1>Taylor's list of notable Super Famicom games</h1>
  <p>Never released in the USA</p>
</hgroup>
<main>
  <div class="games">
    {#each games as game, i}
      <div class="game">
        <img class={["game-boxart", game.isBoxArtPortrait && "portrait"]} src={game.boxArtUrl}>
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

hgroup {
  width: max-content;
  margin: 64px auto 128px auto;
}

.title {
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

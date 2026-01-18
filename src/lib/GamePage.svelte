<script lang="ts">
  import type GameData from "../GameData";
  import { getDisplayDateFromIso, getTitleDisplayName, getGenreDisplayName, getFullImageAssetUrl } from "../utils"

  interface Props {
    game: GameData,
    onBack: Function,
  }
  const { game, onBack }: Props = $props();
</script>

<nav>
  <button class="button-with-icon" onclick={() => onBack()}>
    <svg id="back-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="216" y1="128" x2="40" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline points="112 56 40 128 112 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
    Back
  </button>
</nav>
<main>
  <header>
    <img class={["game-boxart", game.isBoxArtPortrait && "portrait"]} src={getFullImageAssetUrl(game.id, "boxarts-full", "jpg")} alt={game.titleEn}>
    <div id="game-titles">
      <h1>{getTitleDisplayName(game)}</h1>
      <p>{game.titleJp}</p>
      {#if game.titleEn}
        <p>{game.titleJpRomaji}</p>
      {/if}
    </div>
  </header>

  <p id="description">{game.description}</p>

  <div class="gameplay-and-details">
    <img class="gameplay" src={getFullImageAssetUrl(game.id, "gameplay-gifs", "gif")} alt={`${game.titleEn} gameplay`}>
    <div class="game-info">
      <table id="game-info">
        <tbody>
          <tr>
            <td>Release Date</td>
            <td>{getDisplayDateFromIso(game.releaseDate)}</td>
          </tr>
          <tr>
            <td>Developer</td>
            <td>{game.developer}</td>
          </tr>
          <tr>
            <td>Publisher</td>
            <td>{game.publisher}</td>
          </tr>
          <tr>
            <td>Genre</td>
            <td>{getGenreDisplayName(game.genre)}</td>
          </tr>
          <tr>
            <td>How long to beat</td>
            <td>{game.howLongToBeatHrs}hrs</td>
          </tr>
          {#if game.notes.length}
            <tr>
              <td>Notes</td>
              <td>
                <ul>
                  {#each game.notes as fact}
                    <li>{fact}</li>
                  {/each}
                </ul>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
      <table>
        <caption>Technical specifications</caption>
        <tbody>
          <tr>
            <td>Size of ROM (Mb)</td>
            <td>{game.sizeRomInMebibits}</td>
          </tr>
          <tr>
            <td>Size of SRAM (Kb)</td>
            <td>{game.sizeSramInKibibits || "Does not use a save battery"}</td>
          </tr>
          <tr>
            <td>Memory mapping</td>
            <td>{game.isHiRom ? "HiROM" : "LoROM"}</td>
          </tr>
          <tr>
            <td>ROM speed</td>
            <td>{game.isFastRom ? "FastROM" : "SlowROM"}</td>
          </tr>
          <tr>
            <td>Special chips needed?</td>
            <td>
              {#if game.specialChips.length}
                <p>❌ Yes</p>
                <ul>
                  {#each game.specialChips as chip}
                    <li>{chip}</li>
                  {/each}
                </ul>
              {:else}
                ✅ None
              {/if}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</main>

<style>
  nav {
    position: fixed;
    top: 48px;
    left: 48px;
  }

  header {
    display: flex;
    flex-direction: column;
    gap: 32px;

    &:has(.portrait) {
      flex-direction: row;
      align-items: center;
    }
  }

  main {
    margin: 128px auto;
    max-width: 90%;

    display: flex;
    flex-direction: column;
    gap: 64px;
    align-items: center;
  }

  h1 {
    font-style: italic;
  }

  p {
    opacity: 70%;
  }

  table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
  }

  td {
    vertical-align: top;
    width: 50%;

    &:first-child {
      opacity: 50%;
      text-align: right;
    }
    &:last-child {
      padding-left: 16px;
    }
  }

  .game-boxart {
    object-fit: contain;
    max-width: 100%;
    width: calc(400px * 2);

    &.portrait {
      width: calc(220px * 2)
    }
  }

  .gameplay-and-details {
    display: grid;
    grid-template-columns: max-content auto;
    gap: 64px;
  }

  #back-arrow {
    width: 1em;
  }

  #description {
    width: calc(400px * 2);
    max-width: 100%;
  }

  .gameplay {
    image-rendering: pixelated;
    width: calc(256px * 3);
    max-width: 100%;
  }

  .game-info {
    display: flex;
    flex-direction: column;
    gap: 32px;

    & caption {
      margin-bottom: 16px;
    }
  }

  @media screen and (max-width: 1200px) {
    header {
      &:has(.portrait) {
        flex-direction: column;
      }
    }

    .game-boxart {
      width: 100%;
      &.portrait {
        aspect-ratio: 1;
      }
    }

    .gameplay-and-details {
      display: flex;
      flex-direction: column;
    }
  }
</style>

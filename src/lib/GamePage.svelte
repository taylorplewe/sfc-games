<script lang="ts">
  import type GameData from "../GameData";
  import { getDisplayDateFromIso, getTitleDisplayName, getGenreDisplayName, getFullImageAssetUrl } from "../utils"

  interface Props {
    game: GameData,
  }
  const { game }: Props = $props();
</script>

<main>
  <header>
    <img class={["game-boxart", game.isBoxArtPortrait && "portrait"]} src={getFullImageAssetUrl(game.id, "boxarts-full")} alt={game.titleEn}>
    <h1>{getTitleDisplayName(game)}</h1>
    <p>{game.titleJp}</p>
    {#if game.titleEn}
      <p>{game.titleJpRomaji}</p>
    {/if}
  </header>

  <p>{game.description}</p>

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
      {#if game.funFacts.length}
        <tr>
          <td>Fun facts</td>
          <td>
            <ul>
              {#each game.funFacts as fact}
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
</main>

<style>
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
    width: 100%;
    &.portrait {
      aspect-ratio: 1;
    }
  }
</style>

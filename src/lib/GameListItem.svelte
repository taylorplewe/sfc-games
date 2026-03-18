<script lang="ts">
  import { getFullImageAssetUrl, getTitleDisplayName, getUsdDisplayText, getDisplayDateFromIso } from "../utils";
  import type GameData from "../GameData";
  import type { KeyboardEventHandler, MouseEventHandler } from "svelte/elements";

  interface Props {
    game: GameData,
    onclick: MouseEventHandler<HTMLTableRowElement>,
    onkeydown: KeyboardEventHandler<HTMLTableRowElement>,
    showDate: boolean,
    showLength: boolean,
    showPrice: boolean,
  }

  const {
    game,
    onclick,
    onkeydown,
    showDate,
    showPrice,
    showLength,
  }: Props = $props();
</script>

<tr onclick={onclick} onkeydown={onkeydown}>
  <td><img class="game-boxart" src={getFullImageAssetUrl(game.id, "boxarts-thumb", "jpg")} alt={game.titleEn}></td>
  <td>{getTitleDisplayName(game)}</td>
  {#if showDate}
    <td>{getDisplayDateFromIso(game.releaseDate)}</td>

  {:else if  showPrice}
    <td>{getUsdDisplayText(game.priceBoxedCopy)}</td>
  {:else if showLength}
    <td>{`${game.howLongToBeatHrs}hrs`}</td>
  {/if}
</tr>

<style>
  tr {
    padding: 8px;
    cursor: pointer;
    background-color: #ffffff00;
    transition: background-color 0.5s;

    &:hover {
      background-color: #ffffff22;
    }
  }
  td {
    padding-top: 8px;
    padding-bottom: 8px;
    &:first-child {
      padding-left: 8px;
    }
    &:not(:first-child) {
      padding-left: 32px;
    }
    &:last-child {
      padding-right: 8px;
    }
  }
  img {
    width: 64px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 4px;
  }
</style>

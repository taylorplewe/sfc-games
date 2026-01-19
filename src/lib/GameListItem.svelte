<script lang="ts">
  import { getFullImageAssetUrl } from "../utils";
  import type GameData from "../GameData";
  import type { KeyboardEventHandler, MouseEventHandler } from "svelte/elements";

  interface Props {
    game: GameData,
    onclick: MouseEventHandler<HTMLTableRowElement>,
    onkeydown: KeyboardEventHandler<HTMLTableRowElement>,
  }

  const { game, onclick, onkeydown }: Props = $props();
</script>

<tr onclick={onclick} onkeydown={onkeydown}>
  <td><img class="game-boxart" src={getFullImageAssetUrl(game.id, "boxarts-thumb", "jpg")} alt={game.titleEn}></td>
  <td>{game.titleEn}</td>
</tr>

<style>
  tr {
    padding: 8px;
    cursor: pointer;
    background-color: #ffffff00;
    transition: background-color 0.5s;

    &:not(:first-child) {
      padding-left: 32px;
    }

    &:hover {
      background-color: #ffffff22;
    }
  }
  img {
    width: 64px;
    aspect-ratio: 1;
    object-fit: contain;
  }
</style>

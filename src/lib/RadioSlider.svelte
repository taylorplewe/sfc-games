<script lang="ts">
  interface Item {
    id: string,
    label: string,
  }
  interface Props {
    label: string,
    items: Item[],
    selectedItem: string,
  }

  let { label, items, selectedItem = $bindable() }: Props = $props();
</script>

<div class="slider">
  <p>{label}</p>
  <div class="container">
    {#each items as item}
      {#if selectedItem === item.id}
        <div class="item selected">
          { item.label }
        </div>
      {:else}
        <button class="item unselected" onclick={() => selectedItem = item.id }>
          { item.label }
        </button>
      {/if}
    {/each}
  </div>
</div>

<style>
  .container {
    border: 1px solid #ffffff22;
    border-radius: 4px;
    width: max-content;
    overflow: hidden;

    display: flex;
  }

  .item {
    padding: 12px 24px;

    &.selected {
      background-color: #ffffff22;
    }
    &.unselected {
      background-color: transparent;
      border-radius: 0;

      &:hover {
        background-color: #ffffff33;
      }
    }
  }
</style>

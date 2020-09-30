<template>
  <div class="SearchWidget">
    <i class="material-icons SearchWidget__button">search</i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchWidget',
});
</script>

<style lang="scss" scoped>
.SearchWidget {
  width: var(--tile-size);
  height: var(--tile-size);
  position: relative;

  &__button {
    position: absolute;
    font-size: calc(var(--tile-size) / 2);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

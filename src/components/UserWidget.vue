<template>
  <div class="UserWidget">
    <i class="material-icons UserWidget__button">person</i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserWidget',
});
</script>

<style lang="scss" scoped>
.UserWidget {
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

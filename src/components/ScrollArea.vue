<template>
  <div
    ref="scrollArea"
    :class="{
      ScrollArea: true,
      'ScrollArea--hideScrollBars': !scrollbars,
      'ScrollArea--disabled': disabled,
      'ScrollArea--center': center,
    }"
    @scroll="onScroll"
  >
    <div class="ScrollArea__scrollPane">
      <slot></slot>
      <div :class="[`a${scrollOffset}`]"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'ScrollArea',
  props: {
    scrollbars: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    scrollOffset: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const scrollArea = ref(null);
    const onScroll = (e: Event) => {
      emit('update:scrollOffset', (e.target as HTMLElement).scrollLeft);
    };

    watch(props, () => {
      if (!scrollArea.value) {
        return;
      }
      (scrollArea.value as unknown as HTMLElement).scrollLeft = props.scrollOffset;
    });

    return {
      onScroll,
      scrollArea,
    };
  },
});
</script>

<style lang="scss" scoped>
.ScrollArea {
  overflow: auto;
  position: relative;

  // Firefox supports the W3C standards on scrollbar styling
  scrollbar-width: thin;
  scrollbar-color: var(--color-gray-4) #0000;

  &::-webkit-scrollbar {
    width: 8px;

    &-track {
      background: #0000;
    }

    &-thumb {
      background: var(--color-gray-4);
    }
  }

  &--hideScrollBars {
    &::-webkit-scrollbar {
      width: 0px;
    }

    scrollbar-width: none;
  }

  &--disabled {
    pointer-events: none;
  }

  &__scrollPane {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &--center > .ScrollArea__scrollPane {
    left: 50%;
    max-width: 1px;
    transform: translateX(-50%);
  }
}
</style>

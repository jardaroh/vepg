<template>
  <scroll-area :scrollbars="false" ::disabled="true" :scrollOffset="scrollOffset">
    <div class="TimeWidget__timeSlots">
      <div v-for="(timeslot, i) in timeslots" :key="i">{{ timeslot.time }}</div>
    </div>
  </scroll-area>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ScrollArea from './ScrollArea.vue';

export default defineComponent({
  name: 'TimeWidget',
  components: {
    ScrollArea,
  },
  props: {
    time: {
      type: Date,
      default: Date.now(),
    },
    scrollOffset: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const timeslots = ref([...Array(24).keys()].map((n, i) => ({
      i,
      time: `${i < 10 ? '0' : ''}${i}:00`,
    })));

    return {
      timeslots,
    };
  },
});
</script>

<style lang="scss" scoped>
.TimeWidget {
    box-shadow: 0 1px inset var(--color-gray-4), 0 -1px inset var(--color-gray-4);
    background: var(--color-gray-2);
    height: calc(var(--tile-size) / 2);

    &__timeSlots {
      display: grid;
      grid-template-columns: repeat(24, 200px);
      height: 100%;

      &>* {
        place-self: center;
        position: relative;

        &::before {
          position: absolute;
          content: "";
          height: 100%;
          width: 1px;
          box-shadow: 1px 0px inset var(--color-gray-4);
          bottom: -100%;
          left: 50%;
        }
      }
    }
}
</style>

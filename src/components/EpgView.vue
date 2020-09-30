<template>
  <div class="EpgView">
    <scroll-area class="EpgView__dateRow"></scroll-area>
    <div class="EpgView__star shadow-right">
      <i class="material-icons">star</i>
    </div>
    <div class="EpgView__channelColumn shadow-right stripedBackground">
      <div v-for="(channel, i) in epgData" :key="i" :style="{
        backgroundImage: `url(${channel.images.LOGO})`,
        color: 'red',
      }"></div>
    </div>
    <scroll-area class="EpgView__contentArea stripedBackground" :center="true" v-model:scroll-offset="scrollOffset">
      <div
        class="EpgView__channelRow"
        v-for="(channel, i) in epgData"
        :key="i"
        :style="{
          top: `calc(var(--tile-size) * ${i})`,
        }"
      >
        <div
          v-for="(schedule, j) in channel.schedules"
          :key="j"
          :class="{
            'EpgView__schedule': true,
            'EpgSchedule': true,
          }"
          :style="scheduleStyle(schedule)"
        >
          <span class="EpgSchedule__title">{{ schedule.title }}</span>
          <span class="EpgSchedule__time">{{ timeAndDuration(schedule.start, schedule.end) }}</span>
        </div>
      </div>
    </scroll-area>
    <time-widget class="TimeWidget" :time="time" :disabled="true" v-model:scroll-offset="scrollOffset" />
    <div class="EpgView__nowButton button" @click="scrollOffset = 0">Now</div>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { defineComponent, ref, watch } from 'vue';
// @ts-ignore vetur doesn't like the .ts extension so ignoring to remove the red squiggly line
import useApi from '../composition/useApi.ts';
// @ts-ignore vetur doesn't like the .ts extension so ignoring to remove the red squiggly line
import useTime from '../composition/useTime.ts';
import ScrollArea from './ScrollArea.vue';
import TimeWidget from './TimeWidget.vue';

export default defineComponent({
  name: 'EpgView',
  components: {
    ScrollArea,
    TimeWidget,
  },
  setup() {
    const scrollOffset = ref(0);
    const epgData = ref([]);
    const { get } = useApi('http://localhost:1337');
    const { time } = useTime();
    const timeAndDuration = (start: number, end: number): string => {
      const s = new Date(start);
      const e = new Date(end);

      return `${s.getUTCHours()}:${s.getUTCMinutes()}-${e.getUTCHours()}:${e.getUTCMinutes()}`;
    };
    const scheduleStyle = (schedule: {start: number, end: number}): object => {
      const minuteDiff = ((schedule.start - time.value.getTime()) / 1000) / 60;

      return {
        left: `${(480 / 60) * (minuteDiff)}px`,
        width: `${(480 / 60) * (((schedule.end - schedule.start) / 1000) / 60 )}px`,
      };
    };

    get('epg').then((response: AxiosResponse) => {
      let totalTime: number = 0;
      let scheduledItems: number = 0;
      response.data.forEach((channel: any) => {
        channel.schedules.forEach((schedule: any) => {
          totalTime += schedule.start as number;
          scheduledItems++;
        });
      });
      time.value.setTime(totalTime / scheduledItems);
      epgData.value = response.data;
    });

    return {
      time,
      epgData,
      timeAndDuration,
      scheduleStyle,
      scrollOffset,
    };
  }
});
</script>

<style lang="scss" scoped>
.EpgView {
  display: grid;
  grid-template-columns: var(--tile-size) auto;
  grid-template-rows: max-content max-content auto;
  grid-template-areas:
    "star dateRow"
    "timeRow timeRow"
    "channelColumn contentArea"
  ;
  background: var(--color-gray-2);

  &__star {
    width: var(--tile-size);
    height: var(--tile-size);
    grid-area: star;
    color: var(--color-gray-4);
    display: grid;
    place-content: center;

    i {
      font-size: 2rem;
    }
  }

  & .TimeWidget {
    grid-area: timeRow;
  }

  &__channelColumn {
    grid-area: channelColumn;
    display: grid;
    grid-template-columns: var(--tile-size);

    & > div {
      height: var(--tile-size);
    }
  }

  &__nowButton {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;
    user-select: none;
  }

  &__channelRow {
    position: absolute;
    height: var(--tile-size);
    box-shadow: 0 -1px inset var(--color-gray-4);

    & .EpgSchedule {
      position: absolute;
      width: 200px;
      height: var(--tile-size);
      overflow: hidden;
      padding: 10px;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: max-content max-content;
      gap: 10px;
      box-shadow: -1px 0px inset var(--color-gray-4), -1px 0px var(--color-gray-4);

      & > span {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 100%;
      }

      &__title {
        font-weight: bold;
      }

      &__time {
        font-size: 0.75rem;
      }
    }
  }
}

.stripedBackground {
  background-image:linear-gradient(var(--color-gray-4) 1px, transparent 1px);
  background-size: 72px 72px;
  background-position-y: -1px;
}
</style>

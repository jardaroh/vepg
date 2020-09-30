<template>
  <div class="MainApp">
    <user-widget />
    <img class="MainApp__logo" :src="logo" />
    <search-widget />
    <component class="MainApp__mainArea" :is="currentComponent" />
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import EpgView from './components/EpgView.vue';
import UserWidget from './components/UserWidget.vue';
import SearchWidget from './components/SearchWidget.vue';
// @ts-ignore this is an image file and not typed
import logo from './assets/images/logo.png';

export default defineComponent({
  name: 'App',
  components: {
    UserWidget,
    SearchWidget,
  },
  setup() {
    const currentComponent = shallowRef(EpgView);

    return {
      currentComponent,
      logo,
    };
  },
});
</script>

<style lang="scss" scoped>
.MainApp {
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: max-content auto max-content;
  grid-template-rows: max-content auto max-content;
  grid-template-areas:
    "user logo search"
    "main main main"
    "nav nav nav"
  ;
  background: #000;
  color: #fff;

  &__logo {
    width: calc(var(--tile-size) * 0.75);
    height: calc(var(--tile-size) * 0.75);
    place-self: center;
  }

  &__mainArea {
    grid-area: main;
  }
}
</style>

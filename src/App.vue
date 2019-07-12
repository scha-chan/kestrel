<template>
  <!-- <div id="app"> -->
  <div id="app" :class="{'dark-theme': darkTheme}">
    <div class="theme-wrapper" @click="toggleTheme">
      <img v-if="darkTheme" src="@/assets/images/moon.svg" alt="Dark theme activated" title="click to toggle theme">
      <img v-else src="@/assets/images/sun.svg" alt="Light theme activated" title="click to toggle theme">
    </div>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import "./assets/styles/index.css"
import "./assets/styles/scroll.css"
import "./assets/styles/input.css"
import "./assets/styles/width.css"

import * as Actions from "./store/StoreActions"
import * as Getters from "./store/StoreGetters"
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      darkTheme: Getters.IS_DARK_THEME
    })
  },
  methods: {
    ...mapActions({
      'toggleTheme': Actions.TOGGLE_DARK_THEME
    })
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}

.theme-wrapper {
  position: absolute;
  top: 8px;
  right: 8px;
  height: 15px;
  width: 15px;
}

.theme-wrapper:hover {
  cursor: pointer;
}

.theme-wrapper img {
  height: 15px;
}

main {
  width: 100%;
  height: 100%;
  background-color: var(--color-background)
}
</style>

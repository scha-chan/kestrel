<template>
  <div id="app">
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

export default {
  name: 'App',
}
</script>

<style>
#app {
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

main {
  width: 100%;
  height: 100%;
  background-color: var(--color-white-faded)
}
</style>

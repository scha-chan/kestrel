<template>
  <div id="base" :class="{navbar}">
    <navbar v-if="navbar"/>
    <side-menu v-else/>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
import SideMenu from "./components/SideMenu"

export default {
  name: 'Base',
  components: {
    'navbar': Navbar,
    'side-menu': SideMenu
  },
  data() {
    return {
      navbar: true
    }
  }
}
</script>

<style>
#base {
  color: #2c3e50;
  width: 100%;
  height: 100%;
  padding-left: var(--height-navbar);
  padding-top: 0;
}

#base.navbar {
  padding-left: 0;
  padding-top: var(--height-navbar);
}

main {
  width: 100%;
  height: 100%;
}
</style>

<template id="side-menu">
  <header>
    <img src="@/assets/images/starling-primary.svg" alt="starling logo">
  </header>
</template>

<script>
  export default {
    name: 'SideMenu',
  }
</script>

<style scoped>

header {
  background: var(--color-black);
  width: var(--height-navbar);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10px;
  padding-top: var(--height-navbar);
  transition: width 0.3s ease-out;
}

img {
  position: absolute;
  top: calc(calc(var(--height-navbar) - 40px) / 2);
  left: calc(calc(var(--height-navbar) - 40px) / 2);
  width: 40px;
}

img:hover {
  cursor: pointer;
}

header:hover {
  width: 200px;
}

</style>

<template>
  <header class="centralized-content">
    <img src="@/assets/images/starling-primary.svg" alt="starling logo">
  </header>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>

header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: var(--height-navbar);
  background: var(--color-black);
}

header img {
  height: 40px;
}

</style>

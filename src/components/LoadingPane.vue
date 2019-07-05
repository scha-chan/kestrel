<template lang="html">
  <div class="loading-pane" :class="{show}">
    <bouncing-loader/>
  </div>
</template>

<script>
import BouncingLoader from "./BouncingLoader"

export default {
  name: 'LoadingPane',
  props: ['show'],
  components: {
    'bouncing-loader': BouncingLoader
  }
}
</script>

<style lang="css" scoped>

.loading-pane {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999;
  background: rgba(131, 133, 170, 0.7);
  visibility: hidden;
  opacity: 0;
  display: none;
}

.show {
  visibility: visible;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

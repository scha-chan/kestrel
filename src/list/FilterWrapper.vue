<template>
  <section>
    <multi-select/>
  </section>
</template>

<script>
import Multiselect from "./Multiselect"

export default {
  name: 'FilterWrapper',
  components: {
    'multi-select': Multiselect
  }
}
</script>

<style lang="css" scoped>
</style>

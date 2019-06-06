<template>
  <div class="checkbox centralized-content" @click="toggle">
    <img src="@/assets/images/tick.svg" v-if="checked">
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  data() {
    return {
      checked: false
    }
  },
  methods: {
    toggle() {
      this.checked = !this.checked
    }
  }
}
</script>

<style lang="css" scoped>

.checkbox {
  width: 20px;
  height: 20px;
  background: white;
  position: relative;
  border-radius: 2px;
  border: 1px solid var(--color-primary)
}

img {
  width: 11px;
}

.checkbox:hover {
  cursor: pointer;
  border: 1px solid var(--color-primary-light)
}

</style>

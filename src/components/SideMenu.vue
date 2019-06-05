<template id="side-menu">
  <header>
    <div v-for="option in options" class="option" @click="goto(option.goto)">
      <div class="image-wrapper">
        <img :src="getImgUrl(option.image)">
      </div>
      <div class="name">{{option.name}}</div>
    </div>
  </header>
</template>

<script>
import router from "@/router"

export default {
  name: 'SideMenu',
  data() {
    return {
      options: [{
        name: '',
        image: 'starling-primary',
        goto: '/'
      },{
        name: 'Dashboard',
        image: 'dashboard-primary',
        goto: 'dashboard'
      },{
        name: 'List',
        image: 'list-primary',
        goto: 'list'
      }]
    }
  },
  methods: {
    getImgUrl(image) {
      return require(`@/assets/images/${image}.svg`)
    },
    goto(path) {
      router.push({path})
    }
  }
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
  transition: width 0.3s ease-out;
}

header:hover {
  width: 200px;
}

.option {
  width: 100%;
  display: flex;
  height: var(--height-navbar);
}

.option:hover {
  cursor: pointer;
}

.option .name {
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;
  color: var(--color-primary);
  opacity: 0;
  display: flex;
  width: 150px;
  margin-left: -150px;
  transition: margin-left 0.3s ease-out, opacity 0.5s ease-out;
}

header:hover .option .name{
  opacity: 1;
  margin-left: 0px;
}

.option .image-wrapper {
  background: var(--color-black);
  z-index: 2;
}

.option img {
  width: 25px;
  margin: calc(calc(var(--height-navbar) - 25px) / 2);
}

.option:first-child img{
  width: 40px;
  margin: calc(calc(var(--height-navbar) - 40px) / 2)
}

</style>

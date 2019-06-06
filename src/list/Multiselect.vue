<template>
  <div class="multiselect" :class="{open}">
    <v-input :changeFn="onSearchQueryChange"/>
    <div class="options-wrapper shadow">
      <div class="option" v-for="option in options">
        <v-checkbox/>
        <span>{{option.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input"
import Checkbox from "@/components/Checkbox"

export default {
  name: 'Multiselect',
  data() {
    return {
      items: [{
        name: 'teste 1',
        value: 1
      },{
        name: 'teste 2',
        value: 2
      },{
        name: 'teste 3',
        value: 3
      },{
        name: 'teste 4',
        value: 4
      },{
        name: 'teste 5',
        value: 5
      },{
        name: 'teste 6',
        value: 6
      },{
        name: 'teste 7',
        value: 7
      },{
        name: 'teste 8',
        value: 8
      }],
      searchQuery: "",
      open: false
    }
  },
  methods: {
    onSearchQueryChange(e) {
      this.searchQuery = e.target.value
    },
    onDocumentClickOpen(e) {
      this.open = this.$el.contains(e.target) || e.target.classList.contains("checkbox-image")
    }
  },
  mounted() {
    document.addEventListener('click', this.onDocumentClickOpen)
  },
  beforeDestroy () {
    document.removeEventListener('click',this.onDocumentClickOpen)
  },
  computed: {
    options() {
      return this.items.filter(item => item.name.includes(this.searchQuery))
    }
  },
  components: {
    'v-input': Input,
    'v-checkbox': Checkbox
  }
}
</script>

<style lang="css" scoped>

.multiselect {
  max-width: 200px;
  width: 100%;
  height: 40px;
  position: relative;
}

.options-wrapper {
  display: none;
  /* display: block; */
  position: absolute;
  top: 60px;
  max-width: 200px;
  width: 100%;
  max-height: 150px;
  overflow: hidden;
  overflow-y: auto;
}

.multiselect.open .options-wrapper{
  display: block;
}

.option {
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
}

.option:nth-child(even) {
  background: var(--color-white-faded)
}

.option:hover {
  cursor: pointer;
}

.option span {
  margin-left: 10px;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>

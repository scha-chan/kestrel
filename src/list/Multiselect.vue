<template>
  <div class="multiselect">
    <v-input :changeFn="testeChange"/>
    <div class="options-wrapper">
      <div class="option" v-for="option in items">
        <v-checkbox/>
        <span>{{option}}</span>
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
      }],
      searchQuery: ""
    }
  },
  methods: {
    testeChange(e) {
      console.log('te')
    }
  },
  computed: {

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

.multiselect:focus-within .options-wrapper{
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

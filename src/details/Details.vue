<template>
  <section>
    <div class="details-list-wrapper shadow">
      <details-list :details="details"/>
    </div>
  </section>
</template>

<script>
import DetailsList from "./DetailsList"
import mock from './Mock'

export default {
  name: 'Details',
  components: {
    'details-list': DetailsList
  },
  computed: {
    details() {
      return mock()
    }
  }

}
</script>

<style lang="css" scoped>

section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.details-list-wrapper {
  max-width: 1500px;
  width: 100%;
  background: white;
  max-height: 80%;
  overflow: auto;
  padding:  0px 10px;
}

</style>

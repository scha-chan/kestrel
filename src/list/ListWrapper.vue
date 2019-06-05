<template>
  <section class="centralized-content">
    <div class="list-wrapper shadow">
      <div class="meta-data-wrapper">
        <div class="list-data">

        </div>
        <div class="filter-wrapper">

        </div>
      </div>
      <div class="list">
        <list/>
      </div>
    </div>
  </section>
</template>

<script>
import List from './List'

  export default {
    name: 'ListWrapper',
    components: {
      List
    }
  }
</script>

<style scoped>


.list-wrapper {
  width: 100%;
  height: 100%;

  max-width: 800px;
  max-height: 900px;
}

.meta-data-wrapper {
  width: 100%;
  height: 30%;
}

.list-data {
  width: 100%;
  height: 35%;
}

.filter-wrapper {
  width: 100%;
  height: 65%;
}

.list {
  width: 100%;
  height: 70%;
}

</style>

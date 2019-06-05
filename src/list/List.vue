<template>
  <section>
    <div class="header">
      <div class="pagination-wrapper">
        <pagination/>
      </div>
    </div>
    <div class="content">
      <div v-for="item in items" class="item" :key="item">
      </div>
    </div>
  </section>
</template>

<script>
import Pagination from "./Pagination"

export default {
  name: 'List',
  components: {
    Pagination
  },
  data() {
    return {
      items: [1,2,3,4,5,6,8,9,10,11,12,13,14]
    }
  }
}
</script>

<style scoped>

.header {
  width: 100%;
  height: 50px;
}

.content {
  width: 100%;
  height: calc(100% - 50px);
  padding-bottom: 20px;
  overflow: hidden;
  overflow-y: auto;
}

.item {
  height: 50px;
}

.item:nth-child(odd) {
  background: var(--color-white-faded);
}

.pagination-wrapper {
  float: right;
  width: 25%;
  height: 100%;
}

</style>

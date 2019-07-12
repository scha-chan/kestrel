<template>
  <div class="pagination">
    <div class="pagination-unit">back</div>
    <div class="pagination-unit">1</div>

    <div class="pagination-unit">{{ellipsisIfDistantFrom(pageFromCurrent(-3), 1)}}</div>

    <div class="pagination-unit">{{pageFromCurrent(-2)}}</div>
    <div class="pagination-unit">{{pageFromCurrent(-1)}}</div>

    <div class="pagination-unit">{{pageFromCurrent(0)}}</div>

    <div class="pagination-unit">{{pageFromCurrent(1)}}</div>
    <div class="pagination-unit">{{pageFromCurrent(2)}}</div>

    <div class="pagination-unit">{{ellipsisIfDistantFrom(pageFromCurrent(3), total)}}</div>

    <div class="pagination-unit">{{total}}</div>
    <div class="pagination-unit">forward</div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['currentPage', 'total'],
  computed: {
    pageFromCurrent() {
      return pageConst => this.pageCurrent + pageConst
    },
    pageCurrent() {
      return this.currentPage || 1
    },
    getPageDefault() {
      return pageConst => {

      }
    },
    ellipsisIfDistantFrom() {
      return (page, reference) => {
        let difference = reference - page
        if(difference > 2 || difference < -2) {
          return "..."
        } else {
          return page
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>

.pagination {
  /* max-width: 500px; */
  height: 50px;
  display: flex;
}

.pagination-unit {
  width: 50px;
  border: 1px solid gray
}
</style>

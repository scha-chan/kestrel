<template>
  <div class="pagination">
    <button class="centralized-content" type="button" @click="previousPage">
      <img src="@/assets/images/back-primary.svg" alt="return 1 page">
    </button>
    <input type="number" :value="currentPage" @input="changeInput">
    <div class="centralized-content">
      de
    </div>
    <div class="centralized-content">
      {{this.totalPages}}
    </div>
    <button class="centralized-content" type="button" @click="nextPage">
      <img src="@/assets/images/next-primary.svg" alt="advance 1 page">
    </button>
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  data() {
    return {
      currentPage: 1,
      totalPages: 37
    }
  },
  methods: {
    changeInput(e) {
      let targetPage = +e.target.value
      if(targetPage > this.totalPages) {
        this.currentPage = this.totalPages
      } else if (targetPage < 0) {
        this.currentPage = 1
      } else {
        this.currentPage = targetPage
      }
    },
    nextPage() {
      if(this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    previousPage() {
      if(this.currentPage > 1) {
        this.currentPage--
      }
    }
  }
}
</script>

<style scoped>

.pagination {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 3px;
}

.pagination div {
  padding: 5px 5px 7px;
  font-size: 22px;
}

input {
  width: 60px;
  margin: 0 10px;
  height: 100%;
  text-align: right;
}

button {
  height: 100%;
  padding: 0px;
  border-radius:  0px;
  background: white;
}

button img {
  width: 25px;
}

</style>

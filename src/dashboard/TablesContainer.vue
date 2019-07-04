<template>
  <div class="tables-container">
    <div class="table shadow-light" v-for="table in tables" :key="table.name">
      <span>{{table.name}}</span>
      <span>Size: {{table.sizeMB}}MB</span>
      <span>Total Records: {{table.totalRecords}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablesContainer',
  props: ["tables"]
}
</script>

<style lang="css" scoped>

.tables-container {
  width: 100%;
  height: fit-content;
  margin: 10px 0px;

  display: flex;
  flex-direction: row;
  overflow-x: auto;

  /* display: flex;       // NO SCROLL
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  overflow-y: auto; */

  padding-bottom: 10px;
}

.table {
  min-width: 200px;
  margin: 0 10px;
  border: 2px solid var(--color-white-faded);
  padding: 10px;
}

.table span {
  float: left;
  clear: left;
  margin: 5px 0px;
  background: white;
}

</style>

<template>
  <div class="dashboard-bar-metadata">
    <div class="title left">
      {{data.name}}
    </div>
    <div class="metadata right">
      <span>Tamanho: {{data.sizeMB}}MB</span>
      <span v-if="data.totalFiles > 0">{{data.totalFiles || 0}} Files</span>
      <span>{{data.totalRecords || 0}} Registros</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardBarMetadata',
  props: ['data']
}
</script>

<style lang="css" scoped>

.dashboard-bar-metadata {
  width: 100%;
  height: 35px;
  margin: 10px 0px;
}

.title {
  font-size: 22px;
}

.metadata {
  display: flex;
}

.metadata span {
  padding: 0px 5px;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.metadata span:first-child {
  border-left: 0px solid white;
}

.metadata span:last-child {
  border-right: 0px solid white;
}

</style>

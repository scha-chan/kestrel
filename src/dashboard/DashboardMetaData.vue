<template>
  <div class="dashboard-meta-data">
    <div class="is-running" :class="{success: running}">
      {{running ? "RUNNING" : "STOPPED"}}
    </div>
    <div class="last-updated">
      Atualizado em: {{lastUpdated}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardMetaData',
  props: ['running', 'selectDataCallback']
}
</script>

<style lang="css" scoped>

.dashboard-meta-data {
  width: 100%;
  height: 100%;
}

.bot-status div {
  float: left;
  margin-right: 12px;
}

.is-running {
  font-weight: 600;
  padding: 5px;
  border-radius: 10px;
  font-size: 16px;
  background: #d71d1d;
  color: white;
}

.last-updated {
  height: 100%;
  align-items: center;
  display: flex;
}

</style>

<template id="dashboard">
  <section>
    <div class="dashboard-bar-container-wrapper">
      <h3>Queue</h3>
      <dashboard-bar-container :data="queue" :type="'queue'"/>
    </div>
    <div class="dashboard-bar-container-wrapper">
      <h3>Response</h3>
      <dashboard-bar-container :data="response" :type="'response'"/>
    </div>
    <div class="dashboard-timeline-wrapper left">
      <dashboard-timeline :timelineTitle="'Entrada na Fila'" :seriesData="timelineFilaAxisAndSeriesAsArray" :nameSerie="'Inserts por Minuto'"/>
    </div>
    <div class="dashboard-timeline-wrapper right">
      <dashboard-timeline :timelineTitle="'Envio Request'" :seriesData="timelineEnvioAxisAndSeriesAsArray" :nameSerie="'Requisições por Minuto'"/>
    </div>

    <tables-container :tables="tables"/>
  </section>
</template>

<script>
import TablesContainer from "./TablesContainer"
import DashboardBarContainer from "./DashboardBarContainer"
import DashboardTimeline from "./DashboardTimeline"
import * as Service from "./DashboardService"

export default {
  name: 'Dashboard',
  components: {
    'tables-container': TablesContainer,
    'dashboard-bar-container': DashboardBarContainer,
    'dashboard-timeline': DashboardTimeline
  },
  data() {
    return {
      service: Service,
      queue: {},
      response: {},
      running: false,
      tables: [],
      timelineEnvio: [],
      timelineFila: []
    }
  },
  computed: {
    timelineEnvioAxisAndSeriesAsArray() {
      return this.service.mergeObjects(this.timelineEnvio)
    },
    timelineFilaAxisAndSeriesAsArray() {
      return this.service.mergeObjects(this.timelineFila)
    },
    teste() {
      return [this.timelineFilaAxisAndSeriesAsArray, this.timelineEnvioAxisAndSeriesAsArray]
    }
  },
  mounted() {
    this.$jsonp("http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=1&dataInicial=01-01-2010&dataFinal=31-12-2020").then(data => {
        this.queue =  data.queue
        this.response =  data.response
        this.running =  data.running
        this.tables =  data.tables
        this.timelineEnvio =  data.timelineEnvio
        this.timelineFila =  data.timelineFila
        this.timelineEnvio.splice()
        this.timelineFila.splice()
    })
  }
}
</script>

<style scoped>

section {
  --max-width: 1600px;

  padding: 10px calc((calc(100% - var(--max-width))) / 2);
}

.dashboard-bar-container-wrapper {
  width: 50%;
  padding: 10px;
  float: left;
}

.dashboard-timeline-wrapper {
  width: 50%;
  height: 500px;
  float: left;
}

.left {
  float: left;
  clear: left;
}

.right {
  float: right;
  clear: right;
}

</style>

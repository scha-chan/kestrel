<template id="dashboard">
  <section>
    <div class="bot-status">
      <div class="is-running" :class="{success: running}">
        {{running ? "RUNNING" : "STOPPED"}}
      </div>
      <div class="last-updated">
        Atualizado em: {{lastUpdated}}
      </div>
    </div>
    <div class="dashboard-bar-container-wrapper shadow">
      <h3>Queue (EFW991)</h3>
      <dashboard-bar-container :data="queue" :type="'queue'"/>
    </div>
    <div class="dashboard-bar-container-wrapper shadow">
      <h3>Response (EFW992)</h3>
      <dashboard-bar-container :data="response" :type="'response'"/>
    </div>
    <div class="dashboard-timeline-wrapper">
      <dashboard-timeline :timelineTitle="'Processamento da Fila de Envio'"
                          :seriesDataFila="timelineFilaAxisAndSeriesAsArray"
                          :seriesDataRequest="timelineEnvioAxisAndSeriesAsArray"
                          :nameSerieFila="'Inserts por Minuto'"
                          :nameSerieRequest="'Requisições por Minuto'"/>
    </div>
   <!-- <div class="dashboard-timeline-wrapper right">
      <dashboard-timeline :timelineTitle="'Envio Request'" :seriesData="timelineEnvioAxisAndSeriesAsArray" :nameSerie="'Requisições por Minuto'"/>
    </div> -->
    <tables-container :tables="tables"/>
  </section>
</template>

<script>
import TablesContainer from "./TablesContainer"
import DashboardBarContainer from "./DashboardBarContainer"
import DashboardTimeline from "./DashboardTimeline"
import DashboardMetaData from "./DashboardMetaData"
import * as Service from "./DashboardService"
import * as LocalStorageService from "./DashboardLocalStorageService"
import moment from "moment"

export default {
  name: 'Dashboard',
  components: {
    'tables-container': TablesContainer,
    'dashboard-bar-container': DashboardBarContainer,
    'dashboard-timeline': DashboardTimeline,
    'dashboard-meta-data': DashboardMetaData
  },
  data() {
    return {
      service: Service,
      localStorageService: LocalStorageService,
      lastUpdated: '',
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
  methods: {
    updateFullState(data) {
      this.lastUpdated = data.lastUpdated || moment().format('MMMM Do YYYY, h:mm:ss a')
      this.queue =  data.queue
      this.response =  data.response
      this.running =  data.running
      this.tables =  data.tables
      this.timelineEnvio =  data.timelineEnvio
      this.timelineFila =  data.timelineFila
      this.timelineEnvio.splice()
      this.timelineFila.splice()
    }
  },
  created() {
    this.updateFullState(this.localStorageService.getFromLocalStorage())
  },
  mounted() {
    this.$jsonp("http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=1&dataInicial=01-01-2010&dataFinal=31-12-2020").then(data => {
      this.updateFullState(data)
      this.localStorageService.saveToLocalStorage(data)
    })
  }
}
</script>

<style scoped>

section {
  --max-width: 1600px;

  /* risos risos */
  /* background-image: url("https://media.giphy.com/media/9YlhdI9SSP0Qw/giphy.gif");
  background-repeat: repeat; */
  /* background-size: cover; */

  padding: 10px calc((calc(100% - var(--max-width))) / 2);
}

.dashboard-bar-container-wrapper {
  width: calc(50% - 20px);
  padding: 10px;
  float: left;
  margin: 10px;
  border-radius: 10px;
  background: white;
}

.dashboard-timeline-wrapper {
  width: calc(100% - 20px);
  height: 500px;
  float: left;
  margin: 10px;
  border-radius: 10px;
  background: white;
  padding-top: 10px;
}

.bot-status {
  margin-left: 10px;
  font-size: 14px;
  width: 100%;
  height: 30px;
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

.left {
  float: left;
  clear: left;
}

.right {
  float: right;
  clear: right;
}

</style>

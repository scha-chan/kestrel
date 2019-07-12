<template id="dashboard">
  <section>
    <loading-pane :show="isLoading"/>
    <dashboard-modal :endpointWrapper="endpointWrapper" :show="modalOpen" :closeModal="closeModal"/>
    <div class="wrapper dashboard-meta-data-wrappe">
      <dashboard-meta-data :running="running"
                           :reloadCallback="loadData"
                           :lastUpdated="lastUpdated"
                           :selectDataCallback="updateData"
                           :dataInicial="dataInicial"
                           :dataFinal="dataFinal"/>
    </div>
    <div class="wrapper dashboard-bar-container-wrapper shadow">
      <dashboard-bar-container :data="queue"
                               :type="'queue'"
                               :openModal="openModal"
                               :setLoading="setLoading"
                               :dataInicial="dataInicial"
                               :dataFinal="dataFinal"
                               :option="2"/>
    </div>
    <div class="wrapper dashboard-bar-container-wrapper shadow">
      <dashboard-bar-container :data="response"
                               :type="'response'"
                               :openModal="openModal"
                               :setLoading="setLoading"
                               :dataInicial="dataInicial"
                               :dataFinal="dataFinal"
                               :option="3"/>
    </div>
    <div class="wrapper dashboard-timeline-wrapper">
      <dashboard-timeline :timelineTitle="'Processamento da Fila de Envio'"
                          :seriesDataFila="timelineFilaAxisAndSeriesAsArray"
                          :seriesDataRequest="timelineEnvioAxisAndSeriesAsArray"
                          :nameSerieFila="'Inserts por Minuto'"
                          :nameSerieRequest="'Requisições por Minuto'"/>
    </div>
    <tables-container :tables="tables"/>
  </section>
</template>

<script>
import TablesContainer from "./TablesContainer"
import DashboardBarContainer from "./dashboardbar/DashboardBarContainer"
import DashboardTimeline from "./DashboardTimeline"
import DashboardMetaData from "@/components/DashboardMetaData"
import * as Service from "./DashboardService"
import * as LocalStorageService from "./DashboardLocalStorageService"
import LoadingPane from "../components/LoadingPane"
import Modal from "./Modal"
import moment from "moment"

export default {
  name: 'Dashboard',
  components: {
    'tables-container': TablesContainer,
    'dashboard-bar-container': DashboardBarContainer,
    'dashboard-timeline': DashboardTimeline,
    'dashboard-meta-data': DashboardMetaData,
    'loading-pane': LoadingPane,
    'dashboard-modal': Modal
  },
  data() {
    return {
      // modalOpen: false,
      // endpointWrapper: {},
      modalOpen: true,
      endpointWrapper: {
        status: 7,
        endpoint: 14
      },
      dataInicial: '',
      dataFinal: '',
      service: Service,
      localStorageService: LocalStorageService,
      lastUpdated: '',
      queue: {},
      response: {},
      running: false,
      tables: [],
      timelineEnvio: [],
      timelineFila: [],
      isLoading: false
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
    updateData(date, dateField) {
      this[dateField] = date
    },
    closeModal() {
      this.modalOpen = false;
    },
    openModal(endpointWrapper) {
      this.modalOpen = true;
      this.modalEndpoint = endpointWrapper
    },
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
    },
    setLoading(bool) {
      this.isLoading = bool
    },
    loadData() {
      this.isLoading = true
      this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=1&dataInicial=${this.dataInicial}&dataFinal=${this.dataFinal}`).then(data => {
        this.updateFullState(data)
        this.localStorageService.saveToLocalStorage(data)
      }).finally(() => [
        this.isLoading = false
      ])
    }
  },
  created() {
    this.updateFullState(this.localStorageService.getFromLocalStorage())
    let hoje = moment().format("DD-MM-YYYY")
    this.dataInicial = hoje
    this.dataFinal = hoje
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>

section {
  --max-width: 1600px;
  padding: 10px calc((calc(100% - var(--max-width))) / 2);
}

.wrapper {
  margin: 10px;
}

.dashboard-bar-container-wrapper {
  width: calc(50% - 20px);
  padding: 10px;
  float: left;
  margin: 10px;
  border-radius: 10px;
  background: var(--color-surface);
  height: fit-content;
}

.dashboard-timeline-wrapper {
  width: calc(100% - 20px);
  height: 500px;
  float: left;
  border-radius: 10px;
  background: var(--color-surface);
  padding-top: 10px;
}

.dashboard-meta-data-wrapper {
  padding: 0px 10px;
  font-size: 14px;
  width: 100%;
  height: 30px;
}

</style>

<template id="dashboard">
  <section>
    <loading-pane :show="isLoading"/>
    <dashboard-modal :notifyDetailsChange="notifyDetailsChange" :details="modalDetails" :endpointWrapper="endpointWrapper" :show="modalOpen" :closeModal="closeModal" :loadDetailsFn="loadDetails"/>
    <div class="wrapper dashboard-meta-data-wrappe">
      <dashboard-meta-data :running="running"
                           :action="action"
                           :reloadCallback="loadData"
                           :stopRun="stopRun"
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
                          :nameSerieFila="'Inserts p/ Minute'"
                          :nameSerieRequest="'Request p/ Minute'"/>
    </div>
    <div v-if="loadedOrders" class="wrapper dashboard-orders-wrapper">
      <dashboard-orders :seriesOrders="seriesOrders" :total="total" :pieColors="pieColors"/>
    </div>
    <div class="tables-container-container" :class="{'has-orders': loadedOrders}">
      <tables-container :tables="tables"/>
    </div>
  </section>
</template>

<script>
import TablesContainer from "./TablesContainer"
import DashboardBarContainer from "./dashboardbar/DashboardBarContainer"
import DashboardTimeline from "./DashboardTimeline"
import DashboardOrders from "./DashboardOrders"
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
    'dashboard-orders': DashboardOrders,
    'dashboard-meta-data': DashboardMetaData,
    'loading-pane': LoadingPane,
    'dashboard-modal': Modal
  },
  data() {
    return {
      // modalOpen: false,
      // endpointWrapper: {},
      modalOpen: false,
      modalDetails: [],
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
      seriesOrders: [],
      running: false,
      action: '',
      tables: [],
      timelineEnvio: [],
      timelineFila: [],
      isLoading: false,
      total: 0,
      pieColors: [],
      loadedOrders: false
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
      this.setLoading(true)
      this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=4&dataInicial=${this.dataInicial}&dataFinal=${this.dataFinal}&idEndpoint=${endpointWrapper.endpoint.idEndpoint}&statusCode=${endpointWrapper.status}`).then(data => {
        this.setLoading(false)
        this.modalDetails = data.details
        this.modalOpen = true;
        this.endpointWrapper = endpointWrapper
      })
    },
    notifyDetailsChange() {
      this.modalDetails.splice()
    },
    loadDetails(dataInicial, dataFinal, idEndpoint, statusCode) {
      return this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=4
        &dataInicial=${dataInicial}
        &dataFinal=${dataFinal}
        &idEndpoint=${idEndpoint}
        &statusCode=${statusCode}`).then(data => {
        this.modalDetails = data.details
      })
    },
    updateFullState(data) {
      this.lastUpdated = data.lastUpdated || moment().format('MMMM Do YYYY, h:mm:ss a')
      this.queue =  data.queue
      this.response =  data.response
      this.running =  data.running
      this.action = ''
      this.tables =  data.tables
      this.timelineEnvio = data.timelineEnvio
      this.timelineFila = data.timelineFila
      this.timelineEnvio.splice()
      this.timelineFila.splice()
    },
    updateOrders(data) {
      this.seriesOrders = []
      this.pieColors = []
      this.total = data.orders.totalOrders
      data.orders.status.forEach(element => {
          if(element.records > 0){
            var arrayChartOrder = []
            arrayChartOrder.push(element.desc, element.percent)
            this.seriesOrders.push(arrayChartOrder)
            if(element.desc == 'Pendente'){
              this.pieColors.push("#1d52d7");
            }
            if(element.desc == 'Erro'){
              this.pieColors.push("#8c1f17");
            }
            if(element.desc == 'Concluído'){
              this.pieColors.push("#42d71d");
            }
            if(element.desc == 'Cancelado'){
              this.pieColors.push("#d7831d");
            }
        }
      });
      if(data.orders.totalOrders > 0){
         this.loadedOrders = true
      }
    },
    setLoading(bool) {
      this.isLoading = bool
    },
    loadData() {
      this.isLoading = true
      this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=1&dataInicial=${this.dataInicial}&dataFinal=${this.dataFinal}`).then(data => {
        this.updateFullState(data)
        this.localStorageService.saveToLocalStorage(data)
        this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=6&dataInicial=${this.dataInicial}&dataFinal=${this.dataFinal}`).then(data => {
          this.updateOrders(data)
      })}).finally(() => {
        this.isLoading = false
      })
    },
    stopRun(){
      this.isLoading = false
      this.action = 'Executing'
      this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=7`).then().finally(() => [
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

.dashboard-orders-wrapper {
  width: calc(50% - 20px);
  width: 50%;
  height: 410px;
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
  float: right;
}

.tables-container-container {
  width: calc(100% - 20px);
  height: 410px;
  float: left;
}

.tables-container-container.has-orders {
  width: calc(50% - 20px);
}


</style>

<template>
  <div class="dashboard-details" :class="{show}">
    <div class="download-csv">
      <img v-if="darkTheme" src="@/assets/images/download-white.svg" title="Baixar relatório completo" @click="downloadCSV(0)">
      <img v-else src="@/assets/images/download.svg" title="Baixar relatório completo" @click="downloadCSV(0)">
    </div>
    <div class="dashboard-title">{{details.status}} <span>Total: {{details.totalRecords}}</span> </div>
    <table>
      <th :key="header" v-for="header in headers">{{header}}</th>
      <th></th>
      <th></th>
      <tr :key="endpoint.idEndpoint" v-for="endpoint in getDetails.endPoints">
        <td :key="header" :class="[headersClasses[header]]" v-for="header in headers">{{endpoint[header]}}</td>
        <td v-if="option == 2">
          <img v-if="darkTheme" src="@/assets/images/search-white.svg" title="Exibir detalhes" @click="exibirDetalhes(endpoint)">
          <img v-else src="@/assets/images/search.svg" title="Exibir detalhes" @click="exibirDetalhes(endpoint)">
        </td>
        <td>
          <img v-if="darkTheme" src="@/assets/images/download-white.svg" title="Baixar relatório" @click="downloadCSV(endpoint)">
          <img v-else src="@/assets/images/download.svg" title="Baixar relatório" @click="downloadCSV(endpoint)">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import fileDownload from "js-file-download"
import * as Getters from "@/store/StoreGetters"
import {mapGetters} from "vuex"

export default {
  name: "DashboardDetails",
  props: ['details', 'show', 'setLoading', 'option', 'dataInicial', 'dataFinal', 'openModal'],
  data() {
    return {
      headers: ["idEndpoint","name","percent","total"],
      headersClasses: {
        idEndpoint: "one-half",
        name: "four-half",
        percent: "one-half",
        total: "one-half"
      }
    }
  },
  methods: {
    downloadCSV(endpoint) {
      this.setLoading(true)
      this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=${this.option}&dataInicial=${this.dataInicial}&dataFinal=${this.dataFinal}&statusCode=${this.details.statusCode}&idEndpoint=${endpoint.idEndpoint}`).then(data => {
        this.$http.get(data.caminhoCsv).then(response => {
          fileDownload(response.body, `${this.details.status}:${endpoint.idEndpoint} - ${endpoint.name}.csv`)
        }).finally(() => this.setLoading(false))
      }).catch(() => this.setLoading(false))
    },
    exibirDetalhes(endpoint) {
      console.log("wtf")
      this.openModal({
        status: this.details.statusCode,
        statusTitle: this.details.status,
        endpoint
      })
    }
  },
  computed: {
    ...mapGetters({
      darkTheme: Getters.IS_DARK_THEME
    }),
    getDetails() {
      return this.details || {endPoints: []}
    }
  }
}
</script>

<style lang="css" scoped>

.dashboard-details {
  width: 100%;
  height: 0;
  visibility: hidden;
  opacity: 0;
  display: none;
  transition: all 0.3s ease-out;
  position: relative;
}

.dashboard-details img {
  width: 15px;
}

.dashboard-details img:hover {
  cursor: pointer;
}

.show {
  opacity: 1;
  height: auto;
  visibility: visible;
  display: block;
}

.download-csv {
  position: absolute;
  top: 0;
  right: 15px;
}

.dashboard-title {
  font-size: 20px;
  padding: 0px 10px 10px 10px;
  margin-bottom: 5px;
  border-bottom: 1px solid black;
}

.dashboard-title span{
  font-size: 14px;
  padding: 0px 5px;
  margin-left: 5px;
  border-left: 1px solid black;
}

h3 {
  margin: 15px 0px;
}

table {
  width: 100%;
  padding: 0px 10px;
}

th {
  text-align: left;
}

tr {
  width: 100%;
}

tr:nth-child(even) {
  background: var(--background);
}

td {
  min-width: 15%;
}

td img {
  float: right;
}

</style>

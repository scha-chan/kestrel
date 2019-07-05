<template>
  <div class="dashboard-details" :class="{show}">
    <div class="meta-header">
      <div class="meta-header-title left">
        <span>{{details.status}}</span>
      </div>
      <div class="meta-data right">
        <span>Yo Yo Yo Yo</span>
        <span>Yo Yo Yo Yo</span>
        <span>Yo Yo Yo Yo</span>
      </div>
    </div>
    <table>
      <th :key="header" v-for="header in headers">{{header}}</th>
      <th></th>
      <th></th>
      <tr :key="endpoint.idEndpoint" v-for="endpoint in getDetails.endPoints">
        <td :key="header" :class="[headersClasses[header]]" v-for="header in headers">{{endpoint[header]}}</td>
        <td>
          <img src="@/assets/images/search.svg" title="Exibir detalhes">
        </td>
        <td>
          <img src="@/assets/images/download.svg" title="Baixar relatório completo" @click="downloadCSV(endpoint)">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import fileDownload from "js-file-download"

export default {
  name: "DashboardDetails",
  props: ['details', 'show'],
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
      this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=2&dataInicial=01-01-2010&dataFinal=31-12-2020&statusCode=${this.details.statusCode}&idEndpoint=${endpoint.idEndpoint}`).then(data => {
        this.$http.get(data.caminhoCsv).then(response => {
          fileDownload(response.body, `${this.details.status}:${endpoint.idEndpoint} - ${endpoint.name}.csv`)
        })
      })
    }
  },
  computed: {
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
  margin-top: 20px;
}

.show {
  opacity: 1;
  height: auto;
  visibility: visible;
  display: block;
}

.meta-header {
  width: 100%;
  height: 20px;
  margin: 10px 0px;
}

.meta-header-title {
  font-size: 18px;
  width: fit-content;
}

.meta-data {
  height: 100%;
  width: fit-content;
  display: flex;
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
  background: var(--color-white-faded);
}

td img {
  width: 15px;
}

td img:hover {
  cursor: pointer;
}

td {
  min-width: 15%;
}

</style>

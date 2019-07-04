<template>
  <div class="dashboard-details" :class="{show}">
    <h3>{{details.status}}</h3>
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
          <img src="@/assets/images/download.svg" title="Baixar relatório completo">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DashboardDetails",
  props: ['details', 'show', 'detailsTitle'],
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

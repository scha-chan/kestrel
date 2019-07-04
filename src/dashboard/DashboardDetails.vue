<template>
  <div class="dashboard-details" :class="{show}">
    <table>
      <th :key="header" v-for="header in headers">{{header}}</th>
      <th></th>
      <th></th>
      <!-- <tr :key="endpoint.idEndpoint" v-for="endpoint in getDetails.endPoints"> -->
      <tr :key="endpoint.idEndpoint" v-for="endpoint in endPoints">
        <td :key="header" v-for="header in headers">{{endpoint[header]}}</td>
        <td>
          <img src="@/assets/images/search.svg">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DashboardDetails",
  props: ['details', 'show'],
  data() {
    return {
      headers: ["idEndpoint","name","percent","total"],
      endPoints: [
                    {
                        "idEndpoint": 4,
                        "name": "Incluir/Alterar Delivery Window",
                        "percent": 98.86,
                        "total": 29020
                    },
                    {
                        "idEndpoint": 10,
                        "name": "Incluir/Alterar Product Inclusion",
                        "percent": 1.14,
                        "total": 335
                    }
                ]
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
  transition: all 2s ease-out;
}

.show {
  opacity: 1;
  height: auto;
  visibility: visible;
  display: block;
}

table {
  width: 100%;
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

td {
  min-width: 15%;
}

</style>

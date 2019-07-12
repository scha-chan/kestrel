<template>
  <div class="dashboard-bar-container">
    <dashboard-bar-metadata :data="data"/>
    <dashboard-bar :results="data.results" :dataType="type" :selectFn="select"/>
    <dashboard-details :details="details"
                       :show="showDetails"
                       :setLoading="setLoading"
                       :option="option"
                       :dataInicial="dataInicial"
                       :openModal="openModal"
                       :dataFinal="dataFinal"/>
  </div>
</template>

<script>
import DashboardBar from "./DashboardBar"
import DashboardDetails from "./DashboardDetails"
import DashboardBarMetadata from "./DashboardBarMetadata"

export default {
  name: 'DashboardBarContainer',
  props: ['data', 'type', 'setLoading', 'dataInicial', 'dataFinal', 'option', 'openModal'],
  data() {
    return {
      showDetails: false,
      details: {}
    }
  },
  methods: {
    select(bar) {
      if(bar.statusCode != this.details.statusCode) {
        let status = this.data.results.find(result => result.statusCode == bar.statusCode)
        this.details = status
        this.showDetails = true
      } else {
        this.showDetails = !this.showDetails
      }
    }
  },
  components: {
    'dashboard-bar': DashboardBar,
    'dashboard-details': DashboardDetails,
    'dashboard-bar-metadata': DashboardBarMetadata
  }
}
</script>

<style lang="css" scoped>

.dashboard-bar-container {
  width: 100%;
}

</style>

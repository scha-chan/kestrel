<template>
  <div class="dashboard-bar-container shadow">
    <dashboard-bar :results="data.results" :dataType="type" :selectFn="select"/>
    <dashboard-details :details="details" :show="showDetails"/>
  </div>
</template>

<script>
import DashboardBar from "./DashboardBar"
import DashboardDetails from "./DashboardDetails"

export default {
  name: 'DashboardBarContainer',
  props: ['data', 'type'],
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
      }
      this.showDetails = !this.showDetails
    }
  },
  components: {
    'dashboard-bar': DashboardBar,
    'dashboard-details': DashboardDetails,
  }
}
</script>

<style lang="css" scoped>

.dashboard-bar-container {
  width: 100%;
  background: var(--color-white-faded);
}

</style>

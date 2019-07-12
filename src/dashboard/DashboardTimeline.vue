<template>
  <div class="dashboard-timeline">
    <highcharts type="bar" :options="options"/>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

import * as Getters from "@/store/StoreGetters"
import {mapGetters} from "vuex"

export default {
  name: 'DashboardTimeline',
  components: {
    'highcharts': Chart
  },
  props: ['seriesDataFila', 'timelineTitle', 'nameSerieFila', 'seriesDataRequest', 'nameSerieRequest'],
  data() {
    return {
      chartOptions: {}
    }
  },
  computed: {
    ...mapGetters({
      darkTheme: Getters.IS_DARK_THEME
    }),
    options() {
      return {
        // series: this.seriesData.map(series => {
        //   return {
        //     data: series,
        //     name: 'Requisições por minuto'
        //   }
        // }),
        series: [{
          data: this.seriesDataFila,
          name: this.nameSerieFila || ''
        },
        {
          data: this.seriesDataRequest,
          name: this.nameSerieRequest || ''
        }],
        chart: {
          zoomType: 'x',
          backgroundColor: this.darkTheme ? '#222326' : '#ffffff'
        },
        dataLabels: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: this.timelineTitle || '',
            align: 'left'
        },
        xAxis: {
            type: 'datetime'

        }
      }
    }
  }
}
</script>

<style lang="css" scoped>

.dashboard-timeline {
  width: 100%;
  height: 100%;
}

</style>

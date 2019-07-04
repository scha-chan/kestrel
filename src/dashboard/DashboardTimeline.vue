<template>
  <div class="dashboard-timeline">
    <highcharts type="bar" :options="options"/>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

export default {
  name: 'DashboardTimeline',
  components: {
    'highcharts': Chart
  },
  props: ['seriesData', 'timelineTitle', 'nameSerie'],
  data() {
    return {
      chartOptions: {}
    }
  },
  computed: {
    options() {
      return {
        // series: this.seriesData.map(series => {
        //   return {
        //     data: series,
        //     name: 'Requisições por minuto'
        //   }
        // }),
        series: [{
          data: this.seriesData,
          name: this.nameSerie || ''
        }],
        chart: {
          zoomType: 'x'
        },
        dataLabels: {
            enabled: false
        },
        title: {
            text: this.timelineTitle || '',
            align: 'left'
        },
        xAxis: {
            type: 'datetime',
            name: this.nameSerie || ''
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

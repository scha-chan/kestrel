<template>
  <div class="dashboard-orders">
    <highcharts type="container" :options="options"/>
  </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

import * as Getters from "@/store/StoreGetters"
import {mapGetters} from "vuex"

export default {
  name: 'DashboardOrders',
  components: {
    'highcharts': Chart
  },
  props: ['seriesOrders', 'total'],
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
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                 '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        series: [{
            type: 'pie',
            //name: 'Pendentes: 1000',
            innerSize: '50%',
            data: this.seriesOrders
        }],
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor: this.darkTheme ? '#222326' : '#ffffff'
        },
        dataLabels: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            style: {
                color: this.darkTheme ? '#E0E0E3' : '#2e2e2e',
                textTransform: 'uppercase',
                fontSize: '20px'
            },
            text: 'Orders: ' + this.total,
            align: 'center',
            verticalAlign: 'middle',
            y: 40
        },
        subtitle: {
          style: {
            color: this.darkTheme ? '#E0E0E3' : '#2e2e2e',
            textTransform: 'uppercase'
          }
        },
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
              color: '#F0F0F0'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        legend: {
          itemStyle: {
            color: this.darkTheme ? '#E0E0E3' : '#2e2e2e'
          },
          itemHoverStyle: {
            color: this.darkTheme ? '#FFF' : '#000'
          },
          itemHiddenStyle: {
            color: '#606063'
          }
        },
        labels: {
          style: {
            color: '#707073'
          }
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>

.dashboard-orders {
  width: 100%;
  height: 100%;
}

</style>
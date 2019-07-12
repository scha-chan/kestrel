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
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
                 '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
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
            style: {
              color: '#E0E0E3',
              textTransform: 'uppercase',
              fontSize: '20px'
            },
            text: this.timelineTitle || '',
            align: 'left'
        },
        subtitle: {
          style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
          }
        },
        yAxis: {
          gridLineColor: '#707073',
          labels: {
              style: {
                  color: '#E0E0E3'
              }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          tickWidth: 1,
          title: {
              style: {
                  color: '#A0A0A3'
              }
            }
          },
          tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              style: {
                  color: '#F0F0F0'
              }
          },
          plotOptions: {
              series: {
                  dataLabels: {
                      color: '#B0B0B3'
                  },
                  marker: {
                      lineColor: '#333'
                  }
              },
              boxplot: {
                  fillColor: '#505053'
              },
              candlestick: {
                  lineColor: 'white'
              },
              errorbar: {
                  color: 'white'
              }
          },
          legend: {
              itemStyle: {
                  color: '#E0E0E3'
              },
              itemHoverStyle: {
                  color: '#FFF'
              },
              itemHiddenStyle: {
                  color: '#606063'
              }
          },    
              labels: {
        style: {
            color: '#707073'
        }
    },
    
        xAxis: {
            gridLineColor: '#707073',
            labels: {
              style: {
                  color: '#E0E0E3'
              }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
              style: {
                color: '#A0A0A3'
              }
            },
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

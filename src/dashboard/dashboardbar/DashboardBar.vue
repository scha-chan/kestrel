<template>
  <div class="dashboard-bar">
    <div class="wrapper bar-wrapper">
      <div class="bar" v-for="bar in bars" :key="bar.name" :style="{
        width: `${bar.percent}%`,
        background: bar.color
        }" :title="bar.name" @click="selectFn(bar)">
      </div>
    </div>
    <div class="wrapper legend-wrapper">
      <div class="legend" v-for="bar in bars" :key="bar.name" :title="`Total: ${bar.total}`" @click="selectFn(bar)">
        <div class="legend-color" :style="{background: bar.color}">
        </div>
        <div class="legend-name">
          {{bar.name}} - {{bar.percent}}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as DashboardStatusToColor from "./DashboardStatusToColor"

export default {
  name: 'DashboardBar',
  props: ['results', 'dataType', 'selectFn'],
  data() {
    return {
      colors: DashboardStatusToColor
    }
  },
  computed: {
    resultsComputed() {
      return this.results || []
    },
    bars() {
      return this.resultsComputed.map(result => {
        return {
          statusCode: result.statusCode,
          percent: result.percent,
          name: result.status,
          total: result.totalRecords,
          color: this.colors[this.dataType][result.statusCode]
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>

.dashboard-bar {
  width: 100%;
}

.bar-wrapper{
  padding-bottom: 10px;
}

.bar:first-child {
  border-radius: 6px 0px 0px 6px;
}

.bar:last-child {
  border-radius: 0px 6px 6px 0px;
}

.legend-wrapper {
  min-height: 50px;
  padding-bottom: 20px;
}

.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
}

.bar {
  height: 50px;
}

.bar:hover {
  cursor: pointer;
  box-shadow: 2px 2px 10px 0px #afafaf;
}

.legend {
  float: left;
  display: flex;
  margin: 0px 20px;
}

.legend:hover {
  cursor: pointer;
}

.legend-color {
  width: 10px;
  height: 10px;
  margin: 5px;
}
</style>

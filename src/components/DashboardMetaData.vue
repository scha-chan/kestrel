<template>
  <div class="dashboard-meta-data">
    <div class="date-input-wrapper left-not-clear">
      <label for="data inicial">Data inicial: </label>
      <input type="date" name="data inicial" @input="inputDataInicial" :value="getDataInicial">
    </div>
    <div class="date-input-wrapper left-not-clear">
      <label for="data final">Data final: </label>
      <input type="date" name="data final" @input="inputDataFinal" :value="getDataFinal">
    </div>
    <button type="button" name="button" @click="reloadCallback">RECARREGAR</button>
    <div v-if="lastUpdated" class="last-updated right-not-clear">
      Atualizado em: {{lastUpdated}}
    </div>
    <div v-if="!hideRunning" class="is-running right-not-clear tooltip" :class="[{success: running}, {executing: action != ''}]" @click="stopRun">
      {{action != '' ? action : running ? "rodando" : "parado"}}
      <span v-if="action == ''" class="tooltiptext">{{running ? "Clique para parar" : "Clique para rodar"}}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment"

export default {
  name: 'DashboardMetaData',
  props: ['running', 'action', 'selectDataCallback', 'lastUpdated', 'dataInicial', 'dataFinal', 'reloadCallback', 'hideRunning', 'stopRun'],
  methods: {
    inputDataInicial(e) {
      let value = e.target.value
      let newData = moment(value).format("DD-MM-YYYY")
      this.selectDataCallback(newData, 'dataInicial')
    },
    inputDataFinal(e) {
      let value = e.target.value
      let newData = moment(value).format("DD-MM-YYYY")
      this.selectDataCallback(newData, 'dataFinal')
    }
  },
  computed: {
    getDataInicial() {
      return moment(this.dataInicial, "DD-MM-YYYY").toISOString().slice(0,10)
    },
    getDataFinal() {
      return moment(this.dataFinal, "DD-MM-YYYY").toISOString().slice(0,10)
    }
  }
}
</script>

<style lang="css" scoped>

.dashboard-meta-data {
  width: 100%;
  height: fit-content;
  display: flex;
}

.is-running {
  font-weight: 600;
  padding: 5px;
  border-radius: 10px;
  font-size: 16px;
  background: #d71d1d;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
}

.last-updated {
  margin-left: auto;
  align-items: center;
  display: flex;
  margin-right: 12px;
}

.date-input-wrapper {
  height: 30px;
  margin-right: 12px;
}

button {
  margin: 0px 10px;
  padding: 5px 15px;
  font-size: 14px;
}

label {
  font-size: 18px;
}

input {
  height: 100%;
  font-size: 16px;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

</style>

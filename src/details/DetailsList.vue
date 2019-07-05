<template>
  <div class="details-list">
    <div class="table">
      <div class="row">
        <div class="cell centralized-content" :key="header" :class="headersClasses[header]" v-for="header in headers">{{header}}</div>
      </div>
      <div class="row" :key="detail.id" v-for="detail in getDetails">
        <div class="cell" :title="detail[header]" :class="headersClasses[header]" :key="header" v-for="header in headers">{{detail[header]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as DetailsListColumnClasses from "./DetailsListColumnClasses"

export default {
  name: 'DetailsTable',
  props: ['details'],
  data() {
    return {
      headersClasses: DetailsListColumnClasses,
      headers: ['unb',
        'dataFila',
        'horaFila',
        'endpoint',
        'status',
        'tipo',
        'tentativasEnvio',
        'horaEnvioDelta',
        'horaRetornoDelta']
    }
  },
  computed: {
    // getColumnWidth(header) {
    //   return this.columnsWidth[header]
    // },
    getDetails() {
      return this.details || []
    }
  }
}
</script>

<style lang="css" scoped>

.details-list {
  width: 100%;
}

.table {
  width: 100%;
  table-layout: fixed;
}

.row {
  width: 100%;
  min-height: 30px;
  display: flex;
}

.row:nth-child(even) {
  background: var(--color-white-faded)
}

.cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 10%;
  padding: 15px 5px;
  /* border: 1px solid black; */
}

</style>

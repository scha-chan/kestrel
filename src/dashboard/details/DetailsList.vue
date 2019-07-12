<template>
  <div class="details-list">
    <div class="table">
      <div class="row header-row">
        <div class="cell centralized-content" :key="header" :class="headersClasses[header]" v-for="header in headers">{{header}}</div>
      </div>
      <div class="row" :key="detail.id" v-for="detail in getDetails">
        <div class="cell" :title="detail[header]" :class="headersClasses[header]" :key="header" v-for="header in headers">{{detail[header]}}</div>
        <div class="cell half centralized-content" title="Copiar ID">
          <img v-if="darkTheme" src="@/assets/images/clipboards-white.svg" @click="copyToClipboard(detail.id)">
          <img v-else src="@/assets/images/clipboards.svg" @click="copyToClipboard(detail.id)">
        </div>
        <div class="cell half centralized-content" title="Reenviar requisição">
          <img v-if="darkTheme" src="@/assets/images/reload-white.svg" @click="retry(detail)">
          <img v-else src="@/assets/images/reload.svg" @click="retry(detail)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as DetailsListColumnClasses from "./DetailsListColumnClasses"
import * as Getters from "@/store/StoreGetters"
import {mapGetters} from "vuex"

export default {
  name: 'DetailsTable',
  props: ['details', 'retryCallback'],
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
  methods: {
    retry(registro) {
      this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=5&idRegistro=${registro.id}`).finally(() => this.retryCallback(registro))
    },
    copyToClipboard(str) {
      var el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style = {position: 'absolute', left: '-9999px'};
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  },
  computed: {
    ...mapGetters({
      darkTheme: Getters.IS_DARK_THEME
    }),
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

.header-row {
  position: sticky;
  top: 0;
  background: var(--color-suface);
  background: white;
  /* bug, nao pega o var direito, fica transparente */
}

.dark-theme .header-row {
  background: #222326;
}

.row:nth-child(even) {
  background: var(--background)
}

.cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 10%;
  padding: 15px 5px;
  /* border: 1px solid black; */
}

img {
  width: 15px;
}

img:hover {
  cursor: pointer;
}

</style>

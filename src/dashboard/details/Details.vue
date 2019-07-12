<template>
  <section>
    <div class="meta-data-wrapper">
      <meta-data
      :selectDataCallback="updateData"
      :dataInicial="this.dataInicial"
      :dataFinal="this.dataFinal"
      :reloadCallback="loadData"
      :hideRunning="true"
      />
    </div>
    <div class="details-list-wrapper shadow">
      <details-list :details="inPageDetails" :retryCallback="resendRequest"/>
    </div>
    <div class="pagination-wrapper">
      <!-- <pagination :total="16" :currentPage="3"/> -->
      <paginate
        :page-count="totalPages"
        :click-handler="setPage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :no-li-surround="true"
        :page-class="'pagination-unit'"
        :container-class="'pagination'">
      </paginate>
    </div>
  </section>
</template>

<script>
import DetailsList from "./DetailsList"
import Paginate from "vuejs-paginate"
import MetaData from "@/components/DashboardMetaData"
import LoadingPane from "@/components/LoadingPane"
import moment from "moment"

export default {
  name: 'Details',
  props: ['status', 'endpoint'],
  components: {
    'details-list': DetailsList,
    'loading-pane': LoadingPane,
    'meta-data': MetaData,
    'paginate': Paginate
  },
  data() {
    return {
      dataInicial: '',
      dataFinal: '',
      totalPerPage: 20,
      details: [],
      currentPage: 1
    }
  },
  computed: {
    inPageDetails() {
      return this.details.slice((this.currentPage - 1) * this.totalPerPage, this.currentPage * this.totalPerPage)
    },
    totalPages() {
      return Math.ceil(this.details.length / this.totalPerPage)
    }
  },
  methods: {
    updateData(date, dateField) {
      this[dateField] = date
    },
    resendRequest(detail) {
      return this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=5&idRegistro=${detail.id}`).then(() => {
        this.updateDetailInList(detail, status)
      })
    },
    updateDetailInList(detail, status) {
      detail.status = status

    },
    removeFromList(detail) {
      let i = this.details.indexOf(detail)
      this.details.splice(i, 1)
    },
    setPage(page) {
      this.currentPage = page
    },
    loadData() {
      if(this.endpoint && this.status) {
        this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=4&dataInicial=${this.dataInicial}&dataFinal=${this.dataFinal}&idEndpoint=${this.endpoint}&statusCode=${this.status}`).then(data => {
          this.details = data.details
        })
      }
    },
    resendAllDetails() {
      this.resendTillLast()
      this.resendTillLast()
      this.resendTillLast()
      this.resendTillLast()
      this.resendTillLast()
    },
    resendTillLast() {
      if(this.length == 0) {
        return
      }
      let detail = this.details.pop()
      this.resendRequest(detail).then(this.resendTillLast)
    }
  },
  created() {
    this.loadData()
    let hoje = moment().format("DD-MM-YYYY")
    this.dataInicial = hoje
    this.dataFinal = hoje
  },
}
</script>

<style lang="css" scoped>

section {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
}

.details-list-wrapper {
  max-width: 1500px;
  width: 100%;
  background: var(--color-surface);
  max-height: 80%;
  overflow: auto;
  padding:  0px 10px;
}

.pagination-wrapper {
  max-width: 1500px;
  width: 100%;
}

.meta-data-wrapper {
  max-width: 1500px;
  width: 100%;
  margin-bottom: 10px;
}

</style>

<style media="screen">

.pagination {
  height: 50px;
  display: flex;
  list-style-type: none;
  padding: 3px;
  float: right;
}

.pagination a {
  width: 50px;
  border: 1px solid var(--color-background);
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  background: var(--color-suface);
}

.pagination a:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.pagination a:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.pagination .active {
  border: var(--color-primary) 1px solid;
}

</style>

<template>
  <section>
    <loading-pane :show="isLoading"/>
    <div class="title-wrapper">
      <span>{{statusTitle}}</span>
      <button type="button" name="button" @click="resendAllDetails">REENVIAR TODOS</button>
    </div>
    <div class="meta-data-wrapper">
      <meta-data
      :selectDataCallback="updateData"
      :dataInicial="this.dataInicial"
      :dataFinal="this.dataFinal"
      :reloadCallback="loadData"
      :hideRunning="true"
      />
    </div>
    <div class="details-list-wrapper">
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
  props: ['status', 'endpoint', 'details', 'loadDetailsFn', 'statusTitle', 'notifyDetailsChange'],
  components: {
    'details-list': DetailsList,
    'loading-pane': LoadingPane,
    'meta-data': MetaData,
    'paginate': Paginate
  },
  data() {
    return {
      isLoading: false,
      dataInicial: '',
      dataFinal: '',
      totalPerPage: 20,
      currentPage: 1,
      currentRequests: []
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
      return this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=5&idRegistro=${detail.id}`).then(data => {
        let detailInComponent = this.details.find(d => d.id == detail.id)
        detailInComponent.statusReenvio = data.status
        this.notifyDetailsChange()
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
        this.isLoading = true
        this.loadDetailsFn(this.dataInicial, this.dataFinal, this.endpoint, this.status)
        .finally(() => {
          this.isLoading = false
        })
      }
    },
    resendAllDetails() {
      this.isLoading = true
      this.detailsToBeResend = this.details.filter(detail => !detail.statusReenvio || !detail.statusReenvio.success)
      this.resendTillLast()
      this.resendTillLast()
      this.resendTillLast()
      this.resendTillLast()
      this.resendTillLast()
    },
    resendTillLast() {
      if(this.detailsToBeResend.length == 0) {
        if(this.currentRequests.length == 0) {
          this.isLoading = false
        }
        return
      }
      let detail = this.detailsToBeResend.pop()
      let request = this.resendRequest(detail)
      this.currentRequests.push(request)
      request.then(() => {
        this.currentRequests.pop()
        this.resendTillLast()
      })
    }
  },
  created() {
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
  padding: 20px 0px;
  position: relative;
}

.title-wrapper {
  font-size: 32px;
}

.title-wrapper {
  width: 100%;
  max-width: 1500px;
  margin: 10px 0px;
}

.title-wrapper button {
  float: right;
  margin: 0px 10px;
  padding: 5px 15px;
  font-size: 14px;
  color: white;
  background: #2b40e0;
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
  margin-top: 20px;
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

.pagination a:focus {
  outline: none;
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

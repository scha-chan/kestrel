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
      <details-list :details="inPageDetails" :retryCallback="removeFromList"/>
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
import Pagination from "./Pagination"
import Paginate from "vuejs-paginate"
import MetaData from "@/components/DashboardMetaData"
import moment from "moment"

export default {
  name: 'Details',
  props: ['field', 'status', 'endpoint'],
  components: {
    'details-list': DetailsList,
    'pagination': Pagination,
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
    removeFromList(detail) {
      let i = this.details.indexOf(detail)
      this.details.splice(i, 1)
    },
    setPage(page) {
      this.currentPage = page
    },
    loadData() {
      this.$jsonp(`http://172.22.4.252/cgi-bin/PP00100.exe?ppopcao=55&requisicao=138&request=5&opcao=4&dataInicial=${this.dataInicial}&dataFinal=${this.dataFinal}&idEndpoint=${this.endpoint}&statusCode=${this.status}`).then(data => {
        this.details = data
      })
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
  padding-top: 150px;
}

.details-list-wrapper {
  max-width: 1500px;
  width: 100%;
  background: white;
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
  border: 1px solid var(--color-white-faded);
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  background: white;
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

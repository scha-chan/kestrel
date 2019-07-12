<template>
  <div class="modal" :class="{show}">
    <div class="details-wrapper" v-click-outside="onClickOutside">
      <dashboard-details
      :details="details"
      :notifyDetailsChange="notifyDetailsChange"
      :statusTitle="endpointWrapper.statusTitle"
      :loadDetailsFn="loadDetailsFn"
      :endpoint="endpointWrapper.endpoint"
      :status="endpointWrapper.status"/>
    </div>
  </div>
</template>

<script>
import Details from "./details/Details"
import vClickOutside from 'v-click-outside'

export default {
  name: 'Modal',
  directives: {
     clickOutside: vClickOutside.directive
   },
  props: ['show', 'endpointWrapper', 'closeModal', 'details', 'loadDetailsFn', 'notifyDetailsChange'],
  components: {
    'dashboard-details': Details
  },
  methods: {
    onClickOutside(e) {
      if(this.show && e.target.title != "Exibir detalhes") {
        this.closeModal()
      }
    }
  }

}
</script>

<style lang="css" scoped>

.modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(131, 133, 170, 0.7);
  justify-content: center;
  padding-top: 50px;
  display: flex;

  transition: all 0.5s ease-out;

  visibility: hidden;
  opacity: 0;
  display: none;
}

.modal.show {
  visibility: visible;
  opacity: 1;
  display: flex;
}

.details-wrapper {
  max-width: 1600px;
  width: 100%;
  background: var(--color-surface);
  max-height: 800px;
}

</style>

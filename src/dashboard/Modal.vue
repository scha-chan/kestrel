<template>
  <div class="modal">
    <div class="details-wrapper">
      <dashboard-details
      :endpoint="endpoint"
      :status="status"/>
    </div>
  </div>
</template>

<script>
import Details from "./details/Details"

export default {
  name: 'Modal',
  props: ['status', 'endpoint'],
  components: {
    'dashboard-details': Details
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
  display: flex;
  justify-content: center;
  padding-top: 50px;
}

.details-wrapper {
  max-width: 1600px;
  width: 100%;
  background: white;
  max-height: 800px;
}

</style>

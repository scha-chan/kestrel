<template>
  <section id="planner-daily">
    <div class="meta-data">

    </div>
    <div class="attainment-wrapper">
      <span>Atingimento</span>
      <div class="attainment" v-for="attainment in attainments">

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Daily',
  data() {
    return {
      attainments: [1,2,3,4]
    }
  }
}
</script>

<style lang="css" scoped>

#planner-daily {
  padding: 20px;
}

.meta-data {
  width: 100%;
}

.attainment-wrapper {
  width: 100%;
}

.attainment-wrapper span {
  width: 100%;
  float: left;
  clear: left;
}

.attainment {
  width: 25%;
  height: 50px;
  float: left;
}

@media (min-width: 600px) {
  #planner-daily {
    max-width: 600px;
    height: calc(100% - 100px);
    margin: 50px 0;
  }
}

</style>

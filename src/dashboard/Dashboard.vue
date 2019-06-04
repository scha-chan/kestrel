<template id="dashboard">
  <section>
    <div v-for="graph in graphs" class="graph shadow" :key="graph">
      {{graph}}
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        graphs: [1,2,3,4,5,6]
      }
    }
  }
</script>

<style scoped>

section {
  --graph-width: 300px;
  --graph-margin: 15px;
  --graph-max-per-line: 4;

  padding: 80px calc(calc(100% - calc(var(--graph-max-per-line) * calc(var(--graph-width) + var(--graph-margin) * 2))) / 2 - 10px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  overflow-y: auto;
}

.graph {
  width: 100%;
  height: 100%;
  max-width: var(--graph-width);
  max-height: var(--graph-width);
  margin: var(--graph-margin);
}


</style>

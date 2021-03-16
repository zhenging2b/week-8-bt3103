<template>
  <div id="app">
    <bar-chart></bar-chart>
    <h1>Line Chart</h1>
    <line-chart></line-chart>
  </div>
</template>

<script>
import BarChart from './BarChart.vue'
import LineChart from './LineChart.js'
export default {
  name: 'app',
  components: {
    'bar-chart':BarChart,
    'line-chart':LineChart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<template>
  <div class="small">
    <line-chart :chart-data="chartdata" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    components: {
      LineChart
    },
    props: {
      financialData: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        chartdata: {
          labels: this.financialData.years,
          datasets: [
            {
              label: this.financialData.type,
              backgroundColor: '#ffc04a',
              data: this.financialData.data
            }
          ]
        },
        chartOptions: {
          legend: {
            labels: {
              fontColor: "#ffc04a",
              fontSize: 14
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                min: 0,
                max: Math.max(...this.financialData.data) + 1,
                stepSize: 100,
                reverse: false,
                beginAtZero: true,
                fontColor: '#ffc04a'
              }
            }],
            xAxes: [{
              ticks: {
                fontColor: '#ffc04a'
              }
            }]
          }
        },
        loaded: false
      }
    }
  }
</script>

<style>
  .small {
    max-width: 400px;
    margin: 0 auto;
  }
</style>

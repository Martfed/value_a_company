<template>
  <div id="app">
    <h1>Value a company</h1>
    <p>pick a company</p>
    <select name="Choose a company" v-model="companyPicker" @change="getQuotes()">
      <option value="AAPL">Apple</option>
      <option value="CRUS">Cirrus Logic</option>
      <option value="FB">Facebook</option>
      <option value="MSFT">Microsoft</option>
      <option value="BA">Boeing</option>
      <option value="V">Visa</option>
      <option value="DIS">Disney</option>
      <option value="DLR">Digital Realty Trust</option>
      <option value="ATVI">Activision Blizzard</option>
      <option value="GE">General Electronics</option>
      <option value="IBM">IBM</option>
      <option value="KO">Coca-cola</option>
      <option value="LB">L brands</option>
    </select>
    <p>{{ companyPicker }}</p>
    <div v-if="loaded" style="display: flex">
      <FinancialData :financial-data="debtToEquity"/>
      <FinancialData :financial-data="currentRatio"/>
      <FinancialData :financial-data="returnOnEquity"/>
    </div>
  </div>
</template>

<script>
import FinancialData from './components/debt_to_equity/FinancialData.vue'

export default {
  name: 'App',
  components: {
    FinancialData
  },
  data () {
    return {
      debtToEquity: {
        data: [],
        years: [],
        type: 'Debt to equity'
      },
      currentRatio: {
        data: [],
        years: [],
        type: 'Current Ratio'
      },
      returnOnEquity: {
        data: [],
        years: [],
        type: 'Return on Equity'
      },
      companyPicker: 'AAPL',
      loaded: false,
    }
  },
  computed: {
    config () {
      return {
        headers: {
          'X-API-Key': process.env.VUE_APP_API_KEY
        },
        params: {
          company: this.companyPicker
        }
      }
    }
  },
  methods: {
    setEquityOrCurrentRatio (responseBody, calculationType) {
      const debtEquities = responseBody[calculationType].map(equity => equity[calculationType])
      const debtYears = responseBody[calculationType].map(equity => equity.year)
      this[calculationType].data = debtEquities
      this[calculationType].years = debtYears.reverse()
    },
    async getQuotes () {
      this.loaded = false
      if (sessionStorage[this.companyPicker]) {
        this.debtToEquity = await JSON.parse(sessionStorage[this.companyPicker]).debtToEquity
        this.currentRatio = await JSON.parse(sessionStorage[this.companyPicker]).currentRatio
        this.returnOnEquity = await JSON.parse(sessionStorage[this.companyPicker]).returnOnEquity
      } else {
        await this.axios
          .get('https://poeurvcc5f.execute-api.eu-west-3.amazonaws.com/dev/financial-data/',this.config)
          .then(response => {
            this.setEquityOrCurrentRatio(response.data, 'debtToEquity')
            this.setEquityOrCurrentRatio(response.data, 'currentRatio')
            this.setEquityOrCurrentRatio(response.data, 'returnOnEquity')
            sessionStorage.setItem(this.companyPicker, JSON.stringify({
              debtToEquity: this.debtToEquity,
              currentRatio: this.currentRatio,
              returnOnEquity: this.returnOnEquity
            }))
        })
      }
      this.loaded = true
    }
  },
  async mounted () {
    this.getQuotes()
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

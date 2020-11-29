<template>
  <div id="app">
    <h1>Value a company</h1>
    <p>pick a company</p>
    <select name="Choose a company" v-model="companyPicker" @change="getQuotes()">
      <option :value="company.code" v-for="company in companies" :key="company.code">{{ company.name }}</option>
    </select>
    <p>{{ companyPicker }}</p>
    <div v-if="loaded" style="display: flex">
      <FinancialData :financial-data="correctData(graph)" v-for="graph in graphs" :key="graph"/>
    </div>
    <div class="loading-main" v-else>
      <div v-for="graph in graphs" :key="graph" class="loader"></div>
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
      bookValuePerShare: {
        data: [],
        years: [],
        type: 'Book value per share'
      },
      companies: [
        { code: 'AAPL', name: 'Apple' },
        { code: 'CRUS', name: 'Cirrus Logic' },
        { code: 'FB', name: 'Facebook' },
        { code: 'MSFT', name: 'Microsoft' },
        { code: 'BA', name: 'Boeing' },
        { code: 'V', name: 'Visa' },
        { code: 'DIS', name: 'Disney' },
        { code: 'DLR', name: 'Digital Realty Trust' },
        { code: 'ATVI', name: 'Activision Blizzard' },
        { code: 'GE', name: 'General Electronics' },
        { code: 'IBM', name: 'IBM' },
        { code: 'KO', name: 'Coca-cola' },
        { code: 'LB', name: 'L brands' }
      ],
      graphs: ['debtToEquity', 'currentRatio', 'returnOnEquity', 'bookValuePerShare'],
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
    correctData (string) {
      return this[string]
    },
    setEquityOrCurrentRatio (responseBody, calculationType) {
      const debtEquities = responseBody[calculationType].map(equity => equity[calculationType])
      const debtYears = responseBody[calculationType].map(equity => equity.year)
      this[calculationType].data = debtEquities
      this[calculationType].years = debtYears.reverse()
    },
    async getQuotes () {
      this.loaded = false
      if (sessionStorage[this.companyPicker]) {
        for (let i = 0; i < this.graphs.length; i += 1) {
          this[this.graphs[i]] = await JSON.parse(sessionStorage[this.companyPicker])[this.graphs[i]]
        }
      } else {
        await this.axios
          .get('https://poeurvcc5f.execute-api.eu-west-3.amazonaws.com/dev/financial-data/',this.config)
          .then(response => {
            const self = this
            this.graphs.forEach((graph) => {
              self.setEquityOrCurrentRatio(response.data, graph)
            })
            sessionStorage.setItem(this.companyPicker, JSON.stringify({
              debtToEquity: this.debtToEquity,
              currentRatio: this.currentRatio,
              returnOnEquity: this.returnOnEquity,
              bookValuePerShare: this.bookValuePerShare
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

.loading-main {
  margin: 0 150px;
  margin-top: 130px;
  display: flex;
  justify-content: space-between;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #e77579; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

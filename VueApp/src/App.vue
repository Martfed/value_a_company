<template>
  <div id="app">
    <h1 class="text-8xl text-white font-sans mb-32">Value a company</h1>
    <h2 class="text-white text-xl">Pick a company</h2>
    <select 
      name="Choose a company"
      v-model="companyPicker"
      @change="getQuotes()"
      class="h-10 rounded shadow-lg"
    >
      <option :value="company.code" v-for="company in companies" :key="company.code">
        {{ company.name }}
      </option>
    </select>
    <CompanyInfo :company-info="companyInfo" v-if="loaded"/>
    <div v-if="loaded" class="lg:grid gap-10 grid-cols-2 2xl:mx-96 mt-32">
      <FinancialData
      :financial-data="correctData(graph)"
      v-for="graph in graphs"
      :key="graph"/>
    </div>
    <div class="lg:grid gap-4 grid-cols-3" v-else>
      <div v-for="graph in graphs" :key="graph" class="loader"></div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import "tailwindcss/tailwind.css"
import CompanyInfo from './components/CompanyInfo.vue'
import FinancialData from './components/FinancialData.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    CompanyInfo,
    FinancialData,
    Footer
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
      earningsPerShare: {
        data: [],
        years: [],
        type: 'Earnings per share'
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
      graphs: [
        'debtToEquity',
        'currentRatio',
        'returnOnEquity',
        'bookValuePerShare',
        'earningsPerShare'
      ],
      companyInfo: {},
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
        this.companyInfo = JSON.parse(sessionStorage[this.companyPicker]).companyInfo
      } else {
        await this.axios
          .get('https://poeurvcc5f.execute-api.eu-west-3.amazonaws.com/dev/financial-data/',this.config)
          .then(response => {
            const self = this
            this.companyInfo = response.data.companyData
            this.graphs.forEach((graph) => {
              self.setEquityOrCurrentRatio(response.data, graph)
            })
            sessionStorage.setItem(this.companyPicker, JSON.stringify({
              earningsPerShare: this.earningsPerShare,
              debtToEquity: this.debtToEquity,
              currentRatio: this.currentRatio,
              returnOnEquity: this.returnOnEquity,
              bookValuePerShare: this.bookValuePerShare,
              companyInfo: this.companyInfo
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

body {
  background-image: linear-gradient(to right top, #10223b, #142a49, #193357, #1e3c65, #234574);
}

.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #e77579;
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

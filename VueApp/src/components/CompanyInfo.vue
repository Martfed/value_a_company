<template>
  <div class="m-auto h-40 w-3/4 mt-20 rounded-xl background_gradient">
    <div class="flex">
      <div class="flex-auto text-white">
        <p class="underline">Sector</p>
        <p>{{ companyInfo.Sector }}</p>
      </div>
      <div class="flex-auto text-white">
        <p class="underline">Stock exchange</p>
        <p>{{ companyInfo.Exchange }}</p>
      </div>
      <div class="flex-auto text-white">
        <p class="underline">Dividend per share</p>
        <p>{{ companyInfo.DividendPerShare }}</p>
      </div>
      <div class="flex-auto text-white">
        <p class="underline">Dividend yield</p>
        <p>{{ companyInfo.DividendYield }}</p>
      </div>
      <div class="flex-auto text-white">
        <p class="underline">Current PE ratio</p>
        <p>{{ companyInfo.PERatio }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    companyInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>


<style scoped>
  .background_gradient {
    background: linear-gradient(to left, rgba(235, 237, 240, 0.20), rgba(235, 237, 240, 0.10), rgba(235, 237, 240, 0))
  }
</style>
<template>
  <div class="m-auto h-40 border-black border-2 w-3/4 mt-20 rounded-xl background_gradient">
    <div class="flex">
      <p class="text-white flex-auto">{{ companyInfo.Sector }}</p>
      <p class="text-white flex-auto">{{ companyInfo.Exchange }}</p>
      <p class="text-white flex-auto">{{ companyInfo.DividendPerShare }}</p>
      <p class="text-white flex-auto">{{ companyInfo.DividendYield }}</p>
      <p class="text-white flex-auto">{{ companyInfo.PERatio }}</p>
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
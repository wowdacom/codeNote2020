<template>
  <div class="container">
    <div>
      <h1>Hello NUXT</h1>
    </div>
  </div>
</template>

<script>
export default {
    head() {
        return {
            title: '期待的學生頁',
            meta: [
                { charset: 'utf-8' },
                {
                    property: 'og:title',
                    content: '期待新課綱的學生【情緒搜集器】'
                },
                {
                    property: 'og:url',
                    content: 'http://nmdap.udn.com.tw/test/nuxtShare/studentExpect'
                },
                {
                    property: 'og:image',
                    content: 'http://nmdap.udn.com.tw/test/nuxtShare/studentExpect-meta.jpg'
                },
                {
                    property: 'og:description',
                    content: '學生期待著「十二年國民基本教育課程綱要總綱」於103年11月發布，各領綱陸續發佈，並於108年8月正式上路，因此又稱為「108課綱」。'
                },
            ]
        }
    },
  components: {

  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

<template>
  <div class="flex w-full h-screen flex-col overflow-hidden">
    <AppHeader />
    <GameContainer />
  </div>
</template>

<style scoped>
</style>
<script>
import GameContainer from './components/GameContainer.vue'

export default {
  name: 'App',
  components: { GameContainer },
  created() {
   this.$store.commit('horse/GENERATE_HORSES')
  }
}
</script>

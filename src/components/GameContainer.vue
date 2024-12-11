<script>
import { defineComponent } from 'vue'
import HorseList from './GameContainer/HorseList.vue'
import RaceContainer from './GameContainer/RaceContainer.vue'
import ProgramAndResultsContainer from './GameContainer/ProgramAndResultsContainer.vue'
export default defineComponent({
  name: 'GameContainer',
  components: { ProgramAndResultsContainer, RaceContainer, HorseList }
})
</script>
<template>
  <div class="flex w-full h-[calc(100dvh-50px)]">
    <HorseList />
    <RaceContainer />
    <ProgramAndResultsContainer />
  </div>
</template>

<style scoped>

</style>

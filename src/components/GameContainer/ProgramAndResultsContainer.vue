<script>
import ScheduleTable from './ProgramAndResultsContainer/ScheduleTable.vue'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import ProgramSection from './ProgramAndResultsContainer/ProgramSection.vue'
import ResultSection from './ProgramAndResultsContainer/ResultSection.vue'

export default {
  name: 'ProgramAndResultsContainer',
  components: { ResultSection, ProgramSection, ScheduleTable }
}
</script>

<template>
  <div class="w-[500px] overflow-y-scroll h-full grid grid-cols-2">
    <ProgramSection />
    <ResultSection />
  </div>
</template>

<style scoped>
</style>

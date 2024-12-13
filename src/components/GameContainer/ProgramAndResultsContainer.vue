<script>
import ScheduleTable from './ProgramAndResultsContainer/ScheduleTable.vue'
import {mapGetters} from 'vuex'
import {cloneDeep} from 'lodash'
import ProgramSection from './ProgramAndResultsContainer/ProgramSection.vue'
import ResultSection from './ProgramAndResultsContainer/ResultSection.vue'

export default {
  name: 'ProgramAndResultsContainer',
  components: {ResultSection, ProgramSection, ScheduleTable},
  methods: {
    SCROLL_TO_CURRENT_ROUND() {
      const scrollContainer = document.querySelector('#scrollContainer');
      const offset = 20;
      const target = document.querySelector(`#result-for-${this.CURRENT_ROUND?.id}`);
      if (target) {
        const yPosition = target.offsetTop - scrollContainer.offsetTop - offset;
        scrollContainer.scrollTo({top: yPosition - offset, behavior: 'smooth'});
      }
    }
  },
  computed: {
    ...mapGetters({
      IS_RACE_RUNNING: 'program/_IS_RACE_RUNNING',
      CURRENT_ROUND: 'program/_GET_CURRENT_ROUND'
    }),
  },
  watch: {
    IS_RACE_RUNNING(isRunning) {
      //! Yarışı başlatır veya durdurur
      if (isRunning) {
        this.SCROLL_TO_CURRENT_ROUND();
      }
    },
    'CURRENT_ROUND.id': {
      handler(currentRound) {
        //! Her bir Round değişiminde yarışın otomatik olarak çalışmasını sağlar
        if (this.IS_RACE_RUNNING) {
          this.SCROLL_TO_CURRENT_ROUND();
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<template>
  <div id="scrollContainer" class="w-[500px] overflow-y-scroll h-full grid grid-cols-2">
    <ProgramSection/>
    <ResultSection/>
  </div>
</template>

<style scoped>
</style>

<script>
import ScheduleTable from './ScheduleTable.vue'
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'ResultSection',
  components: { ScheduleTable },
  methods: {
    getOrderedHorses(horses) {
      return cloneDeep(horses).sort((a, b) => a.finishPosition - b.finishPosition)
    }
  },
  computed: {
    ...mapGetters({
      CURRENT_PROGRAM: 'program/_GET_CURRENT_PROGRAM'
    }),
    _RESULT_TABLE_FIELDS() {
      return [
        {
          label: 'Pos',
          field: 'finishPosition',
          formatter: value => value || '-'
        },
        {
          label: 'Name',
          field: 'name',
          headingClass: 'text-left'
        }
      ]
    }
  }
}
</script>

<template>
  <div>
    <Heading title="Results" class="results-heading" />
    <template v-if="CURRENT_PROGRAM">
      <ScheduleTable
        v-for="round in CURRENT_PROGRAM?.rounds"
        :key="round.id"
        :is-result="true"
        :fields="_RESULT_TABLE_FIELDS"
        :title="round.title"
        :items="getOrderedHorses(round.horses)"
      />
    </template>
    <template v-else>
      <div class="flex items-start mt-5 justify-center h-full text-sm text-zinc-400 font-bold">No results available yet!</div>
    </template>
  </div>
</template>

<style scoped>
.results-heading {
  @apply sticky top-0 z-20 text-base font-medium p-2 text-center  shadow-md bg-green-300 text-green-900 shadow-green-200;
}
</style>

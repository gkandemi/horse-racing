<script>
import ScheduleTable from './ScheduleTable.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ProgramSection',
  components: { ScheduleTable },
  computed: {
    ...mapGetters({
      CURRENT_PROGRAM: 'program/_GET_CURRENT_PROGRAM'
    }),
    _PROGRAM_TABLE_FIELDS() {
      return [
        {
          label: 'Pos',
          field: 'position'
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
  <div class="border-r border-r-zinc-300">
    <Heading title="Program" class="schedule-heading" />
    <template v-if="CURRENT_PROGRAM">
      <ScheduleTable
        v-for="round in CURRENT_PROGRAM?.rounds"
        :key="round.id"
        :fields="_PROGRAM_TABLE_FIELDS"
        :title="`${round.title} - ${round.distance}m`"
        :items="round.horses"
      />
    </template>
    <template v-else>
      <div class="flex items-start mt-5 justify-center h-full text-sm text-zinc-400 font-bold">No program available yet!</div>
    </template>
  </div>
</template>

<style scoped>
.schedule-heading {
  @apply sticky top-0 z-20 text-base font-medium p-2 text-center shadow-md bg-red-300 text-red-900 shadow-red-200;
}
</style>

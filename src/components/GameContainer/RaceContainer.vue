<script>
import RaceTrack from './RaceContainer/RaceTrack.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'RaceContainer',
  components: { RaceTrack },
  computed: {
    ...mapGetters({
      ROUND_HORSE_LIST: 'program/_GET_CURRENT_PROGRAM_HORSES',
      IS_RACE_RUNNING: 'program/_IS_RACE_RUNNING',
      CURRENT_ROUND: 'program/_GET_CURRENT_ROUND'
    })
  }
}
</script>

<template>
  <div class="race-container">
    <div class="flex gap-y-2 flex-col items-center my-auto w-full py-2.5">
      <template v-if="CURRENT_ROUND">
        <div class="flex flex-col gap-y-1 w-full">
          <RaceTrack
            v-for="(horse, idx) in ROUND_HORSE_LIST"
            :key="`race-track-${CURRENT_ROUND?.id}_${horse.id}`"
            :horse="horse" :idx="idx" />
        </div>
        <div v-if="CURRENT_ROUND" class="round-name">{{ CURRENT_ROUND?.title }} - {{ CURRENT_ROUND?.distance }}m</div>
      </template>
      <template v-else>
        <div class="text-xl text-zinc-400 font-bold">No race scheduled yet!</div>
      </template>

      <!-- Tips -->
      <div v-if="CURRENT_ROUND" class="relative border border-zinc-300 p-2 rounded-md self-end w-full text-zinc-700 text-sm flex flex-col gap-y-3">
        <AppIcon icon="help" class="text-green-600 absolute right-1 top-1 w-4 h-4" />
        <div class="tip-box">
          * To increase the speed of the horses, you can change the value of <code>export const SPEED_FACTOR = 5</code> located in <code>/src/utils/constants.js</code>.
        </div>
        <div class="tip-box gap-x-2">
          * To individually increase the condition of the horses, you can modify the <code>condition: Math.floor(Math.random() * 100) + 1</code> value inside the <code>export const GENERATE_RANDOM_HORSES = () => {...}</code> function located in <code>/src/utils/helpers.js</code>. A preset line of code that sets the condition between 65 and 100 is available as a comment. <code>condition: Math.floor(Math.random() * (100 - 65 + 1)) + 65 </code>
        </div>
      </div>
      <!-- /Tips -->
    </div>
  </div>
</template>

<style scoped>

code {
  @apply font-medium bg-zinc-200 text-zinc-900 text-xs px-2 py-1 rounded-md;
}

.tip-box{
  @apply leading-7;
}

.race-container {
  @apply flex-1 flex flex-col overflow-auto px-10 bg-zinc-50 border-l-zinc-300 border-l border-r-zinc-300 border-r;
}

.round-name {
  @apply bg-red-600 px-2 rounded-full text-white font-bold text-lg;
}
</style>

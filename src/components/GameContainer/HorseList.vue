<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import SpeedBar from './HorseList/SpeedBar.vue'
import HorseNameAndColor from './HorseList/HorseNameAndColor.vue'

export default defineComponent({
  name: 'HorseList',
  components: { HorseNameAndColor, SpeedBar },
  computed: {
    ...mapGetters({
      HORSES: 'horse/_GET_ORDERED_HORSES'
    })
  }
})
</script>

<template>
  <div class="w-[300px]">
    <Heading title="Horse List (1-20)" class="header" />
    <div class="h-[calc(100%-40px)] divide-y overflow-auto">
      <div v-for="{name, condition, color} in HORSES" class="p-2.5">
        <HorseNameAndColor :name="name" :color="color" />
        <SpeedBar :condition="condition" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.header{
  @apply text-base font-medium flex items-center justify-center h-10 bg-indigo-200 text-indigo-900 shadow-md shadow-indigo-100 text-center;
}
</style>

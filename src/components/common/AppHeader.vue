<script>
import { defineComponent } from 'vue'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default defineComponent({
  name: 'AppHeader',
  methods: {
    ...mapActions({
      GENERATE_PROGRAM: 'program/GENERATE_PROGRAM'
    }),
    ...mapMutations({
      toggleProgram: 'program/TOGGLE_PROGRAM',
      SET_PROGRAM: 'program/SET_PROGRAM'
    }),
    generateProgram() {
      if(this._IS_RACE_RUNNING) this.SET_PROGRAM(null)
      //! DOM güncellemeleri tamamlandığında yeni programı oluştur
      this.$nextTick(() => {
        this.GENERATE_PROGRAM()
      })
    }
  },
  computed: {
    ...mapGetters({
      _IS_RACE_RUNNING: 'program/_IS_RACE_RUNNING',
      _IS_PROGRAM_AVAILABLE: 'program/_IS_PROGRAM_AVAILABLE'
    }),
    _TOGGLE_BUTTON_VARIANT() {
      return this._IS_RACE_RUNNING ? 'danger' : 'success'
    },
    _TOGGLE_BUTTON_ICON() {
      return this._IS_RACE_RUNNING ? 'pause' : 'play'
    },
    _TOGGLE_BUTTON_TEXT() {
      return this._IS_RACE_RUNNING ? 'Pause' : 'Start'
    }
  }
})
</script>

<template>
  <div class="flex items-center justify-between h-14 py-2 bg-[#f5f5f5] px-2 relative z-[2 ] shadow">
    <Heading title="Horse Racing" class="text-xl font-bold pl-2" />
    <div class="buttons flex items-center flex-start shrink-0 gap-x-2">
      <AppButton class="flex items-center justify-center gap-x-1" @click="generateProgram">
        <AppIcon icon="cogs" class="w-5 h-5" />
        Schedule a Race
      </AppButton>

      <AppButton
        class="flex items-center justify-center gap-x-1"
        :disabled="!_IS_PROGRAM_AVAILABLE"
        :variant="_TOGGLE_BUTTON_VARIANT"
        @click="toggleProgram">
        <AppIcon :key="_IS_RACE_RUNNING" :icon="_TOGGLE_BUTTON_ICON" class="w-5 h-5" />
        {{ _TOGGLE_BUTTON_TEXT }}
      </AppButton>
    </div>
  </div>
</template>

<style scoped>

</style>

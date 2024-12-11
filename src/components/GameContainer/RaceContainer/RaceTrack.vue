<script>
import { mapGetters, mapActions } from 'vuex'
import { SPEED_FACTOR } from '@/utils/constants.js'
import { CALCULATE_DURATION } from '@/utils/helpers.js'

export default {
  name: 'RaceTrack',
  data: () => ({
    horseElement: null
  }),
  props: {
    idx: {
      type: Number,
      required: true
    },
    horse: {
      type: Object,
      required: true,
      validator(value) {
        return value.hasOwnProperty('id') && value.hasOwnProperty('name') && value.hasOwnProperty('condition')
      }
    }
  },
  mounted() {
    this.horseElement = this.$refs?.horse
    this.ADD_ANIMATION_END_LISTENER()
  },
  methods: {
    ...mapActions({
      SET_HORSE_FINISHED: 'program/SET_HORSE_FINISHED'
    }),
    ADD_ANIMATION_END_LISTENER() {
      //! Animasyon yani At yarışı bitince atın durumunu güncelleyelim
      this.horseElement.addEventListener('animationend', () => {
        this.SET_HORSE_FINISHED({ roundId: this.CURRENT_ROUND.id, horseId: this.horse?.id })
      })
    },
    SET_HORSE_SPEED() {
      //! Atın gideceği bölgeyi ve Süreyi hesaplayabilmek için gidilecek yolun genişliğini alalım
      const container = this.$refs.raceTrack
      const containerWidth = container.offsetWidth // Container genişliği

      //! Condition bilgisine göre hızı hesaplayalım
      const speed = this.horse?.condition * SPEED_FACTOR // Atın hızı
      const duration = CALCULATE_DURATION(this.CURRENT_ROUND.distance, containerWidth, speed)

      //! Gidilecek mesafeyi ve süreyi Element'e set et
      this.horseElement.style.setProperty('--duration', `${duration}s`)
      this.horseElement.style.setProperty('--target-width', `${containerWidth - 40}px`) // Container genişliği
      this.horseElement.style.animationPlayState = 'running'
    }
  },
  computed: {
    ...mapGetters({
      IS_RACE_RUNNING: 'program/_IS_RACE_RUNNING',
      CURRENT_ROUND: 'program/_GET_CURRENT_ROUND'
    }),
    trackNoStyles() {
      return { opacity: (1 - (0.05 * this.idx)) }
    },
    horseNameStyles() {
      return { backgroundColor: this.horse?.color }
    },
    horseIconStyles() {
      return { color: this.horse?.color }
    }
  },
  watch: {
    IS_RACE_RUNNING(isRunning) {
      //! Yarışı başlatır veya durdurur
      if (isRunning) {
        this.SET_HORSE_SPEED()
      } else {
        this.horseElement.style.animationPlayState = 'paused'
      }
    },
    'CURRENT_ROUND.id': {
      handler(currentRound) {
        //! Her bir Round değişiminde yarışın otomatik olarak çalışmasını sağlar
        if (this.IS_RACE_RUNNING) {
          setTimeout(() => {
            this.SET_HORSE_SPEED()
          }, 1000)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<template>
  <div ref="raceTrack" class="race-track">
    <div class="track-no-container" :style="trackNoStyles">
      <span class="rotate-90">{{ idx + 1 }}</span>
    </div>
    <div class="horse-container">
      <div ref="horse" class="horse animate-move relative">
        <span class="horse-name" :style="horseNameStyles">{{ horse.name }} ({{ horse.condition }})</span>
        <AppIcon icon="horse" class="w-10 h-10" :style="horseIconStyles" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.horse {
  @apply w-10 h-10;
  animation-fill-mode: both;
  animation-play-state: paused;
}

.race-track {
  @apply relative flex items-center justify-start border border-dashed border-zinc-300 shadow-sm h-16;
}

.track-no-container {
  @apply border border-white shrink-0 bg-green-800 w-8 h-full flex items-center justify-center text-white rotate-180;
}

.horse-container {
  @apply px-2 relative flex items-center h-full w-full overflow-hidden;
}

.horse-name {
  @apply absolute top-1/2 whitespace-nowrap -ml-3 -translate-x-full -translate-y-1/2 px-2 rounded-md text-white font-medium bg-zinc-200 text-xs;
}

.race-track::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  background: repeating-linear-gradient(
    180deg,
    #7f7c7c 0 5px,
    white 5px 10px
  );
}

</style>

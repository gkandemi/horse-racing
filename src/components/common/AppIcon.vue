<script>
import {defineComponent, defineAsyncComponent} from 'vue'

export default defineComponent({
  name: "AppIcon",
  props: {
    icon: {
      type: String,
      required: true,
      validator(value) {
        return typeof value === 'string' && value.length >= 3;
      }
    }
  },
  data: () => ({
    ICON_NAME_MAP: {
      "play": "PlayIcon",
      "pause": "PauseIcon",
      "horse": "HorseIcon",
      "cogs": "GenerateIcon",
      "help": "HelpIcon",
    }
  }),
  computed: {
    iconName() {
      return this.ICON_NAME_MAP[this.icon?.toLowerCase()]
    },
    iconFile() {
      return defineAsyncComponent(() => import(`../svg/${this.iconName}.vue`))
    }
  }
})
</script>

<template>
  <component :is="iconFile"/>
</template>

<style scoped>

</style>

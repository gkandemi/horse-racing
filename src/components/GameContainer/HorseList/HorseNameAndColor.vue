<script>
export default {
  name: 'HorseNameAndColor',
  props: {
    name: {
      type: String,
      required: true,
      validator(value) {
        return typeof value === 'string' && value.length >= 1
      }
    },
    color: {
      type: String,
      required: true,
      validator(value) {
        return typeof value === 'string' && value.length >= 3
      }
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-start gap-x-1.5">
    <span class="inline-block w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: color }"></span>
    <span class="text-sm font-medium">{{ name }}</span>
  </div>
</template>

<style scoped>

</style>

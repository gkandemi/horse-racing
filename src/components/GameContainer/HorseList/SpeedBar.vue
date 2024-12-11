<script>
export default {
  name: 'SpeedBar',
  props: {
    condition: {
      type: Number,
      required: true,
      validator(value) {
        return typeof value === 'number' && value >= 0 && value <= 100;
      }
    },
  },
}
</script>

<template>
  <div class="flex items-center gap-2.5 pt-0.5 pl-4">
    <div class="text-xs text-green-900">Speed</div>
    <div class="flex-1 flex items-center gap-1.5">
      <div class="h-1 rounded-full w-full bg-zinc-200 flex overflow-hidden">
        <div :style="{width: condition + '%'}" class="bg-gradient-to-r from-green-400 to-green-800" />
      </div>
      <div class="text-xs text-zinc-500">{{ condition }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>

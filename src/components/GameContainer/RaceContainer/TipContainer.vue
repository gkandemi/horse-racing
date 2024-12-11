<script>
export default {
  name: 'TipContainer'
}
</script>

<template>
  <div class="relative border border-zinc-300 p-2 rounded-md self-end w-full text-zinc-700 text-sm flex flex-col gap-y-3">
    <AppIcon icon="help" class="text-green-600 absolute right-1 top-1 w-4 h-4" />
    <div class="tip-box">
      * To increase the speed of the horses, you can change the value of <code>export const SPEED_FACTOR = 5</code> located in <code>/src/utils/constants.js</code>.
    </div>
    <div class="tip-box gap-x-2">
      * To individually increase the condition of the horses, you can modify the <code>condition: Math.floor(Math.random() * 100) + 1</code> value inside the <code>export const GENERATE_RANDOM_HORSES = () => {...}</code> function located in <code>/src/utils/helpers.js</code>. A preset line of code that sets the condition between 65 and 100 is available as a comment. <code>condition: Math.floor(Math.random() * (100 - 65 + 1)) + 65 </code>
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
</style>

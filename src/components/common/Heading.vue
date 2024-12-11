<script>
export default {
  name: 'Heading',
  props: {
    title: {
      type: String,
      required: true,
      validator(value) {
        return typeof value === 'string' && value.length >= 3;
      }
    },
  },
  inheritAttrs: false
}
</script>

<template>
  <h3 v-bind="$attrs">{{ title }}</h3>
</template>

<style scoped>

</style>

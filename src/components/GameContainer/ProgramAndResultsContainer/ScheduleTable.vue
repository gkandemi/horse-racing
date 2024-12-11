<script>
export default {
  name: 'ScheduleTable',
  props: {
    items: {
      type: Array,
      required: true,
      validator(value) {
        return value.length > 0
      }
    },
    title: {
      type: String,
      required: true,
      validator(value) {
        return value.length > 0
      }
    },
    fields: {
      type: Array,
      default: () => [],
      validator(value) {
        return value.length > 0
      }
    },
    isResult: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    roundClasses(){
      return {
        'bg-gray-300/70 text-gray-900': !this.isActive,
        'bg-red-300/70 text-red-900': !this.isResult && this.isActive,
        'bg-green-300/70 text-green-900' : this.isResult && this.isActive,
      }
    }
  }
}
</script>

<template>
  <div>
    <Heading
      :title="title"
      class="text-sm text-center py-1"
      :class="roundClasses"
    />
    <AppTable :items="items" :fields="fields">
      <template #name="{ item: { name, condition, color } }">
        <div class="flex items-center justify-start gap-x-1.5">
          <span class="inline-block w-3 h-3 rounded-full"
                :style="{ backgroundColor: color }"></span>
          <span>{{ name }}</span>
          <span class="text-xs text-gray-500">({{ condition }})</span>
        </div>
      </template>
    </AppTable>
  </div>
</template>

<style scoped>

</style>

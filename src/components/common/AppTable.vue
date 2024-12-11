<script>
import { isFunction } from 'lodash'

export default {
  name: 'AppTable',
  methods: {
    isFunction,
    attachClasses(field) {
      return { ...field?.headingClass && { [field?.headingClass]: true } }
    }
  },
  props: {
    fields: {
      type: Array,
      required: true,
      validator(value) {
        return value.length > 0
      }
    },
    items: {
      type: Array,
      required: true,
      validator(value) {
        return value.length > 0
      }
    }
  }
}
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th v-for="field in fields" :key="field.name" v-html="field.label" :class="attachClasses(field)" />
      </tr>
      </thead>
      <tbody class="w-full">
      <tr v-for="item in items" :key="item.id">
        <td v-for="(cell) in fields" :key="`${item.id}_${cell.field}`">
          <slot v-if="$slots[cell.field]" :name="cell.field" :item="item" />
          <template v-else-if="isFunction(cell?.formatter)">
            {{ cell?.formatter(item[cell.field], item, this) }}
          </template>
          <template v-else>
            {{ item[cell.field] }}
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  @apply w-full overflow-x-scroll table-scroll overflow-y-scroll h-full;
}

table {
  @apply w-full;
}

thead {
  @apply sticky top-0 bg-white shadow z-10;
}

thead tr {
  @apply h-[1.75rem] text-zinc-700 bg-zinc-100;
}

thead tr th {
  @apply px-2 text-xs font-medium text-zinc-500;
}

tbody tr {
  @apply hover:bg-zinc-200;
}

tbody tr td {
  @apply p-2 text-sm text-center border-t border-[#DFE3E8] text-zinc-700 whitespace-nowrap
}

.table-scroll::-webkit-scrollbar-thumb:hover {
  background-color: rgba(85, 85, 85, .5);
}
</style>

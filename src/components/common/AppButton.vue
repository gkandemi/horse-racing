<script>
import {defineComponent, h} from 'vue'
export default defineComponent({
  name: "AppButton",
  props: {
    variant: {
      type: String,
      default: "primary", // success, danger
    },
    tag: {
      type: String,
      default: "button"
    },
  },
  computed: {
    buttonClasses() {
      return {
        'h-9 text-sm px-5 rounded-full font-medium': true,
        'border border-zinc-300 text-zinc-700 hover:text-black hover:border-zinc-500': this.variant === 'primary',
        'text-white bg-green-600 hover:bg-opacity-90': this.variant === 'success',
        'text-white bg-red-500 hover:bg-opacity-90': this.variant === 'danger',
        '!text-white !opacity-30 pointer-events-none !focus:outline-none disabled:opacity-25': this.$attrs?.disabled,
      }
    }
  },
  render() {
    return h(
        this.tag,
        {...this.$attrs, class: {...this.buttonClasses, ...({[this.$attrs?.class]: true} || {})},},
        [
          this.$slots.default?.() ?? null,
        ]
    )
  }
})
</script>

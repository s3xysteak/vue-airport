import { INJECT_KEY } from './shared'

export default defineComponent(
  (props, { slots, emit }) => {
    const checked = props?.modelValue
      ? computed({
        get: () => props.modelValue,
        set: val => emit('update:modelValue', val),
      })
      : ref(props?.initial ?? '')

    provide(INJECT_KEY, { checked })

    return () => h('div', slots.default && slots.default())
  },
  {
    name: 'Menulist',
    props: {
      modelValue: {
        type: [Number, String],
      },
      initial: {
        type: [Number, String],
      },
    },
    emits: ['update:modelValue'],
  },
)

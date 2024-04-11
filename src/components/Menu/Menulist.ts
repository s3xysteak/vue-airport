import type { InjectionKey, Ref } from 'vue'

interface Inject {
  currentValue: Ref<string | number>
}
export const INJECT_KEY = Symbol('menu') as InjectionKey<Inject>

export default defineComponent(
  (props, { slots, emit }) => {
    const currentValue = props?.modelValue
      ? computed({
        get: () => props.modelValue,
        set: val => emit('update:modelValue', val),
      })
      : ref(props?.initial ?? '')

    provide(INJECT_KEY, { currentValue })

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

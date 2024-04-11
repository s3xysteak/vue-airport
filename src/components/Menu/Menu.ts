import { type SlotsType, cloneVNode } from 'vue'
import { INJECT_KEY } from './Menulist'

export default defineComponent(
  (props, { slots }) => {
    const { currentValue } = inject(INJECT_KEY)!

    const errorStr = '[Menu] 必须有且仅有一个子节点'

    if (!slots?.default)
      throw new Error(errorStr)

    const checked = computed(() => currentValue.value === props.value)

    const vSlot = reactive({ checked })

    if (!slots.default)
      throw new Error('[Menu] 必须至少有一个子元素')

    return () => {
      const children = slots.default!(vSlot)

      if (children.length > 1)
        throw new Error(errorStr)
      const child = children[0]

      const cloned = cloneVNode(child, {
        onClick: () => {
          currentValue.value = props.value
        },
      })

      return cloned
    }
  },
  {
    name: 'Menu',
    props: {
      value: {
        type: [Number, String],
        required: true,
      },
    },
    slots: Object as SlotsType<{
      default: { checked: boolean }
    }>,
  },
)

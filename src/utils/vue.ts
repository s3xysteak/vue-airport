import type { InjectionKey } from 'vue'

/** 依赖注入工厂函数 */
export function createProvider<T = any>(onProvider: () => T, onInject?: () => T) {
  const injectKey = Symbol('createProvider') as InjectionKey<T>

  const useInject = onInject ?? (() => inject(injectKey)!)
  const useProvide = () => {
    const val = onProvider()
    provide(injectKey, val)
    return val
  }

  return [useProvide, useInject]
}

/**
 * 用于在`h()`中简写v-model
 * @param target - 用于双向绑定的响应式变量
 * @param arg - 默认为 `'modelValue'`
 *
 * @example
 * ```js
 * const val = ref()
 * h('input', {...vModel(val)})
 * ```
 * 等价于
 * ```html
 * <input v-model="val" />
 * ```
 */
export function vModel<T = any>(target: Ref<T>, arg = 'modelValue') {
  return {
    [arg]: target.value,
    [`on-update:${arg}`]: (val: any) => target.value = val,

    // TODO: fix type
  } as any
}

import type { InjectionKey, Ref } from 'vue'

interface Inject {
  checked: Ref<string | number>
}
export const INJECT_KEY = Symbol('menu') as InjectionKey<Inject>

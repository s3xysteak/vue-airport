import { objectMap, onDevFactory } from '@s3xysteak/utils'

/** 只在开发时调用 */
export const onDev = onDevFactory(import.meta.env.DEV)

/** 抛错 */
export function throwError(msg?: string): never {
  throw new Error(msg)
}

/** Lodash - get */
export function objectGet(source: Record<string, any>, path: string, defaultValue: any = undefined) {
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let result = source
  for (const p of paths) {
    result = Object(result)[p]
    if (result === undefined)
      return defaultValue
  }
  return result
}

/**
 * 假设对象的每个键名都是路径，取倒数第二个路径名，移除开头的`数字.`，结果作为键名，返回对象。
 * @example
 * ```js
 * normalizeModules({
 *   './a/01.foo/b.c': 1
 *   './a/bar/b.c': 2
 * }) // => { foo: 1, bar: 2 }
 * ```
 */
export function normalizeModules<T>(v: Record<string, T>) {
  return objectMap(v, (k, v) => [k.split('/').at(-2)!.replace(/^\d*\./, ''), v])
}

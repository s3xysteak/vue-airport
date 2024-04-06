export function usePlus() {
  const one = ref(1)
  const two = ref(2)

  return {
    one,
    two,
    sum: computed(() => plus(one.value, two.value)),
    onPlus() {
      one.value++
      two.value++
    },
  }
}

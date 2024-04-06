<script setup>
const { one, two, sum, onPlus } = usePlus()
</script>

<template>
  <div mt-10 flex="~ col center">
    <button h-10 w-20 rounded transition active="bg-gray-2 c-dark" hover="bg-light c-dark/70" @click="onPlus">
      点我
    </button>
    <div>
      {{ one }}, {{ two }}, {{ sum }}
    </div>
  </div>
</template>

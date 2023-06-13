<script setup lang="ts">
const emit = defineEmits(['press', 'reset'])

const emitPress = (value: string) => {
  emit('press', value)
}
</script>

<template>
  <div class="flex flex-col text-gray-100 justify-center items-center justify-center w-1/4 gap-5">
    <div>
      <input
        type="submit"
        class="w-28 h-24 bg-gray-500 rounded text-5xl cursor-pointer"
        value="A"
        @click="emitPress('A')"
      />
    </div>
    <div class="flex flex-row gap-5">
      <input
        type="submit"
        class="w-28 h-24 bg-gray-500 rounded text-5xl cursor-pointer"
        value="G"
        @click="emitPress('G')"
      />
      <input
        type="submit"
        class="w-28 h-24 bg-gray-500 rounded text-5xl cursor-pointer"
        value="D"
        @click="emitPress('D')"
      />
    </div>
    <div class="flex flex-row gap-5 w-full p-5">
      <input
        type="submit"
        class="w-full bg-gray-500 rounded text-xl cursor-pointer"
        value="Reset"
        @click="emit('reset')"
      />
    </div>
  </div>
</template>

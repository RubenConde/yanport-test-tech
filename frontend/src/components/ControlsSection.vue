<script setup lang="ts">
const emit = defineEmits(['press', 'reset'])

const emitPress = (value: string) => {
  emit('press', value)
}
</script>

<template>
  <div class="flex flex-col text-gray-100 items-center justify-center md:w-1/4 gap-5">
    <div>
      <input
        type="submit"
        class="w-28 h-20 bg-gray-500 rounded text-5xl cursor-pointer"
        value="A"
        @click="emitPress('A')"
      />
    </div>
    <div class="flex flex-row gap-5">
      <input
        type="submit"
        class="w-28 h-20 bg-gray-500 rounded text-5xl cursor-pointer"
        value="G"
        @click="emitPress('G')"
      />
      <input
        type="submit"
        class="w-28 h-20 bg-gray-500 rounded text-5xl cursor-pointer"
        value="D"
        @click="emitPress('D')"
      />
    </div>
    <div class="h-20 flex flex-row p-5 w-full">
      <input
        type="submit"
        class="w-full bg-gray-500 rounded text-lg cursor-pointer"
        value="Reset"
        @click="emit('reset')"
      />
    </div>
  </div>
</template>

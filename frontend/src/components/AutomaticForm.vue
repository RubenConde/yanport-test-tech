<script setup lang="ts">
import { CardinalDirections } from '@/types/CardinalDirection.enum'
import { ref, type Ref } from 'vue'
import type RequestBody from '../types/RequestBody'
const emit = defineEmits(['press'])

const numberOfColumns = ref(10)
const numberOfRows = ref(10)
const initialColumn = ref(5)
const initialRow = ref(5)
const command = ref('DADADADAA')
const orientation: Ref<CardinalDirections> = ref(CardinalDirections.North)
const cardinalDirections = Object.values(CardinalDirections)

const emitSubmit = () => {
  const body: RequestBody = {
    gridSize: {
      x: numberOfRows.value,
      y: numberOfColumns.value
    },
    initialPosition: {
      x: initialColumn.value,
      y: initialRow.value,
      orientation: orientation.value
    },
    commandString: command.value
  }
  emit('press', body)
}
</script>

<template>
  <form
    class="text-lg text-gray-100 flex flex-row w-3/4 p-1 gap-5 content-around justify-center"
    @submit.prevent="emitSubmit"
  >
    <div class="text-lg text-gray-100 flex flex-col justify-center">
      Columns:
      <input
        v-model.number="numberOfColumns"
        class="text-lg text-gray-900"
        type="number"
        max="20"
      />
      Rows:
      <input v-model.number="numberOfRows" class="text-lg text-gray-900" type="number" max="20" />
    </div>
    <div class="text-lg text-gray-100 flex flex-col justify-center">
      Initial Column:
      <input
        v-model.number="initialColumn"
        class="text-lg text-gray-900"
        type="number"
        :max="numberOfColumns - 1"
      />
      Initial Row:
      <input
        v-model.number="initialRow"
        class="text-lg text-gray-900"
        type="number"
        :max="numberOfRows - 1"
      />
    </div>
    <div class="text-lg text-gray-100 flex flex-col justify-center">
      Command:
      <input v-model="command" class="text-lg text-gray-900" type="text" />
      Orientation
      <select v-model="orientation" class="text-lg text-gray-900">
        <option v-for="(item, index) in cardinalDirections" :key="index">{{ item }}</option>
      </select>
    </div>
    <div class="text-lg text-gray-100 flex flex-col items-center justify-center">
      <input
        required
        type="submit"
        class="w-28 h-24 bg-gray-500 rounded text-xl cursor-pointer"
        value="Send"
        @submit="emitSubmit"
      />
    </div>
  </form>
</template>

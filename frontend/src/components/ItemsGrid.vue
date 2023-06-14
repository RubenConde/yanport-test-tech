<script setup lang="ts">
import Arrow from './HooverArrow.vue'
import type RequestBody from '../types/RequestBody'

import { computed, type PropType } from 'vue'
const props = defineProps({
  numberOfColumns: { type: Number, required: true, default: 10 },
  numberOfRows: { type: Number, required: true, default: 10 },
  arrowPosition: {
    type: Object as PropType<RequestBody['initialPosition']>,
    required: true
  }
})

const cardsArray = computed(() => {
  const cards = []
  const columnRow = Array.from(Array(props.numberOfRows).keys())
  for (let i = 0; i < props.numberOfColumns; i++) {
    cards.push(columnRow)
  }
  return cards
})
</script>

<template>
  <div
    class="flex flex-col-reverse w-full md:w-3/4 h-full bg-gray-800 rounded text-gray-50 justify-center"
  >
    <div
      v-for="(item, index) in cardsArray"
      :key="index"
      class="flex flex-row h-full w-full items-stretch justify-center"
    >
      <div
        v-for="(it, idx) in item"
        :key="idx"
        class="h-full w-full border-[1px] text-xs flex flex-col items-center justify-center relative overflow-hidden"
      >
        <small class="absolute z-0 opacity-25 select-none">{{ `x:${idx},y:${index}` }}</small>
        <Arrow
          class="z-10"
          :orientation="arrowPosition.orientation"
          v-if="arrowPosition.x === idx && arrowPosition.y === index"
        />
      </div>
    </div>
  </div>
</template>

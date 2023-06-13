<script setup lang="ts">
import Arrow from './HooverArrow.vue'
import type RequestBody from '../types/RequestBody'

import { ref, computed, type PropType } from 'vue'
const props = defineProps({
  numberOfColumns: { type: Number, required: true, default: 10 },
  numberOfRows: { type: Number, required: true, default: 10 },
  arrowPosition: {
    type: Object as PropType<RequestBody["initialPosition"]>,
    required: true,
  }
})


const cardsArray = computed(() => {
  const cards = []
  const columnRow = Array.from(Array(props.numberOfColumns).keys())
  for (let i = 0; i < props.numberOfRows; i++) {
    cards.push(columnRow)
  }
  return cards
})
</script>

<template>
  <div class="flex flex-col-reverse w-3/4 bg-gray-800 rounded-xl text-gray-50">
    <div
      v-for="(item, index) in cardsArray"
      :key="index"
      class="flex flex-row flex-nowrap justify-center h-full w-full"
    >
      <div v-for="(it, idx) in item" :key="idx" class="h-full w-full border-2 text-xs">
        <Arrow
          class="relative top-1/4"
          :orientation="arrowPosition.orientation"
          v-if="arrowPosition.x === idx && arrowPosition.y === index"
        />
        <!-- <small class="relative left-0 top-0">{{ `x:${idx},y:${index}` }}</small> -->
      </div>
    </div>
  </div>
</template>

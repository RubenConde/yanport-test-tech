<script setup lang="ts">
import ControlsSection from '../components/ControlsSection.vue'
import AutomaticForm from '../components/AutomaticForm.vue'
import ItemsGrid from '../components/ItemsGrid.vue'
import type RequestBody from '../types/RequestBody'
import axios from 'axios'
import { ref } from 'vue'

const numberOfColumns = ref(10)
const numberOfRows = ref(10)
const arrowPosition = ref({ x: 0, y: 0, orientation: 'N' })
const componentKey = ref(0)

const reset = () => {
  window.location.reload()
}

const getAutomaticConfiguration = (event: RequestBody) => {
  numberOfColumns.value = event.gridSize.y
  numberOfRows.value = event.gridSize.x

  axios.post('http://localhost:3000/setup', event).then((resp) => {
    const steps: object[] = resp.data
    let timer = 0
    steps.forEach((step) => {
      setTimeout(() => {
        arrowPosition.value = step.position
      }, (timer += 1000))
    })
  })
}

const getControlsCommands = (event: string) => {
  axios
    .post('http://localhost:3000/setup', {
      gridSize: {
        x: numberOfRows.value,
        y: numberOfColumns.value
      },
      initialPosition: arrowPosition.value,
      commandString: event
    })
    .then((resp) => {
      const steps: object[] = resp.data
      arrowPosition.value = steps[steps.length - 1].position
    })
}
</script>

<template>
  <main class="w-screen h-screen p-10 bg-gray-900" :key="componentKey">
    <div class="flex flex-row h-4/5">
      <ItemsGrid
        :number-of-columns="numberOfColumns"
        :number-of-rows="numberOfRows"
        :arrow-position="arrowPosition"
      />
      <ControlsSection @press="getControlsCommands" @reset="reset" />
    </div>
    <div class="flex flex-row p-5 h-1/5">
      <AutomaticForm @press="getAutomaticConfiguration" />
    </div>
  </main>
</template>

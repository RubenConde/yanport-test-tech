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
        console.log(step.position)
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
  <main class="bg-gray-900 h-full w-full items-center" :key="componentKey">
    <div class="p-5 md:p-10 flex flex-col md:flex-row w-full h-full md:h-4/5 gap-5">
      <ItemsGrid
        :number-of-columns="numberOfColumns"
        :number-of-rows="numberOfRows"
        :arrow-position="arrowPosition"
      />
      <ControlsSection @press="getControlsCommands" @reset="reset" />
    </div>
    <div class="flex flex-col md:flex-row p-5 md:p-10  md:h-1/5">
      <AutomaticForm @press="getAutomaticConfiguration" />
    </div>
  </main>
</template>

<style>
html,
body,
#app {
  height: 100%;
   --tw-bg-opacity: 1;
  background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
}
</style>

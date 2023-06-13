<script setup lang="ts">
import { CardinalDirections } from '@/types/CardinalDirection.enum'

defineProps({
  orientation: { type: String, required: true }
})
</script>

<template>
  <div
    class="arrow"
    :class="{
      'arrow-up': orientation === CardinalDirections.North,
      'arrow-right': orientation === CardinalDirections.East,
      'arrow-down': orientation === CardinalDirections.South,
      'arrow-left': orientation === CardinalDirections.West
    }"
  ></div>
</template>

<style scoped>
.arrow-up {
  width: 0;
  height: 0;
  border-left: 0.8rem solid transparent;
  border-right: 0.8rem solid transparent;
  border-bottom: 0.8rem solid blueviolet;
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 0.8rem solid transparent;
  border-right: 0.8rem solid transparent;
  border-top: 0.8rem solid blueviolet;
}

.arrow-right {
  width: 0;
  height: 0;
  border-top: 0.8rem solid transparent;
  border-bottom: 0.8rem solid transparent;
  border-left: 0.8rem solid blueviolet;
}

.arrow-left {
  width: 0;
  height: 0;
  border-top: 0.8rem solid transparent;
  border-bottom: 0.8rem solid transparent;
  border-right: 0.8rem solid blueviolet;
}
</style>

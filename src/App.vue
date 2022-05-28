<script setup lang="ts">

import { onMounted, ref, watch } from 'vue'
import { $ref } from 'vue/macros'
import { usePlumAnimation } from './composables/usePlumAnimation'

let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

// rectangle size
const rectW = $ref(document.body.clientWidth)
const rectH = $ref(800)

function init() {
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  ctx = canvas.getContext('2d')!;

  // canvas style
  canvas.width = rectW
  canvas.height = rectH
  ctx.fillStyle = 'black'; // background color of the rectangle in the canvas

  // draw a rectangle
  ctx.fillRect(10, 10, canvas.width, canvas.height);
}

const isStart = ref(false)
onMounted(() => {
  // initialize canvas
  init()

  // start the animation
  watch(isStart, () => {
    if (!isStart.value) return
    usePlumAnimation(ctx, {x: 200, y: 200}, 0)
  })
})

</script>

<template>
  <div>
    <canvas ref="el" id="canvas" style="border: 1px solid rgba(255, 255, 255, 0.3)"></canvas>
    <br>

    <button @click="isStart = !isStart">start</button>
  </div>
</template>

<style>
* {
  background-color: black;
}
button {
  border: 1px solid white;
  color: white;
  margin-right: 20px;
}
</style>
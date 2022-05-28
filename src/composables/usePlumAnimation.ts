import { Point, Branch } from '../types'
import { randomFloat } from '../util'

export function usePlumAnimation(ctx: CanvasRenderingContext2D, st: Point, theta: number) {
  if (ctx === null) return

  const DELTA_THETA = - Math.PI / 8 // branch delta theta
  const MIN_DEPTH = 50 // BFS at least minDepth depths
  const CHANCE = 0.4 // if the possibility < chance, generate branch
  const MIN_LEN = 5 // min length of branch
  const MAX_LEN = 15 // max length of branch

  function lineTo(p1: Point, p2: Point) {
    let grd = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    grd.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    grd.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
    ctx.strokeStyle = grd

    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
  }

  function getEndPoint(b: Branch): Point {
    return {
      x: b.st.x + b.length * Math.cos(b.theta),
      y: b.st.y + b.length * Math.sin(b.theta),
    }
  }

  // BFS to generate all the branches, but no drawing the lines
  function getBranches(b: Branch) {
    let pendingTasks: Branch[] = []
    pendingTasks.push(b)

    let hh = 0
    let tt = 1
    let depth = 0
    while (hh < tt) {
      const head = pendingTasks[hh++]
      const en = getEndPoint(head)

      // left branch
      if (depth < MIN_DEPTH || Math.random() < CHANCE) {
        const theta = randomFloat(head.theta - DELTA_THETA, head.theta)
        const length = randomFloat(MIN_LEN, MAX_LEN)
        const lb = {
          st: en,
          length: length,
          theta: theta
        }
        pendingTasks.push(lb)
        tt++
      }

      // right branch
      if (depth < MIN_DEPTH || Math.random() < CHANCE) {
        const theta = randomFloat(head.theta, head.theta + DELTA_THETA)
        const length = randomFloat(MIN_LEN, MAX_LEN)
        const rb = {
          st: en,
          length: length,
          theta: theta
        }
        pendingTasks.push(rb)
        tt++
      }

      depth++
    }

    return {
      pendingTasks
    }
  }

  function drawBranches(pendingTasks: Branch[]) {
    pendingTasks.forEach((i, index) => {
      setTimeout(() => {
        lineTo(i.st, getEndPoint(i))
      }, 20 * index)
    })
  }

  function drawPlum(st: Point, theta: number) {
    const { pendingTasks } = getBranches({
      st: st,
      theta: theta,
      length: randomFloat(MIN_LEN, MAX_LEN)
    })

    // draw all the branches with animation
    drawBranches(pendingTasks)
  }

  drawPlum(st, theta)
}
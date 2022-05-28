export function randomFloat(a: number, b: number) {
  if (a > b) {
    let t = a
    a = b
    b = t
  }
  return Math.random() * (b - a) + a
}
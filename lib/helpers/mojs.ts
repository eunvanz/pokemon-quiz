// @ts-ignore
import mojs from '@mojs/core'

class Star extends mojs.CustomShape {
  getShape() {
    return '<path d="M5.51132201,34.7776271 L33.703781,32.8220808 L44.4592855,6.74813038 C45.4370587,4.30369752 47.7185293,3 50,3 C52.2814707,3 54.5629413,4.30369752 55.5407145,6.74813038 L66.296219,32.8220808 L94.488678,34.7776271 C99.7034681,35.1035515 101.984939,41.7850013 97.910884,45.2072073 L75.9109883,63.1330483 L82.5924381,90.3477341 C83.407249,94.4217888 80.4739296,97.6810326 77.0517236,97.6810326 C76.0739505,97.6810326 74.9332151,97.3551083 73.955442,96.7032595 L49.8370378,81.8737002 L26.044558,96.7032595 C25.0667849,97.3551083 23.9260495,97.6810326 22.9482764,97.6810326 C19.3631082,97.6810326 16.2668266,94.4217888 17.4075619,90.3477341 L23.9260495,63.2960105 L2.08911601,45.2072073 C-1.98493875,41.7850013 0.296531918,35.1035515 5.51132201,34.7776271 Z" />'
  }
}
mojs.addShape('star', Star)

export interface BurstOptions {
  left?: number
  top?: number
  right?: number
  bottom?: number
  color: string | { [key: string]: string } | string[]
  radius: { [key: number]: number }
  count: number
  degree?: number | string
  degreeShift?: string
  rotate?: { [key: number]: number }
  duration?: number | number[]
  opacity?: { [key: number]: number }
  scale?: { [key: number]: number }
  shape?: 'star' | 'circle' | 'polygon'
  itemRadius?: number | string
  delay?: string
  points?: number
  parent?: HTMLElement | null
}

const generateBurst = ({
  left,
  top,
  right,
  bottom,
  color,
  radius,
  count,
  degree,
  opacity,
  scale = { 1: 0 },
  shape = 'star',
  itemRadius = 6,
  rotate,
  delay,
  points,
  degreeShift,
  parent,
}: BurstOptions) => {
  return new mojs.Burst({
    parent,
    left,
    top,
    right,
    bottom,
    radius,
    angle: 0,
    count,
    degree,
    children: {
      shape,
      radius: itemRadius,
      fill: color,
      scale: { ...scale, easing: 'quad.in' },
      // pathScale: [0.5, null],
      // degreeShift: [0, null],
      // duration: [1000, 1200],
      rotate,
      easing: 'quint.out',
      delay,
      points,
      degreeShift,
    },
    isShowEnd: false,
    opacity,
    onComplete: function () {
      this.el.parentNode.removeChild(this.el)
    },
  })
}

export const burstStar = (options: BurstOptions) => {
  const burst = generateBurst(options)
  burst.el.style.zIndex = 999999
  burst.tune().play()
}

'use client'

import {useEffect, useRef} from 'react'

export function ActivityGridBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const hero = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !hero || !ctx) return
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0,
      height = 0,
      frame = 0,
      time = 0,
      previous = 0
    let visible = true
    const pointer = {x: 0, y: 0, tx: 0, ty: 0, strength: 0, active: false}
    let rings: {x: number; y: number; start: number}[] = []
    const draw = (now: number) => {
      frame = 0
      const dt = Math.min((now - previous) / 1000, 0.05)
      previous = now
      if (!motion.matches) time += dt
      const ease = 1 - Math.exp(-dt * 9)
      pointer.x += (pointer.tx - pointer.x) * ease
      pointer.y += (pointer.ty - pointer.y) * ease
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * ease
      ctx.clearRect(0, 0, width, height)
      const color = document.documentElement.classList.contains('dark')
        ? '107,204,130'
        : '43,126,67'
      const gap = width < 620 ? 32 : 28
      rings = rings.filter((r) => time - r.start < 2.4)
      for (let y = 14; y < height; y += gap) {
        for (let x = 14; x < width; x += gap) {
          const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
          const noise = seed - Math.floor(seed)
          const edge = Math.max(
            0,
            Math.min(1, x / 90, (width - x) / 90, y / 90, (height - y) / 90)
          )
          const distance = Math.hypot(x - pointer.x, y - pointer.y)
          const influence = motion.matches
            ? 0
            : Math.exp(-Math.pow(distance / 155, 2) * 2) * pointer.strength
          let wave = 0
          for (const ring of rings) {
            const age = time - ring.start
            wave +=
              Math.exp(
                -Math.pow(
                  (Math.hypot(x - ring.x, y - ring.y) - age * 220) / 36,
                  2
                )
              ) *
              (1 - age / 2.4)
          }
          const ambient = motion.matches
            ? 0.3
            : Math.pow((Math.sin(time * 0.7 + noise * 20) + 1) / 2, 5)
          const alpha =
            (0.016 + ambient * 0.045 + influence * 0.19 + wave * 0.16) * edge
          const size = 5 + noise * 5 + influence * 3 + wave * 2
          const push = (influence * 9) / Math.max(distance, 1)
          ctx.fillStyle = `rgba(${color},${alpha})`
          ctx.beginPath()
          ctx.roundRect(
            x + (x - pointer.x) * push - size / 2,
            y + (y - pointer.y) * push - size / 2,
            size,
            size,
            2
          )
          ctx.fill()
        }
      }
      if (visible && !document.hidden && !motion.matches)
        frame = requestAnimationFrame(draw)
    }
    const restart = () => {
      cancelAnimationFrame(frame)
      if (visible && !document.hidden) {
        previous = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }
    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      const ratio = Math.min(devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      restart()
    }
    const move = (event: PointerEvent) => {
      if (motion.matches) return
      const bounds = canvas.getBoundingClientRect()
      pointer.tx = event.clientX - bounds.left
      pointer.ty = event.clientY - bounds.top
      if (!pointer.active) {
        pointer.x = pointer.tx
        pointer.y = pointer.ty
      }
      pointer.active = event.pointerType !== 'touch'
    }
    const leave = () => {
      pointer.active = false
    }
    const ripple = (event: PointerEvent) => {
      if (motion.matches) return
      move(event)
      rings = [...rings.slice(-3), {x: pointer.tx, y: pointer.ty, start: time}]
    }
    const motionChange = () => {
      rings = []
      pointer.active = false
      pointer.strength = 0
      restart()
    }
    const sizeObserver = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      restart()
    })
    const themeObserver = new MutationObserver(restart)
    sizeObserver.observe(canvas)
    visibilityObserver.observe(hero)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    hero.addEventListener('pointermove', move, {passive: true})
    hero.addEventListener('pointerdown', ripple, {passive: true})
    hero.addEventListener('pointerleave', leave)
    hero.addEventListener('pointercancel', leave)
    document.addEventListener('visibilitychange', restart)
    motion.addEventListener('change', motionChange)
    resize()
    return () => {
      cancelAnimationFrame(frame)
      sizeObserver.disconnect()
      visibilityObserver.disconnect()
      themeObserver.disconnect()
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerdown', ripple)
      hero.removeEventListener('pointerleave', leave)
      hero.removeEventListener('pointercancel', leave)
      document.removeEventListener('visibilitychange', restart)
      motion.removeEventListener('change', motionChange)
    }
  }, [])
  return <canvas ref={ref} className="activity-grid" aria-hidden="true" />
}

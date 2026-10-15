import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'motion/react'

export function CursorGlow({ disabled }) {
  const glow = useRef()
  useEffect(() => {
    if (disabled || !window.matchMedia('(pointer: fine)').matches) return
    const element = glow.current
    const x = gsap.quickTo(element, 'x', { duration: 0.65, ease: 'power3' })
    const y = gsap.quickTo(element, 'y', { duration: 0.65, ease: 'power3' })
    const move = (event) => { x(event.clientX); y(event.clientY) }
    window.addEventListener('pointermove', move)
    return () => { window.removeEventListener('pointermove', move); gsap.killTweensOf(element) }
  }, [disabled])
  return disabled ? null : <div ref={glow} className="cursor-glow" aria-hidden="true" />
}

export function Reveal({ children, className = '', disabled = false, delay = 0 }) {
  return <motion.div className={className} initial={disabled ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

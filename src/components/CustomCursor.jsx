import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const isHoveredRef = useRef(false)
  const isClickedRef = useRef(false)
  const isVisibleRef = useRef(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only activate on desktop devices with a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mediaQuery.matches) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    return () => {
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  useEffect(() => {
    if (!enabled || !cursorRef.current || !ringRef.current) return

    const cursor = cursorRef.current
    const ring = ringRef.current

    // GSAP quickTo for ultra-fluid, hardware-accelerated position interpolation
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.16, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.16, ease: 'power3.out' })

    const updateScale = () => {
      const isH = isHoveredRef.current
      const isC = isClickedRef.current

      let targetScale = 1
      if (isH && isC) {
        targetScale = 1.25
      } else if (isH) {
        targetScale = 1.6
      } else if (isC) {
        targetScale = 0.78
      }

      ring.style.transform = `scale(${targetScale})`
      if (isH) {
        ring.classList.add('cursor-hovered')
      } else {
        ring.classList.remove('cursor-hovered')
      }
      if (isC) {
        ring.classList.add('cursor-clicked')
      } else {
        ring.classList.remove('cursor-clicked')
      }
    }

    const checkClickable = (el) => {
      if (!el || !el.closest) return false
      return Boolean(
        el.closest(
          'a, button, [role="button"], input, select, textarea, label, .contact-card, .tech-card, .project-card, .hero-capability-badge, .cursor-pointer, [data-cursor="pointer"]'
        ) || (window.getComputedStyle(el).cursor === 'pointer')
      )
    }

    const onMouseMove = (e) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        gsap.set(cursor, { x: e.clientX, y: e.clientY })
        cursor.style.opacity = '1'
      } else {
        xTo(e.clientX)
        yTo(e.clientY)
      }
    }

    const onMouseOver = (e) => {
      const isClickable = checkClickable(e.target)
      if (isClickable !== isHoveredRef.current) {
        isHoveredRef.current = isClickable
        updateScale()
      }
    }

    const onMouseOut = (e) => {
      const related = e.relatedTarget
      const isClickable = checkClickable(related)
      if (isClickable !== isHoveredRef.current) {
        isHoveredRef.current = isClickable
        updateScale()
      }
    }

    const onMouseDown = () => {
      isClickedRef.current = true
      updateScale()
    }

    const onMouseUp = () => {
      isClickedRef.current = false
      updateScale()
    }

    const onMouseLeave = () => {
      isVisibleRef.current = false
      cursor.style.opacity = '0'
    }

    const onMouseEnter = () => {
      isVisibleRef.current = true
      cursor.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    window.addEventListener('blur', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('blur', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={cursorRef}
      className="custom-cursor-container"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <div ref={ringRef} className="custom-cursor-ring" />
    </div>
  )
}

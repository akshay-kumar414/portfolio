import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SectionHeader({ number, label, heading, align = 'left', className = '' }) {
  const headerRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={headerRef}
      className={`mb-16 md:mb-20 ${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      <p className="text-label">
        {number && <span className="text-accent">{number}</span>}
        {number && ' // '}
        {label}
      </p>
      <h2 className="text-display-md mt-4">{heading}</h2>
    </div>
  )
}

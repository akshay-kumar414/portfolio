import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portfolio from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const contentRef = useRef(null)
  const dividerRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Content columns stagger entrance
      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      })

      // Divider fade in
      gsap.from(dividerRef.current, {
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })

      // Bottom bar
      gsap.from(bottomRef.current, {
        scrollTrigger: {
          trigger: bottomRef.current,
          start: 'top 98%',
          toggleActions: 'play none none none',
        },
        y: 10,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const socialLinksArray = [
    { label: 'GitHub', href: portfolio.socialLinks.github },
    { label: 'LinkedIn', href: portfolio.socialLinks.linkedin },
    { label: 'Email', href: portfolio.socialLinks.email },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden pt-16 md:pt-20 pb-10 md:pb-12 border-t border-white/[0.06] bg-gradient-to-b from-[#08070e] via-bg-primary to-bg-primary"
    >
      {/* Subtle atmospheric glow connecting with Contact section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        {/* ═══ Main 3-Column Footer Grid ═══ */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 pb-12 md:pb-16"
        >
          {/* Column 1: Descriptor & Role */}
          <div className="flex flex-col items-start">
            <h3 className="font-display font-bold text-sm md:text-base tracking-widest text-text-primary uppercase mb-3">
              {portfolio.role.toUpperCase()}
            </h3>
            <p className="text-body-sm text-text-secondary text-xs sm:text-sm leading-relaxed max-w-sm">
              Crafting modern, scalable web applications and high-performance digital experiences with precision engineering.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-text-muted text-[0.7rem] font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for opportunities</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col items-start md:items-center">
            <div className="w-full md:w-auto">
              <h4 className="text-label text-[0.72rem] tracking-[0.2em] text-text-muted uppercase mb-4">
                NAVIGATION
              </h4>
              <nav className="flex flex-col space-y-2.5">
                {portfolio.navLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-all duration-300 inline-flex items-center gap-2 group w-fit"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-accent group-hover:scale-125 transition-all" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Column 3: Connect / Social */}
          <div className="flex flex-col items-start md:items-end">
            <div className="w-full md:w-auto text-left md:text-right">
              <h4 className="text-label text-[0.72rem] tracking-[0.2em] text-text-muted uppercase mb-4">
                CONNECT
              </h4>
              <div className="flex flex-col space-y-2.5 items-start md:items-end">
                {socialLinksArray.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-all duration-300 inline-flex items-center gap-1.5 group w-fit"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform">{social.label}</span>
                    <span className="text-xs text-text-muted group-hover:text-accent-hover group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Refined Horizontal Divider ═══ */}
        <div ref={dividerRef} className="w-full border-t border-white/[0.06] pt-6 md:pt-8" />

        {/* ═══ Clean Metadata Row ═══ */}
        <div
          ref={bottomRef}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.75rem] text-text-muted"
        >
          {/* Copyright */}
          <p className="tracking-wide">
            © {new Date().getFullYear()} AKSHAY. All rights reserved.
          </p>

          {/* Tagline / descriptor */}
          <p className="text-text-muted/70 tracking-wide text-center">
            {portfolio.footer.tagline || 'Crafted with precision.'}
          </p>

          {/* Back to top action */}
          <button
            onClick={scrollToTop}
            className="hover:text-text-primary transition-colors inline-flex items-center gap-1 cursor-pointer select-none"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span className="text-xs leading-none">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

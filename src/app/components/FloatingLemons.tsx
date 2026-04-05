"use client"
import { useState, useEffect, useRef } from "react"

const LEMONS = [
  { top: "8%",  left: "3%",  size: 52, depth: 0.03,  rot: "-18deg", dur: "8s",   del: "0s",   anim: "lemon-float-a" },
  { top: "20%", left: "91%", size: 38, depth: 0.05,  rot: "24deg",  dur: "10s",  del: "1.4s", anim: "lemon-float-b" },
  { top: "48%", left: "1%",  size: 44, depth: 0.04,  rot: "-10deg", dur: "9s",   del: "0.7s", anim: "lemon-float-a" },
  { top: "65%", left: "94%", size: 34, depth: 0.055, rot: "32deg",  dur: "11s",  del: "2.1s", anim: "lemon-float-b" },
  { top: "80%", left: "4%",  size: 40, depth: 0.045, rot: "14deg",  dur: "9.5s", del: "1.8s", anim: "lemon-float-b" },
  { top: "88%", left: "90%", size: 30, depth: 0.035, rot: "-8deg",  dur: "7.5s", del: "0.9s", anim: "lemon-float-a" },
]

export default function FloatingLemons() {
  const [mounted, setMounted] = useState(false)
  const innerRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      innerRefs.current.forEach((el, i) => {
        if (!el) return
        const d = LEMONS[i].depth
        el.style.transform = `translate(${dx * d}px, ${dy * d}px)`
      })
    }
    window.addEventListener("mousemove", handleMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMove)
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      {LEMONS.map((l, i) => (
        // Outer span: handles position + float animation
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: l.top,
            left: l.left,
            pointerEvents: "none",
            zIndex: 2,
            userSelect: "none",
            fontSize: l.size,
            lineHeight: 1,
            animation: `${l.anim} ${l.dur} ease-in-out infinite ${l.del}`,
            ["--rot" as string]: l.rot,
          } as React.CSSProperties}
        >
          {/* Inner span: handles mouse parallax */}
          <span
            ref={el => { innerRefs.current[i] = el }}
            style={{
              display: "inline-block",
              transform: "translate(0px, 0px)",
              transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              opacity: 0.6,
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
            }}
          >
            🍋
          </span>
        </span>
      ))}
    </>
  )
}

"use client"

import { useEffect, useState } from "react"

export default function CursorEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsActive(true)
    const handleMouseUp = () => setIsActive(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Create particle effect on click
    const createParticles = (e: MouseEvent) => {
      const colors = ["#8B5CF6", "#7C3AED", "#6D28D9", "#EC4899", "#2DD4BF"]

      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.width = `${Math.random() * 20 + 10}px`
        particle.style.height = particle.style.width
        particle.style.background = colors[Math.floor(Math.random() * colors.length)]
        particle.style.left = `${e.clientX}px`
        particle.style.top = `${e.clientY}px`

        document.body.appendChild(particle)

        setTimeout(() => {
          if (particle.parentNode) {
            document.body.removeChild(particle)
          }
        }, 1000)
      }
    }

    window.addEventListener("mousemove", updateCursorPosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("click", createParticles)

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("click", createParticles)
    }
  }, [])

  if (typeof window === "undefined") return null

  return (
    <div
      className={`custom-cursor ${isActive ? "active" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
      }}
    />
  )
}


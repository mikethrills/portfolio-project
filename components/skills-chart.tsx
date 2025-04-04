"use client"

import { useEffect, useRef } from "react"
import type { Skill } from "@/types/skill"

interface SkillsChartProps {
  skills: Skill[]
}

export default function SkillsChart({ skills }: SkillsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Reset canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Chart configuration
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const maxRadius = Math.min(centerX, centerY) - 20

    // Draw background circles
    const levels = 5
    ctx.strokeStyle = "#e5e7eb"
    ctx.fillStyle = "rgba(229, 231, 235, 0.2)"

    for (let i = 1; i <= levels; i++) {
      const radius = (maxRadius / levels) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()
      if (i === levels) {
        ctx.fill()
      }
    }

    // Calculate points for each skill
    const angleStep = (Math.PI * 2) / skills.length
    const points: [number, number][] = []

    skills.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2 // Start from top
      const radius = (maxRadius * skill.level) / 100
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      points.push([x, y])

      // Draw skill labels
      const labelRadius = maxRadius + 15
      const labelX = centerX + labelRadius * Math.cos(angle)
      const labelY = centerY + labelRadius * Math.sin(angle)

      ctx.fillStyle = "#4b5563"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(skill.name, labelX, labelY)
    })

    // Draw skill area
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1])
    }
    ctx.closePath()
    ctx.fillStyle = "rgba(16, 185, 129, 0.2)"
    ctx.strokeStyle = "rgba(16, 185, 129, 0.8)"
    ctx.lineWidth = 2
    ctx.fill()
    ctx.stroke()

    // Draw points
    points.forEach(([x, y]) => {
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(16, 185, 129, 1)"
      ctx.fill()
    })
  }, [skills])

  return (
    <div className="w-full aspect-square">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}


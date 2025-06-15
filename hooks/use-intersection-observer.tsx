"use client"

import { useState, useEffect, useRef } from "react"

export function useIntersectionObserver(threshold = 0.1, triggerOnce = true) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If we only want to trigger once and it has already triggered, do nothing
        if (triggerOnce && hasTriggered.current) return

        if (entry.isIntersecting) {
          setIsIntersecting(true)
          if (triggerOnce) {
            hasTriggered.current = true
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, triggerOnce])

  return [ref, isIntersecting] as const
}

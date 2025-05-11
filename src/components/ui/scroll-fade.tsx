import { useEffect, useRef, useState } from 'react'

interface ScrollFadeProps {
  // The percentage of viewport height at which to trigger the animation (0-1)
  threshold?: number
  // Additional CSS classes to apply
  className?: string
  // Content to animate
  children?: React.ReactNode
}

const ScrollFade = ({
  threshold = 0.1,
  className = '',
  children
}: ScrollFadeProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin: '0px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold])

  return (
    <div
      ref={elementRef}
      className={`
        opacity-0 
        transition-all 
        duration-600 
        ${isVisible ? 'opacity-100 translate-y-0' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
export default ScrollFade
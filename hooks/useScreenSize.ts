'use client'

import { useState, useEffect } from 'react'

export const useScreenSize = () => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 }
  }

  const [screenSize, setScreenSize] = useState({
    width: window?.innerWidth,
    height: window?.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return screenSize
}

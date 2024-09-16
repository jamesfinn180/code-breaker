import { useEffect } from 'react'

const useFullHeight = () => {
  useEffect(() => {
    const setFullHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    setFullHeight()

    window.addEventListener('resize', setFullHeight)

    return () => {
      window.removeEventListener('resize', setFullHeight)
    }
  }, [])
}

export default useFullHeight

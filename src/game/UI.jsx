import React, { useEffect } from 'react'

export default function UI({ onMove, onMenu }) {
  useEffect(() => {
    function onKey(e) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }
      if (e.key === 'ArrowUp') onMove(0, -1)
      if (e.key === 'ArrowDown') onMove(0, 1)
      if (e.key === 'ArrowLeft') onMove(-1, 0)
      if (e.key === 'ArrowRight') onMove(1, 0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onMove])

  return null
}

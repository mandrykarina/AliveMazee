import React, { useEffect, useState } from 'react'
import { canGuardPass } from './Maze'

function findPath(maze, start, target, level) {
  const queue = [[start]]
  const visited = new Set()
  visited.add(`${start.x},${start.y}`)

  const directions = [
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 }
  ]

  while (queue.length > 0) {
    const path = queue.shift()
    const current = path[path.length - 1]

    if (current.x === target.x && current.y === target.y) {
      return path
    }

    const shuffledDirections = [...directions].sort(() => Math.random() - 0.5)

    for (const dir of shuffledDirections) {
      const nx = current.x + dir.dx
      const ny = current.y + dir.dy

      if (canGuardPass(maze, nx, ny, level) && !visited.has(`${nx},${ny}`)) {
        visited.add(`${nx},${ny}`)
        const newPath = [...path, { x: nx, y: ny }]
        queue.push(newPath)
      }
    }
  }

  return []
}

export default function Guard({ maze, player, level, onPositionUpdate }) {
  const [pos, setPos] = useState({ x: maze.width - 2, y: 1 })

  useEffect(() => {
    let mounted = true

    const moveGuard = () => {
      if (!mounted) return

      setPos(currentPos => {
        const path = findPath(maze, currentPos, player, level)
        
        let newPos = currentPos
        if (path.length > 1) {
          newPos = path[1]
        } else {
          const directions = [
            { dx: 0, dy: -1 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: 0 }
          ].sort(() => Math.random() - 0.5)

          for (const dir of directions) {
            const nx = currentPos.x + dir.dx
            const ny = currentPos.y + dir.dy
            if (canGuardPass(maze, nx, ny, level)) {
              newPos = { x: nx, y: ny }
              break
            }
          }
        }

        if (onPositionUpdate) {
          onPositionUpdate(newPos)
        }

        return newPos
      })
    }

    // Уменьшил скорости - страж теперь быстрее
    const speeds = [1000, 800, 600] // Скорости для уровней 1, 2, 3 (в миллисекундах)
    const interval = setInterval(moveGuard, speeds[level] || 800)

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [maze, player, level])

  // Позиционирование стража в абсолютной позиции
  const guardX = pos.x * 30 + 30 + 15 // 30px ячейка + 30px padding сетки + центрирование
  const guardY = pos.y * 30 + 30 + 15 // 30px ячейка + 30px padding сетки + центрирование

  return (
    <div 
      className="guard" 
      style={{ 
        position: 'absolute',
        left: `${guardX}px`,
        top: `${guardY}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <span className="guard-sprite">👁️</span>
    </div>
  )
}

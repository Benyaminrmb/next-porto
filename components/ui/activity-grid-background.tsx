import type {CSSProperties} from 'react'

const CELL_COUNT = 96

export function ActivityGridBackground() {
  return (
    <div className="activity-grid" aria-hidden="true">
      {Array.from({length: CELL_COUNT}, (_, index) => {
        const delay = -((index * 37) % 113) / 10
        const duration = 7 + ((index * 17) % 41) / 10
        const strength = 0.35 + ((index * 29) % 55) / 100

        return (
          <span
            key={index}
            style={
              {
                '--activity-delay': `${delay}s`,
                '--activity-duration': `${duration}s`,
                '--activity-strength': strength,
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
}

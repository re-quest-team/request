import React from 'react'

type Props = {
  color: string
  x: number
  y: number
  name?: string
}

export default function Cursor({ color, x, y, name }: Props) {
  return (
    <div
      className="absolute z-10 transition-all ease-linear"
      style={{
        top: `${y * 100}%`,
        left: `${x * 100}%`,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      {name && (
        <div
          className="ml-2 rounded-full px-2 py-1 text-xs"
          style={{ background: color }}
        >
          <span>{name}</span>
        </div>
      )}
    </div>
  )
}

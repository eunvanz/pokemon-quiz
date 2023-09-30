'use client'

import AnimatedNumber from 'react-awesome-animated-number'
import tw from 'twin.macro'

export interface ScoreProps {
  label: string
  count: number
  unit?: string
}

const Score: React.FC<ScoreProps> = ({ label, count, unit }) => {
  return (
    <div css={tw`text-xl flex justify-between w-full`}>
      <div css={tw`mt-0.5 mr-1`}>{label}</div>
      <div css={tw`text-blue-600`}>
        <AnimatedNumber hasComma value={count} size={28} />
        {unit && <span className="ml-1 text-black">{unit}</span>}
      </div>
    </div>
  )
}

export default Score

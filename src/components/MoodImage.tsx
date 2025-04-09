import React from 'react'
import { Triangle, Diamond, Heart } from 'lucide-react'

type MoodImageProps = {
  indicator: string
}

export default function MoodImage({ indicator }: MoodImageProps) {
  if (indicator === 'relationship') return <Triangle size={32} />
  if (indicator === 'career') return <Diamond size={32} />
  if (indicator === 'health') return <Heart size={32} />
  return null
}

'use client'
import { useParams } from 'next/navigation'
import HomePage from '@/app/page'

export default function HoroscopePage() {
  const params = useParams() as { sign: string, date: string }
  const { sign, date } = params
  return <HomePage initialSign={sign} initialDate={date} />
}

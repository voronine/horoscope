'use client'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import ZodiacSelector from '@/components/ZodiacSelector'
import ZodiacLogo from '@/components/ZodiacLogo'
import DaysPeriodToggle from '@/components/DaysPeriodToggle'
import ThemeToggle from '@/components/ThemeToggle'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './page.module.css'
import { RootState } from '@/store/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks'
import { initializeHoroscopeData } from '@/store/slices/horoscopeSlice'
import { useGetAllCatFactsQuery } from '@/api/apiSlice'
import DayTabsContent from '@/components/DayTabsContent'
import { getUniqueCatFactScores } from '@/utils/horoscope'

type HomePageProps = {
  initialSign?: string,
  initialDate?: string
}

export default function HomePage({ initialSign, initialDate }: HomePageProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const horoscopeData = useAppSelector((state: RootState) => state.horoscope.data)
  const status = useAppSelector((state: RootState) => state.horoscope.status)
  const [sign, setSign] = useState(initialSign ?? 'Aries')
  const [days, setDays] = useState(3)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(initializeHoroscopeData())
    }
  }, [status, dispatch])

  const dayData = useMemo(() => {
    return horoscopeData ? horoscopeData.data[sign].slice(0, days) : []
  }, [horoscopeData, sign, days])

  useEffect(() => {
    if (initialDate && dayData.length > 0) {
      const idx = dayData.findIndex(day => day.date === initialDate)
      if (idx !== -1) {
        setSelectedIndex(idx)
      }
    }
  }, [initialDate, dayData])

  const currentDay = useMemo(() => {
    return dayData[selectedIndex] || null
  }, [dayData, selectedIndex])

  const uniqueScores = useMemo(() => getUniqueCatFactScores(horoscopeData), [horoscopeData])
  const { data: catFactsMapping, isLoading: isCatLoading } =
    useGetAllCatFactsQuery(uniqueScores, { skip: uniqueScores.length === 0 })

  const currentCatFact = currentDay ? catFactsMapping?.[currentDay.catFactParam] || '' : ''

  useEffect(() => {
    if (currentDay) {
      router.push(`/horoscope/${sign}/${currentDay.date}`)
    }
  }, [sign, currentDay, router])

  if (status !== 'succeeded') {
    return (
      <main className={styles.wrapper}>
        <header className={styles.header}>
          <ZodiacLogo sign={sign} />
          <div className={styles.selectorToggle}>
            <ZodiacSelector onSelect={setSign} />
            <ThemeToggle />
          </div>
        </header>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </div>
      </main>
    )
  }

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <ZodiacLogo sign={sign} />
        <div className={styles.selectorToggle}>
          <ZodiacSelector onSelect={setSign} />
          <ThemeToggle />
        </div>
      </header>
      <section className={styles.controls}>
        <DaysPeriodToggle onToggle={setDays} />
      </section>
      <DayTabsContent
        days={days}
        selectedIndex={selectedIndex}
        onTabSelect={setSelectedIndex}
        daysData={dayData}
        sign={sign}
        isLoading={isCatLoading}
        catFact={currentCatFact}
      />
    </main>
  )
}

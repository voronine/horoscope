'use client'
import { useEffect, useState, useMemo } from 'react'
import ZodiacSelector from '@/components/ZodiacSelector'
import ZodiacLogo from '@/components/ZodiacLogo'
import DaysPeriodToggle from '@/components/DaysPeriodToggle'
import ThemeToggle from '@/components/ThemeToggle'
import styles from './page.module.css'
import { RootState } from '@/store/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks'
import { initializeHoroscopeData } from '@/store/slices/horoscopeSlice'
import { useGetAllCatFactsQuery } from '@/store/slices/apiSlice'
import DayTabsContent from '@/components/DayTabsContent'
import { getUniqueCatFactScores } from '@/utils/horoscope'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const horoscopeData = useAppSelector(
    (state: RootState) => state.horoscope.data
  )
  const status = useAppSelector((state: RootState) => state.horoscope.status)
  const [sign, setSign] = useState('Aries')
  const [days, setDays] = useState(3)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(initializeHoroscopeData())
    }
  }, [status, dispatch])

  const dayData = useMemo(() => {
    return horoscopeData 
      ? horoscopeData.data[sign].slice(0, days) 
      : []
  }, [horoscopeData, sign, days])

  const currentDay = useMemo(() => {
    return dayData[selectedIndex] || null
  }, [dayData, selectedIndex])

  const uniqueScores = useMemo(
    () => getUniqueCatFactScores(horoscopeData),
    [horoscopeData]
  )

  const {
    data: catFactsMapping,
    isLoading: isCatLoading
  } = useGetAllCatFactsQuery(uniqueScores, {
    skip: uniqueScores.length === 0,
  })

  const currentCatFact = currentDay
    ? catFactsMapping?.[currentDay.catFactParam] || ''
    : ''

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

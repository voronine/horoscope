'use client'
import React, { useEffect, useMemo, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
import { setDays } from '@/store/slices/daysPeriodSlice'
import { setSign, setSelectedIndex } from '@/store/slices/navigationSlice'

const HomePage: React.FC = () => {
  const params = useParams()
  const urlSign =
    Array.isArray(params.sign) ? params.sign[0] : params.sign || 'Aries'
  const urlDate =
    Array.isArray(params.date) ? params.date[0] : params.date || ''

  const dispatch = useAppDispatch()
  const router = useRouter()

  const horoscopeData = useAppSelector(
    (state: RootState) => state.horoscope.data
  )
  const status = useAppSelector((state: RootState) => state.horoscope.status)
  const days = useAppSelector((state: RootState) => state.daysPeriod.days)
  const { sign, selectedIndex, initialized } = useAppSelector(
    (state: RootState) => state.navigation
  )

  useEffect(() => {
    if (!initialized) {
      dispatch(setSign(urlSign))
    }
  }, [initialized, urlSign])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(initializeHoroscopeData())
    }
  }, [status])

  const dayData = useMemo(() => {
    return horoscopeData ? horoscopeData.data[sign].slice(0, days) : []
  }, [horoscopeData, sign, days])

  useEffect(() => {
    if (urlDate && dayData.length > 0) {
      const index = dayData.findIndex(day => day.date === urlDate)
      if (index !== -1) {
        dispatch(setSelectedIndex(index))
      }
    }
  }, [urlDate, dayData, dispatch])

  const uniqueScores = useMemo(() => {
    if (!horoscopeData) return []
    return Array.from(
      new Set(
        horoscopeData.data[sign]
          .slice(0, days)
          .map(day => day.catFactParam)
      )
    )
  }, [horoscopeData, sign, days])
  
  const { data: catFactsMapping, isLoading: isCatLoading } =
    useGetAllCatFactsQuery(uniqueScores, { skip: uniqueScores.length === 0 })
  const currentCatFact = dayData[selectedIndex]
    ? catFactsMapping?.[dayData[selectedIndex].catFactParam] || ''
    : ''

  useEffect(() => {
    if (dayData[selectedIndex]) {
      const newUrl = `/horoscope/${sign}/${dayData[selectedIndex].date}`
      router.replace(newUrl)
    }
  }, [sign, selectedIndex, dayData, router])

  const handleToggleDays = useCallback(
    (newDays: number) => {
      dispatch(setDays(newDays))
    },
    [dispatch]
  )

  const handleSignSelect = useCallback(
    (newSign: string) => {
      dispatch(setSign(newSign))
    },
    [dispatch]
  )

  const handleTabSelect = useCallback(
    (index: number) => {
      dispatch(setSelectedIndex(index))
    },
    [dispatch]
  )

  if (status !== 'succeeded') {
    return (
      <div className={styles.spiner}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <ZodiacLogo sign={sign} />
        <div className={styles.selectorToggle}>
          <ZodiacSelector value={sign} onSelect={handleSignSelect} />
          <ThemeToggle />
        </div>
      </header>
      <section className={styles.controls}>
        <DaysPeriodToggle days={days} onToggle={handleToggleDays} />
      </section>
      <DayTabsContent
        days={days}
        selectedIndex={selectedIndex}
        onTabSelect={handleTabSelect}
        daysData={dayData}
        sign={sign}
        isLoading={isCatLoading}
        catFact={currentCatFact}
      />
    </main>
  )
}

export default HomePage

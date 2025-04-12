import React, { useCallback, useMemo } from 'react'
import Link from 'next/link'
import { format, addDays } from 'date-fns'
import { uk } from 'date-fns/locale'
import MoodImage from './MoodImage'
import CopyLinkButton from './CopyLinkButton'
import styles from './DaysTabs.module.css'
import { Heart } from 'lucide-react'
import { Diamond } from 'lucide-react'
import { Triangle } from 'lucide-react'
import { DayData } from '@/utils/horoscope'

type DayTabsContentProps = {
  days: number
  selectedIndex: number
  onTabSelect: (index: number) => void
  daysData: DayData[]
  sign: string
  isLoading: boolean
  catFact: string
}

const DayTabsContent: React.FC<DayTabsContentProps> = ({
  days,
  selectedIndex,
  onTabSelect,
  daysData,
  sign,
  isLoading,
  catFact
}) => {
  const tabLabels: string[] = Array.from({ length: days }, (_, i) => {
    const d = addDays(new Date(), i)
    return (format as unknown as (
      date: Date,
      formatString: string,
      options?: { locale: typeof uk }
    ) => string)(d, 'EEEE dd MMMM', { locale: uk })
  })

  const formatLabel = useCallback((label: string) => {
    const parts = label.split(' ')
    const dayOfWeek = parts[0]
    const dayOfWeekCapitalized = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
    const dayAndMonth = parts.slice(1).join(' ')
    return (
      <>
        {dayOfWeekCapitalized}
        <br />
        {dayAndMonth}
      </>
    )
  }, [])

  const formatScore = useCallback((score: number) => {
    return score.toString().padStart(2, '\u00A0')
  }, [])

  const bestIndicator = useMemo(() => {
    if (!daysData[selectedIndex]) return ''
    const scores = daysData[selectedIndex].score
    let bestKey = ''
    let bestValue = -Infinity
    Object.entries(scores).forEach(([key, value]) => {
      if (value > bestValue) {
        bestValue = value
        bestKey = key
      }
    })
    return bestKey
  }, [daysData, selectedIndex])

  return (
    <div>
      <div className={styles.tabs}>
        {tabLabels.map((label, i) => (
          <Link
            key={label}
            href={`/horoscope/${sign}/${daysData[i].date}`}
            className={i === selectedIndex ? styles.active : styles.tab}
            onClick={() => onTabSelect(i)}
          >
            <div className={styles.spanDay}>{formatLabel(label)}</div>
            <div className={styles.block}>
              <div className={styles.tabValue}>
                <Triangle size={12} />
                {formatScore(daysData[i]?.score.relationship)}
              </div>
              <div className={styles.tabValue}>
                <Diamond size={12} />
                {formatScore(daysData[i]?.score.career)}
              </div>
              <div className={styles.tabValue}>
                <Heart size={12} />
                {formatScore(daysData[i]?.score.health)}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {daysData[selectedIndex] && (
        <div className={`${styles.card} ${styles.merged}`}>
          <div className={styles.mainBlock}>
            <div className={styles.header}>
              <MoodImage indicator={bestIndicator} />
            </div>
            <div className={styles.scores}>
              <div className={styles.scoresPart}>
                <Triangle size={12} className={styles.animate} />
                <div> Відносини: {formatScore(daysData[selectedIndex].score.relationship)} </div>
              </div>
              <div className={styles.scoresPart}>
                <Diamond size={12} className={styles.animate} />
                <div> Кар&apos;єра: {formatScore(daysData[selectedIndex].score.career)} </div>
              </div>
              <div className={styles.scoresPart}>
                <Heart size={12} className={styles.animate} />
                <div> Здоров&apos;є: {formatScore(daysData[selectedIndex].score.health)} </div>
              </div>
            </div>
          </div>
          <div className={styles.fact}>
            {daysData[selectedIndex].catFact || (isLoading ? 'Loading...' : catFact || '')}
          </div>
          <CopyLinkButton />
        </div>
      )}
    </div>
  )
}

export default DayTabsContent

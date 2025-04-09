import { format, addDays } from 'date-fns'
import { uk } from 'date-fns/locale'
import MoodImage from './MoodImage'
import CopyLinkButton from './CopyLinkButton'
import styles from './DaysTabs.module.css'
import { Heart } from 'lucide-react'
import { Diamond } from 'lucide-react'
import { Triangle } from 'lucide-react'

type DayData = {
  score: {
    health: number
    relationship: number
    career: number
  }
  catFact?: string
  date: string
}

type Props = {
  days: number
  selectedIndex: number
  onTabSelect: (index: number) => void
  daysData: DayData[]
  sign: string
  isLoading: boolean
  catFact: string
}

export default function DayTabsContent({
  days,
  selectedIndex,
  onTabSelect,
  daysData,
  sign,
  isLoading,
  catFact
}: Props) {
  const tabLabels = Array.from({ length: days }, (_, i) => {
    const d = addDays(new Date(), i)
    return (format as any)(d, 'EEEE dd MMMM', { locale: uk })
  })

  const formatLabel = (label: string) => {
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
  }

  return (
    <div>
      <div className={styles.tabs}>
        {tabLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => onTabSelect(i)}
            className={i === selectedIndex ? styles.active : styles.tab}
          >
            <div className={styles.spanDay}>
              {formatLabel(label)}
            </div>
            <div className={styles.block}>
              <div className={styles.tabValue}>
                <Triangle size={12} />
                {daysData[i]?.score.relationship}
              </div>
              <div className={styles.tabValue}>
                <Diamond size={12} />
                {daysData[i]?.score.career}
              </div>
              <div className={styles.tabValue}>
                <Heart size={12} />
                {daysData[i]?.score.health}
              </div>
            </div>
          </button>
        ))}
      </div>
      {daysData[selectedIndex] && (
        <div className={`${styles.card} ${styles.merged}`}>
          <div className={styles.header}>
            <MoodImage sign={sign} />
            <div>{daysData[selectedIndex].date}</div>
          </div>
          <div className={styles.scores}>
            <div>Relationship: {daysData[selectedIndex].score.relationship}</div>
            <div>Career: {daysData[selectedIndex].score.career}</div>
            <div>Health: {daysData[selectedIndex].score.health}</div>
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

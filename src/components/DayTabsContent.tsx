import { format, addDays } from 'date-fns';
import MoodImage from './MoodImage';
import CopyLinkButton from './CopyLinkButton';
import styles from './DaysTabs.module.css';

type DayData = {
  score: {
    health: number;
    relationship: number;
    career: number;
  };
  catFact?: string;
  date: string;
};

type Props = {
  days: number;
  selectedIndex: number;
  onTabSelect: (index: number) => void;
  currentDay: DayData | null;
  sign: string;
  isLoading: boolean;
  catFact: string;
};

export default function DayTabsContent({
  days,
  selectedIndex,
  onTabSelect,
  currentDay,
  sign,
  isLoading,
  catFact
}: Props) {
  const tabLabels = Array.from({ length: days }, (_, i) => {
    const d = addDays(new Date(), i);
    return format(d, 'EEEE dd MMMM');
  });

  return (
    <div>
      <div className={styles.tabs}>
        {tabLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => onTabSelect(i)}
            className={i === selectedIndex ? styles.active : styles.tab}
          >
            <span style={{ whiteSpace: 'pre-wrap', display: 'block' }}>
              {label.split(' ').join('\n')}
            </span>
          </button>
        ))}
      </div>
      {currentDay && (
        <div className={`${styles.card} ${styles.merged}`}>
          <div className={styles.header}>
            <MoodImage sign={sign} />
            <div>{currentDay!.date}</div>
          </div>
          <div className={styles.scores}>
            <div>Health: {currentDay!.score.health}</div>
            <div>Relationship: {currentDay!.score.relationship}</div>
            <div>Career: {currentDay!.score.career}</div>
          </div>
          <div className={styles.fact}>
            {currentDay!.catFact || (isLoading ? 'Loading...' : catFact || '')}
          </div>
          <CopyLinkButton />
        </div>
      )}
    </div>
  );
}

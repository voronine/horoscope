import { format, addDays } from 'date-fns';
import styles from './DaysTabs.module.css';

type Props = {
  days: number;
  onSelect: (index: number) => void;
  selectedIndex: number;
};

export default function DaysTabs({ days, onSelect, selectedIndex }: Props) {
  const items = Array.from({ length: days }, (_, i) => {
    const d = addDays(new Date(), i);
    return format(d, 'EEEE dd MMMM');
  });

  return (
    <div className={styles.tabs}>
      {items.map((label, i) => (
        <button
          key={label}
          onClick={() => onSelect(i)}
          className={i === selectedIndex ? styles.active : styles.tab}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

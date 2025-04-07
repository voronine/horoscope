import MoodImage from './MoodImage';
import styles from './DayCard.module.css';
import CopyLinkButton from './CopyLinkButton';

type Score = {
  health: number;
  relationship: number;
  career: number;
};

type Props = {
  sign: string;
  score: Score;
  catFact: string;
  dateStr: string;
};

export default function DayCard({
  sign,
  score,
  catFact,
  dateStr
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <MoodImage sign={sign} />
        <div>{dateStr}</div>
      </div>
      <div className={styles.scores}>
        <div>Health: {score.health}</div>
        <div>Relationship: {score.relationship}</div>
        <div>Career: {score.career}</div>
      </div>
      <div className={styles.fact}>{catFact}</div>

      <CopyLinkButton />
    </div>
  );
}

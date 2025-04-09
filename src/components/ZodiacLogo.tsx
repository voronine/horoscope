import styles from './ZodiacLogo.module.css';

type ZodiacLogoProps = {
  sign: string;
};

export default function ZodiacLogo({ sign }: ZodiacLogoProps) {
  return (
    <img
      src={`/images/zodiac/${sign}.png`}
      alt={`${sign} logo`}
      className={styles.zodiacLogo}
    />
  );
}

import React from 'react'
import styles from './ZodiacLogo.module.css'

type ZodiacLogoProps = {
  sign: string
}

const ZodiacLogo: React.FC<ZodiacLogoProps> = ({ sign }) => {
  return (
    <img
      src={`/images/zodiac/${sign}.png`}
      alt={`${sign} logo`}
      className={styles.zodiacLogo}
    />
  )
}

export default ZodiacLogo

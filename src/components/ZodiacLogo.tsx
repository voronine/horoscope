import Image from 'next/image'
import { useSelector } from 'react-redux'

type ZodiacLogoProps = {
  sign: string
}

const myLoader = ({ src }: { src: string }): string => src

const ZodiacLogo: React.FC<ZodiacLogoProps> = ({ sign }) => {
  const theme = useSelector((state: { theme: { theme: 'light' | 'dark' } }) => state.theme.theme)
  const folder = theme === 'dark' ? 'zodiac-dark' : 'zodiac'
  return (
    <Image
      loader={myLoader}
      unoptimized
      priority
      src={`/images/${folder}/${sign}.png`}
      alt={`${sign} logo`}
      width={120}
      height={120}
    />
  )
}

export default ZodiacLogo

import Image from 'next/image'

type ZodiacLogoProps = {
  sign: string
}

const myLoader = ({ src }: { src: string }): string => src

const ZodiacLogo: React.FC<ZodiacLogoProps> = ({ sign }) => {
  return (
    <Image
      loader={myLoader}
      unoptimized
      priority
      src={`/images/zodiac/${sign}.png`}
      alt={`${sign} logo`}
      width={120}
      height={120}
    />
  )
}

export default ZodiacLogo

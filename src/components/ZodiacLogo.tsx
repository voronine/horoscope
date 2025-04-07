type ZodiacLogoProps = {
    sign: string;
  };
  
  export default function ZodiacLogo({ sign }: ZodiacLogoProps) {
    return (
      <img
        src={`/images/zodiac/${sign}.png`}
        alt={`${sign} logo`}
        style={{ maxWidth: '100px', transition: 'opacity 0.3s ease-in-out' }}
      />
    );
  }
  
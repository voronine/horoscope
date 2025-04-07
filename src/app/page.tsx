'use client';
import { useEffect, useState } from 'react';
import { initializeHoroscopeData } from '../store/horoscopeSlice';
import { useGetCatFactQuery } from '../store/catFactsApi';
import ZodiacSelector from '../components/ZodiacSelector';
import ZodiacLogo from '../components/ZodiacLogo';
import DaysPeriodToggle from '../components/DaysPeriodToggle';
import DaysTabs from '../components/DaysTabs';
import DayCard from '../components/DayCard';
import ThemeToggle from '../components/ThemeToggle';
import styles from './page.module.css';
import { RootState } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const horoscopeData = useAppSelector((state: RootState) => state.horoscope.data);
  const status = useAppSelector((state: RootState) => state.horoscope.status);
  const [sign, setSign] = useState('Aries');
  const [days, setDays] = useState(3);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(initializeHoroscopeData());
    }
  }, [status, dispatch]);

  const dayData = horoscopeData ? horoscopeData.data[sign].slice(0, days) : [];
  const currentDay = dayData[selectedIndex] || null;

  const { data: catFact, isLoading: isCatLoading } = useGetCatFactQuery(
    currentDay?.catFactParam,
    { skip: !currentDay || !!currentDay.catFact }
  );

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <ZodiacLogo sign={sign} />
        <ThemeToggle />
      </header>
      <section className={styles.controls}>
        <ZodiacSelector onSelect={setSign} />
        <DaysPeriodToggle onToggle={setDays} />
      </section>
      <DaysTabs 
        days={days} 
        onSelect={setSelectedIndex} 
        selectedIndex={selectedIndex} />
      {currentDay && (
        <DayCard
          sign={sign}
          score={currentDay.score}
          catFact={currentDay.catFact || (isCatLoading ? 'Loading...' : catFact || '')}
          dateStr={currentDay.date}
        />
      )}
    </main>
  );
}

'use client'
import React, { useEffect, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ZodiacSelector from '@/components/ZodiacSelector'
import ZodiacLogo from '@/components/ZodiacLogo'
import DaysPeriodToggle from '@/components/DaysPeriodToggle'
import ThemeToggle from '@/components/ThemeToggle'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './page.module.css'
import { RootState } from '@/store/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks'
import { initializeHoroscopeData } from '@/store/slices/horoscopeSlice'
import { useGetAllCatFactsQuery } from '@/api/apiSlice'
import DayTabsContent from '@/components/DayTabsContent'
import { getUniqueCatFactScores } from '@/utils/horoscope'
import { setDays } from '@/store/slices/daysPeriodSlice'
import { setSign, setSelectedIndex } from '@/store/slices/navigationSlice'

const HomePage: React.FC = () => {
  const searchParams = useSearchParams();
  const initialSignFromURL = searchParams.get('sign') || 'Aries';
  const initialDateFromURL = searchParams.get('date') || '';

  const dispatch = useAppDispatch();
  const router = useRouter();

  const horoscopeData = useAppSelector((state: RootState) => state.horoscope.data);
  const status = useAppSelector((state: RootState) => state.horoscope.status);
  const days = useAppSelector((state: RootState) => state.daysPeriod.days);
  const sign = useAppSelector((state: RootState) => state.navigation.sign);
  const selectedIndex = useAppSelector((state: RootState) => state.navigation.selectedIndex);

  useEffect(() => {
    if (initialSignFromURL !== sign) {
      dispatch(setSign(initialSignFromURL));
    }
  }, [initialSignFromURL, sign, dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(initializeHoroscopeData());
    }
  }, [status, dispatch]);

  const dayData = useMemo(() => {
    return horoscopeData ? horoscopeData.data[sign].slice(0, days) : [];
  }, [horoscopeData, sign, days]);

  useEffect(() => {
    if (initialDateFromURL && dayData.length > 0) {
      const idx = dayData.findIndex(day => day.date === initialDateFromURL);
      if (idx !== -1) {
        dispatch(setSelectedIndex(idx));
      }
    }
  }, [initialDateFromURL, dayData, dispatch]);

  const uniqueScores = useMemo(() => getUniqueCatFactScores(horoscopeData), [horoscopeData]);
  const { data: catFactsMapping, isLoading: isCatLoading } =
    useGetAllCatFactsQuery(uniqueScores, { skip: uniqueScores.length === 0 });
  const currentCatFact = dayData[selectedIndex]
    ? catFactsMapping?.[dayData[selectedIndex].catFactParam] || ''
    : '';

  useEffect(() => {
    if (dayData[selectedIndex]) {
      const newURL = `/horoscope/${sign}/${dayData[selectedIndex].date}`;
      router.replace(newURL);
    }
  }, [sign, selectedIndex, dayData, router]);

  const handleToggleDays = useCallback((newDays: number) => {
    dispatch(setDays(newDays));
  }, [dispatch]);

  const handleSignSelect = useCallback((newSign: string) => {
    dispatch(setSign(newSign));
  }, [dispatch]);

  const handleTabSelect = useCallback((index: number) => {
    dispatch(setSelectedIndex(index));
  }, [dispatch]);

  if (status !== 'succeeded') {
    return (
      <main className={styles.wrapper}>
        <header className={styles.header}>
          <ZodiacLogo sign={sign} />
          <div className={styles.selectorToggle}>
            <ZodiacSelector value={sign} onSelect={handleSignSelect} />
            <ThemeToggle />
          </div>
        </header>
        <div className={styles.spiner}>
          <CircularProgress />
        </div>
      </main>
    );
  }

  return (
    <main className={styles.wrapper}>
      <header className={styles.header}>
        <ZodiacLogo sign={sign} />
        <div className={styles.selectorToggle}>
          <ZodiacSelector value={sign} onSelect={handleSignSelect} />
          <ThemeToggle />
        </div>
      </header>
      <section className={styles.controls}>
        <DaysPeriodToggle days={days} onToggle={handleToggleDays} />
      </section>
      <DayTabsContent
        days={days}
        selectedIndex={selectedIndex}
        onTabSelect={handleTabSelect}
        daysData={dayData}
        sign={sign}
        isLoading={isCatLoading}
        catFact={currentCatFact}
      />
    </main>
  );
};

export default HomePage;

'use client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks'
import { setTheme, toggleTheme } from '@/store/slices/themeSlice'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.theme)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      dispatch(setTheme(storedTheme))
    }
  }, [dispatch])

  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const onToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <button onClick={onToggle} aria-label="Toggle Theme" className={styles.button}>
      {theme === 'light' ? (
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/moon-symbol.png"
          alt="Switch to Dark Mode"
          style={{ width: '24px', height: '24px' }}
        />
      ) : (
        <img
          src="https://img.icons8.com/ios-filled/50/FFD700/sun.png"
          alt="Switch to Light Mode"
          style={{ width: '24px', height: '24px' }}
        />
      )}
    </button>
  )
}

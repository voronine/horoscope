'use client'
import { useState, useEffect } from 'react'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <button onClick={toggleTheme} aria-label="Toggle Theme" className={styles.button}>
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

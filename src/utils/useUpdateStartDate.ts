import { useEffect } from 'react'

const useUpdateStartDate = () => {
  useEffect(() => {
    const stored = localStorage.getItem('horoscopeState')
    if (stored) {
      const parsed = JSON.parse(stored)
      const storedStartDate = new Date(parsed.startDate)
      const today = new Date()
      if (storedStartDate.toISOString().slice(0, 10) !== today.toISOString().slice(0, 10)) {
        parsed.startDate = today.toISOString().slice(0, 10)
        localStorage.setItem('horoscopeState', JSON.stringify(parsed))
      }
    }
  }, [])
}

export default useUpdateStartDate

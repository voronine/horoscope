import React, { Suspense } from 'react'
import { ProviderWrapper } from '@/components/ProviderWrapper'
import './globals.css'

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="wrapper">
        <ProviderWrapper>
          <Suspense fallback={<div>Завантаження...</div>}>
            {children}
          </Suspense>
        </ProviderWrapper>
      </body>
    </html>
  )
}

export default RootLayout

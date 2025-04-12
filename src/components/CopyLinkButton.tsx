import React from 'react'
import Button from '@mui/material/Button'

const CopyLinkButton: React.FC = () => {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <Button
      variant="contained"
      onClick={copyLink}
      sx={{
        backgroundColor: 'var(--button-bg)',
        color: 'var(--text-color)',
        width: 200,
        fontSize: 11,
        height: 20,
        textTransform: 'none',
        '&:hover': { backgroundColor: 'var(--button-bg)', filter: 'brightness(0.9)' }
      }}
    >
      Копіювати посилання
    </Button>
  )
}

export default CopyLinkButton

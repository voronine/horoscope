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
        width: 120,
        fontSize: 11,
        height: 25,
        '&:hover': { backgroundColor: 'var(--button-bg)', filter: 'brightness(0.9)' }
      }}
    >
      Copy Link
    </Button>
  )
}

export default CopyLinkButton

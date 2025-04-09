import Button from '@mui/material/Button'

export default function CopyLinkButton() {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <Button
      variant="contained"
      onClick={copyLink}
      sx={{
        backgroundColor: 'grey',
        width: 120,
        fontSize: 11,
        height:25,
        '&:hover': {
          backgroundColor: 'darkgrey'
        }
      }}
    >
      Copy Link
    </Button>
  )
}

export default function CopyLinkButton() {
    const copyLink = () => {
      navigator.clipboard.writeText(window.location.href);
    };
  
    return <button onClick={copyLink}>Copy Link</button>;
  }
  
import { useState } from 'react'

export default function LocalImage({ src, fallbackSrc, alt, className, ...rest }) {
  const [didError, setDidError] = useState(false)

  function handleError() {
    if (!didError && fallbackSrc) {
      setDidError(true)
    }
  }

  const currentSrc = didError && fallbackSrc ? fallbackSrc : src

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...rest}
    />
  )
}
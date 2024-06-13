import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ImageWithFallback = ({ fallbackImage, alt, src, ...props }) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
  }, [src])

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallbackImage : src}
      {...props}
    />
  )
}

export default ImageWithFallback

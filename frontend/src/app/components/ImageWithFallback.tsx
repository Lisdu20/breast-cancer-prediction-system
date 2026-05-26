interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  width,
  height,
}: ImageWithFallbackProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={`object-cover ${className}`}
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.style.display = 'none'
      }}
    />
  )
}

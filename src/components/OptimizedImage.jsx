export default function OptimizedImage({ src, alt, className = "" }) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading="lazy"
            decoding="async"
            width="auto"
            height="auto"
        />
    );
}

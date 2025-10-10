import { useState } from "react";

export default function YTLazy({ videoId, className = "" }) {
    const [isLoaded, setIsLoaded] = useState(false);

    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    return (
        <div
            className={`relative aspect-video w-full overflow-hidden rounded-xl ${className}`}
        >
            {!isLoaded ? (
                <button
                    onClick={() => setIsLoaded(true)}
                    aria-label="Play video"
                    className="group relative w-full h-full flex items-center justify-center bg-black cursor-pointer"
                >
                    {/* Thumbnail */}
                    <img
                        src={thumbnail}
                        alt="YouTube Video Thumbnail"
                        loading="lazy"
                        className="w-full h-full object-cover transition duration-500 group-hover:brightness-75"
                    />

                    {/* Tombol Play */}
                    <div className="absolute flex items-center justify-center">
                        {/* Bentuk mirip tombol YouTube */}
                        <div className="w-24 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 bg-red-600 group-hover:scale-110 shadow-lg">
                            {/* Segitiga Play */}
                            <svg
                                viewBox="0 0 24 24"
                                className="w-10 h-10 fill-current transition-colors duration-300 text-white"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </button>
            ) : (
                <iframe
                    src={embedUrl}
                    title="YouTube Video Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0"
                ></iframe>
            )}
        </div>
    );
}

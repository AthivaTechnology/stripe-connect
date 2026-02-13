import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
    {
        type: 'video',
        src: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4',
        poster: 'https://images.unsplash.com/photo-1544025162-d76690b67f61?auto=format&fit=crop&w=2000&q=90'
    },
    {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=90'
    },
    {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=90' // Restaurant interior
    },
    {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=90', // Classic restaurant interior
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    return (
        <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-black group">
            {/* Carousel Backgrounds */}
            {heroSlides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {slide.type === 'video' ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover opacity-50"
                            poster={slide.poster}
                        >
                            <source src={slide.src} type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            src={slide.src}
                            alt="Background"
                            className="w-full h-full object-cover opacity-50 filter brightness-[0.7]"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            ))}

            {/* Manual Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                aria-label="Next slide"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Indicators - Hidden as per request */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 gap-3 z-30 hidden">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-12' : 'bg-white/40 w-8 hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-20 text-center text-white px-6 py-12 animate-in fade-in zoom-in duration-700 max-w-4xl mx-auto mt-20 pb-12">
                <p className="text-sm md:text-base font-medium tracking-[0.3em] mb-4 uppercase text-gray-200 drop-shadow-md">
                    New Collection
                </p>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-6 tracking-tight drop-shadow-lg">
                    Taste of India
                </h2>
                <p className="max-w-lg mx-auto text-gray-100 text-lg mb-8 font-light drop-shadow-md">
                    Experience the finest culinary creations delivered to your doorstep.
                </p>
                <button
                    onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-white text-black px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 border border-white"
                >
                    Order Now
                </button>
            </div>
        </div>
    );
}

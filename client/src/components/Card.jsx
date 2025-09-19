import React, { useState, useEffect } from 'react'
import clsx from "clsx"
import { ChevronLeft, ChevronRight } from 'react-feather'

export default function Card({ imgSrc, images, children, className }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const imageArray = images && images.length > 0 ? images : [imgSrc]
  
  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length)
  }
  
  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageArray.length) % imageArray.length)
  }

  // Auto-advance the carousel every 3 seconds if there are multiple images
  useEffect(() => {
    if (imageArray.length <= 1) return
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length)
    }, 3000)
    
    return () => clearInterval(timer)
  }, [imageArray.length])

  return (
    <div className={clsx(
      "max-w-72 relative overflow-hidden group",
      "bg-white dark:bg-slate-900",
      "rounded-2xl border border-slate-200/50 dark:border-slate-800/50",
      "shadow-lg hover:shadow-2xl",
      "transition-all duration-300 ease-out",
      "hover:(-translate-y-1)",
      className,
    )}>
      <div className="relative w-full h-full">
        <img 
          className={clsx(
            "object-cover w-full h-full transition duration-500 ease-out transform",
            "group-hover:(scale-110)",
          )} 
          src={imageArray[currentImageIndex] || 'https://picsum.photos/seed/fallback-card/800/1000'} 
          alt="" 
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => { 
            if (e.currentTarget.dataset.fallbackApplied) return; 
            e.currentTarget.dataset.fallbackApplied = '1'; 
            e.currentTarget.src = 'https://picsum.photos/seed/fallback-card/800/1000'; 
          }}
        />
        
        {imageArray.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Dots indicator */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {imageArray.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {children}
    </div>
  )
}
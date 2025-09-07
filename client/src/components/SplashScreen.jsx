import { useEffect, useState } from 'react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-[var(--bg)] flex flex-col items-center justify-center z-50">
      <div className="text-center p-8 max-w-2xl">
        {/* Logo */}
        <div className="mb-8 transform transition-transform duration-500 hover:scale-105">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="relative">
              <span className="text-[var(--accent)]">URBAN</span>
              <span className="text-[var(--fg)]">THREADS</span>
              <span 
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[var(--accent)] to-transparent w-full"
                style={{
                  backgroundImage: 'linear-gradient(90deg, var(--accent) 0%, var(--accent) 60%, transparent 100%)',
                }}
              />
            </span>
          </h1>
          <p className="text-[var(--text-muted)] text-xl tracking-widest mt-2">Fashion Redefined</p>
        </div>
        
        {/* Loading animation */}
        <div className="flex justify-center space-x-2 mt-12">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="w-3 h-3 bg-[var(--accent)] rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s',
                animationIterationCount: 'infinite'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

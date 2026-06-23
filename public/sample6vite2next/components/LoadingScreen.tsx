'use client';
import { useState, useEffect } from "react";

interface LoadingScreenProps {
    carouselReady: boolean;
}

export function LoadingScreen({ carouselReady }: LoadingScreenProps) {
    const [minTimerDone, setMinTimerDone] = useState(false);
    const [visible, setVisible] = useState(true);

    // 1. Derive the fading state instead of storing it in useState
    const fading = minTimerDone && carouselReady;

    // Timer for the minimum loading duration
    useEffect(() => {
        const timer = window.setTimeout(() => setMinTimerDone(true), 2000);
        return () => window.clearTimeout(timer);
    }, []);

    // 2. This effect only handles the async unmounting timeout
    useEffect(() => {
        let fadeTimer: number | undefined;

        if (fading) {
            fadeTimer = window.setTimeout(() => setVisible(false), 600);
        }

        return () => {
            if (fadeTimer) window.clearTimeout(fadeTimer);
        };
    }, [fading]); // Runs only when fading status changes

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}style={{ backgroundColor: "#ffffff" }}>

            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img src="/sample6vite2next/logo.svg" alt="Colombo Building Supplies" style={{ width: 100, objectFit: "contain" }} />    
            </div>  

            {/* ── Bottom-left: Powered By ── */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-60">
                <img src="/sample6vite2next/poweredby.svg" alt="Powered by" style={{ height: 18, objectFit: "contain" }} />
            </div>

            {/* ── Bottom: Progress bar ── */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-100">
                <div className="h-full"style={{
                    background: "linear-gradient(to right, #C9A227, #1C2B4A)",
                    animation: "ls-progress 2s ease-out forwards",}}  
                />
            </div>
            <style>{`
            @keyframes ls-progress {
            0%   { width: 0% }
            60%  { width: 75% }
            100% { width: 100% }
            }`}</style>
        </div>
    );
}
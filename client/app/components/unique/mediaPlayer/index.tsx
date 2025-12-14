'use client'
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const AppSong = '/audio/pokedance.mp3';

const MediaPlayer = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {

        audioRef.current = new Audio(AppSong);
        const audio = audioRef.current;

        audio.loop = true;
        audio.volume = 0.05;
        audio.muted = true;

        const unmute = () => {
            audio.muted = false;
            audio.play();
            setIsPlaying(true);
            document.removeEventListener('click', unmute);
        };

        document.addEventListener('click', unmute);

        return () => {
            audio.pause();
            audio.currentTime = 0;
            document.removeEventListener('click', unmute);
        };
    }, []);
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            <motion.img
                alt="vinilDisc"
                src={'assets/icons/vinilDisc.svg'}
                className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-50 w-12 h-12 md:w-14 md:h-14"
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                    duration: 2,
                    repeat: isPlaying ? Infinity : 0,
                    ease: "linear"
                }}
            />

            <button
                onClick={togglePlay}
                className="fixed right-14 bottom-12 md:right-20 md:bottom-20 z-50 w-4 h-4 flex items-center justify-center"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
                {isPlaying ? (
                    <>⏸</>
                ) : (
                    <>⏵</>
                )}
            </button>
        </>
    );
};

export default MediaPlayer;

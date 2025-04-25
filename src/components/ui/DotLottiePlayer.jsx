import React, { useEffect, useRef } from 'react';

/**
 * Reusable DotLottiePlayer component
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Source URL for the Lottie animation
 * @param {boolean} [props.autoplay=true] - Whether to autoplay the animation
 * @param {boolean} [props.loop=true] - Whether to loop the animation
 * @param {string} [props.background='transparent'] - Background color
 * @param {string} [props.speed='1'] - Animation speed
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.style] - Additional inline styles
 */
const DotLottiePlayer = ({
  src,
  autoplay = true,
  loop = true,
  background = 'transparent',
  speed = '1',
  className = '',
  style = {}
}) => {
  const playerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Initialize dotLottie player when component mounts
    const loadDotLottie = async () => {
      if (typeof window !== 'undefined' && !scriptLoadedRef.current) {
        // Check if dotLottie script is already loaded
        if (!document.querySelector('script[src*="dotlottie-player"]')) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
          script.async = true;
          await new Promise((resolve) => {
            script.onload = resolve;
            document.body.appendChild(script);
          });
        }
        scriptLoadedRef.current = true;
      }
    };

    loadDotLottie();

    return () => {
      // Cleanup: Stop animation when component unmounts
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, []);

  // Handle player ready and store reference
  const handlePlayerLoad = (e) => {
    playerRef.current = e.target;
  };

  return (
    <lottie-player
      ref={playerRef}
      src={src}
      background={background}
      speed={speed}
      loop={loop}
      autoplay={true}
      style={{ width: '100%', height: '100%', ...style }}
      className={className}
      onLoad={handlePlayerLoad}
    />
  );
};

export default DotLottiePlayer;
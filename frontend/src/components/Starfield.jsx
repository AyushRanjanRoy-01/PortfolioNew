import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from '../contexts/ThemeContext';

export const Starfield = () => {
  const { theme } = useTheme();
  const [init, setInit] = useState(false);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [prefersReducedMotion]);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: ["#ffffff", "#00D4AA", "#7B61FF"],
        },
        links: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 0.2,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
        },
        number: {
          density: {
            enable: true,
            area: 1000,
          },
          value: 50,
        },
        opacity: {
          value: { min: 0.1, max: 0.6 },
          animation: {
            enable: true,
            speed: 0.3,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 0.5, max: 2.5 },
        },
      },
      detectRetina: true,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 150,
            links: {
              opacity: 0.2,
              color: "#00D4AA",
            },
          },
        },
      },
    }),
    []
  );

  if (!init || prefersReducedMotion) return null;

  // Hide particles in light mode for clean background
  if (theme === 'light') {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="fixed inset-0 -z-10"
    />
  );
};

export const Nebula = () => {
  const { theme } = useTheme();
  
  // Hide nebula in light mode for clean background
  if (theme === 'light') {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Nebula 1 */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(123, 97, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animationDuration: '8s'
        }}
      />
      
      {/* Nebula 2 */}
      <div 
        className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full opacity-10 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 170, 0.3) 0%, transparent 70%)',
          filter: 'blur(35px)',
          animationDuration: '12s',
          animationDelay: '4s'
        }}
      />
      
      {/* Nebula 3 */}
      <div 
        className="absolute top-1/2 left-3/4 w-64 h-64 rounded-full opacity-10 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 107, 0.3) 0%, transparent 70%)',
          filter: 'blur(30px)',
          animationDuration: '10s',
          animationDelay: '2s'
        }}
      />
    </div>
  );
};

export const ShootingStar = () => {
  const { theme } = useTheme();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const createShootingStar = () => {
      const id = Date.now();
      const star = {
        id,
        top: Math.random() * 50,
        left: Math.random() * 50,
        duration: 1.5 + Math.random() * 1,
      };
      setStars((prev) => [...prev, star]);

      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== id));
      }, star.duration * 1000);
    };

    const interval = setInterval(createShootingStar, 30000 + Math.random() * 20000);
    return () => clearInterval(interval);
  }, []);

  // Hide shooting stars in light mode for clean background
  if (theme === 'light') {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-[100px] h-[2px] shooting-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            background: "linear-gradient(90deg, transparent, #00D4AA, #7B61FF)",
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

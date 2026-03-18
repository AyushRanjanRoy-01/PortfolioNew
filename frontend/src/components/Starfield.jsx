import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const Starfield = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

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
          value: 150,
        },
        opacity: {
          value: { min: 0.1, max: 0.8 },
          animation: {
            enable: true,
            speed: 0.5,
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

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="fixed inset-0 -z-10"
    />
  );
};

export const Nebula = () => {
  return (
    <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
      {/* Nebula cloud 1 */}
      <div
        className="nebula absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(123, 97, 255, 0.08) 0%, transparent 70%)",
          top: "10%",
          left: "10%",
          animationDelay: "0s",
        }}
      />
      {/* Nebula cloud 2 */}
      <div
        className="nebula absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 212, 170, 0.06) 0%, transparent 70%)",
          top: "50%",
          right: "5%",
          animationDelay: "40s",
        }}
      />
      {/* Nebula cloud 3 */}
      <div
        className="nebula absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(123, 97, 255, 0.05) 0%, transparent 70%)",
          bottom: "10%",
          left: "30%",
          animationDelay: "80s",
        }}
      />
    </div>
  );
};

export const ShootingStar = () => {
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

    const interval = setInterval(createShootingStar, 15000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, []);

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

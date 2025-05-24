import { useCallback } from "react";
import { loadBasic } from "@tsparticles/basic";
import Particles from "@tsparticles/react";

export const SparklesCore = ({ className }) => {
    const particlesInit = useCallback(async (engine) => {
        await loadBasic(engine);
    }, []);

    return (
        <Particles
            init={particlesInit}
            className={className}
            options={{
                fullScreen: false,
                background: { color: "transparent" },
                particles: {
                    number: { value: 40, density: { enable: true, area: 800 } },
                    color: { value: ["#ffffff", "#a5b4fc", "#fcd34d"] },
                    shape: { type: "circle" },
                    opacity: {
                        value: 0.7,
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
                    },
                    size: {
                        value: 2.5,
                        random: true,
                        anim: { enable: false },
                    },
                    move: {
                        enable: true,
                        speed: 0.6,
                        direction: "none",
                        outModes: "out",
                    },
                },
                interactivity: {
                    detectsOn: "canvas",
                    events: {
                        onHover: { enable: false },
                        resize: true,
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

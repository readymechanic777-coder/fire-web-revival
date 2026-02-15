import { useEffect, useRef } from "react";

/**
 * Global SVG filter that creates realistic water caustic distortion.
 * Applied to backgrounds via CSS `filter: url(#water-distortion)`.
 * Uses animated feTurbulence + feDisplacementMap for organic liquid movement.
 */
const WaterDistortionFilter = () => {
  const turbulenceRef = useRef(null);

  useEffect(() => {
    let frame;
    let seed = 0;
    const animate = () => {
      seed += 0.003;
      if (turbulenceRef.current) {
        turbulenceRef.current.setAttribute(
          "baseFrequency",
          `${0.012 + Math.sin(seed) * 0.004} ${0.015 + Math.cos(seed * 0.7) * 0.005}`
        );
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        {/* Main water distortion */}
        <filter id="water-distortion" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.012 0.015"
            numOctaves="3"
            seed="2"
            stitchTiles="stitch"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Subtle glass refraction for panels */}
        <filter id="glass-refraction" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.03"
            numOctaves="2"
            seed="5"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Water caustic light pattern */}
        <filter id="water-caustics" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.02 0.03"
            numOctaves="3"
            seed="8"
            result="causticNoise"
          />
          <feColorMatrix
            in="causticNoise"
            type="luminanceToAlpha"
            result="causticAlpha"
          />
          <feComponentTransfer in="causticAlpha" result="causticBright">
            <feFuncA type="linear" slope="0.15" intercept="0" />
          </feComponentTransfer>
          <feFlood floodColor="hsl(190, 100%, 60%)" result="causticColor" />
          <feComposite in="causticColor" in2="causticBright" operator="in" result="causticPattern" />
          <feComposite in="SourceGraphic" in2="causticPattern" operator="over" />
        </filter>

        {/* Water surface ripple for cursor */}
        <filter id="ripple-distort" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.03"
            numOctaves="2"
            seed="3"
            result="rippleNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="rippleNoise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default WaterDistortionFilter;

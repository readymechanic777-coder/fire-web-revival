import { cn } from "@/lib/utils";

export function WaterDropletLogo({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <defs>
        
        <linearGradient id="dropFill" x1="18" y1="6" x2="46" y2="56">
          <stop offset="0" stopColor="#e0faff" />
          <stop offset="0.35" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0369a1" />
        </linearGradient>

        
        <radialGradient id="dropGlow" cx="30%" cy="18%" r="70%">
          <stop offset="0" stopColor="rgba(255, 255, 255, 0.95)" />
          <stop offset="0.4" stopColor="rgba(186, 230, 253, 0.8)" />
          <stop offset="1" stopColor="rgba(56, 189, 248, 0.0)" />
        </radialGradient>

        
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.9 0
            "
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      
      <path
        d="M32 5
           C27 14 20 22 18 31
           C16 37 17 44 21 49
           C24.5 53.5 28.7 55.7 32 55.7
           C35.3 55.7 39.5 53.5 43 49
           C47 44 48 37 46 31
           C44 24 38.5 16.5 32 5Z"
        fill="url(#dropFill)"
        filter="url(#softGlow)"
        opacity="0.92"
      />

      
      <path
        d="M32 9
           C27 17 22 24.2 21 31.5
           C20.2 36.8 21.8 41.5 24.8 44.8
           C27.5 47.7 30.3 49 32.8 49.4
           C28 48 23.8 44.3 23.8 38.2
           C23.8 32.6 26.7 27.8 30 23.4
           C31.5 21.4 33 19.5 34.3 17.4
           C33.2 14.7 32.2 11.9 32 9Z"
        fill="url(#dropGlow)"
        opacity="0.7"
      />

      
      <path
        d="M26 19
           C28.4 14.8 30.4 11.5 32.2 8.7
           C30.1 13.3 28 17.2 26.4 20.7
           C24.5 25 23.4 28.4 23.4 32.4
           C23.4 36.6 25.3 39.6 28.4 41.4
           C25.1 40.5 22.5 37.9 21.8 34.3
           C21.1 30.4 22.4 25.9 26 19Z"
        fill="rgba(255,255,255,0.9)"
        opacity="0.45"
      />
    </svg>
  );
}


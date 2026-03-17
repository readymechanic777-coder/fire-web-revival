import { LiquidEffectAnimation } from "../components/ui/liquid-effect-animation";

export default function LiquidDemo() {
  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60" ><LiquidEffectAnimation /></div>
    </div>

  );
}


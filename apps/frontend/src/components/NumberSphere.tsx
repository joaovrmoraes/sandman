import { cn } from "@/lib/utils";
import { getNumberWord } from "@/lib/numberWords";

interface NumberSphereProps {
  number: number;
  revealed: boolean;
  index: number;
  word: string;
}

const NumberSphere = ({ number, revealed, index, word }: NumberSphereProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Number Sphere */}
      <div
        className={cn(
          "relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0",
          "backdrop-blur-xl bg-gradient-to-br from-primary/20 to-accent/20",
          "border border-primary/30",
          "transition-all duration-700",
          revealed ? "animate-reveal" : "blur-md opacity-50",
          revealed && "shadow-[0_0_30px_hsl(var(--dream-glow)/0.6)]"
        )}
        style={{
          animationDelay: revealed ? `${index * 0.1}s` : "0s",
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-xl animate-pulse-glow" />
        
        {/* Number */}
        <span
          className={cn(
            "relative z-10 text-2xl md:text-3xl font-bold transition-all duration-700",
            revealed
              ? "text-foreground opacity-100"
              : "text-transparent opacity-0"
          )}
        >
          {number}
        </span>
      </div>

      {/* Word Label */}
      <span
        className={cn(
          "text-xs md:text-sm font-medium transition-all duration-700 text-center",
          revealed
            ? "text-accent opacity-100"
            : "text-transparent opacity-0"
        )}
        style={{
          animationDelay: revealed ? `${index * 0.1 + 0.2}s` : "0s",
        }}
      >
        {word}
      </span>
    </div>
  );
};

export default NumberSphere;

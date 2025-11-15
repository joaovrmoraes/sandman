import { Moon, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="relative z-10 w-full py-6 px-4">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Moon className="w-8 h-8 text-primary animate-float-slow" />
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Números dos Sonhos
        </h1>
        <Sparkles className="w-8 h-8 text-accent animate-pulse-glow" />
      </div>
      <p className="text-center text-muted-foreground mt-2 text-sm md:text-base">
        Transforme seus sonhos em números da sorte
      </p>
    </header>
  );
};

export default Header;

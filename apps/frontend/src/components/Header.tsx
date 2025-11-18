import { Moon, Wand2 } from "lucide-react";
import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDreamerPage = location.pathname === "/dreamer";

  return (
    <header className="w-full py-4 px-4 backdrop-blur-xl bg-card/30 border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Moon className="w-8 h-8 text-accent animate-pulse-glow" />
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse-glow" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Numero dos Sonhos
          </span>
        </NavLink>
        
        {!isDreamerPage && (
          <Button
            onClick={() => navigate("/dreamer")}
            size="sm"
            className="hidden sm:inline-flex bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-[0_0_20px_hsl(var(--dream-glow)/0.2)] hover:shadow-[0_0_30px_hsl(var(--dream-glow)/0.4)]"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Gerar números
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;

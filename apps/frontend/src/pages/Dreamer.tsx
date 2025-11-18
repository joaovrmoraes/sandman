import Header from "@/components/Header";
import DreamCard from "@/components/DreamCard";

const Dreamer = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated starry background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      </div>

      {/* Floating clouds effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-dream-purple/5 rounded-full blur-[100px] animate-float-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Title section */}
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer">
                Gerador de Números dos Sonhos
              </h1>
              <p className="text-muted-foreground text-lg">
                Transforme seus sonhos em números da sorte
              </p>
            </div>

            {/* Dream card */}
            <DreamCard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dreamer;

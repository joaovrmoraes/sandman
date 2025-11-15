import Header from "@/components/Header";
import DreamCard from "@/components/DreamCard";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <DreamCard />
      </main>

      {/* Floating clouds effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl animate-float-slow" />
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-40 left-1/4 w-36 h-36 rounded-full bg-primary/5 blur-3xl animate-float-slow" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-20 right-1/3 w-44 h-44 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>
    </div>
  );
};

export default Index;

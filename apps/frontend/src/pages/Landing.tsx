import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Wand2, Shield, Zap, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Wand2,
      title: "Escreva seu sonho",
      description: "Conte em detalhes o que você sonhou e deixe a magia acontecer",
    },
    {
      icon: Sparkles,
      title: "Receba a interpretação",
      description: "Uma análise mística do seu sonho e seus significados ocultos",
    },
    {
      icon: Star,
      title: "Gere seus números",
      description: "Números especiais gerados a partir da energia do seu sonho",
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Interpretação única",
      description: "Cada sonho gera uma análise mística personalizada",
    },
    {
      icon: Zap,
      title: "Rápido e fácil",
      description: "Em poucos cliques você tem seus números dos sonhos",
    },
    {
      icon: Heart,
      title: "Energia positiva",
      description: "Conecte-se com as mensagens do seu subconsciente",
    },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      location: "São Paulo, SP",
      photo: "MS",
      text: "Usei os números do meu sonho e fiquei surpresa com os resultados! A interpretação foi muito interessante e os números realmente pareciam especiais.",
    },
    {
      name: "João Pedro",
      location: "Rio de Janeiro, RJ",
      photo: "JP",
      text: "Sempre acreditei nos sonhos e essa plataforma me ajudou a entender melhor. Os números gerados têm uma energia diferente, recomendo!",
    },
    {
      name: "Ana Costa",
      location: "Belo Horizonte, MG",
      photo: "AC",
      text: "Fiquei impressionada com a precisão da interpretação do meu sonho. Os números me trouxeram sorte e uma sensação de conexão especial.",
    },
    {
      name: "Carlos Eduardo",
      location: "Curitiba, PR",
      photo: "CE",
      text: "A experiência foi incrível! Os números gerados a partir do meu sonho trouxeram boas surpresas. Vale muito a pena experimentar.",
    },
    {
      name: "Juliana Mendes",
      location: "Salvador, BA",
      photo: "JM",
      text: "Uso frequentemente e sempre me surpreendo. A conexão entre os sonhos e os números é fascinante. Já tive várias alegrias usando!",
    },
    {
      name: "Roberto Lima",
      location: "Brasília, DF",
      photo: "RL",
      text: "Compartilhei com amigos e todos adoraram! A plataforma é linda e a experiência de revelar os números é emocionante. Muito satisfeito!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer">
              Transforme seus sonhos em números da sorte
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra o poder místico dos seus sonhos e gere números únicos conectados à energia do seu subconsciente
            </p>
          </div>
          
          <Button
            onClick={() => navigate("/dreamer")}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-[0_0_30px_hsl(var(--dream-glow)/0.3)] hover:shadow-[0_0_40px_hsl(var(--dream-glow)/0.5)] group relative overflow-hidden text-lg px-8 py-6 h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <Sparkles className="w-6 h-6 mr-2 animate-float" />
            Gerar números agora
          </Button>

          <p className="text-sm text-muted-foreground/70">
            Revele seus números por apenas R$ 1,99
          </p>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Como funciona?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Um processo simples e mágico em apenas 3 passos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-6 md:p-8 backdrop-blur-xl bg-gradient-to-br from-card/80 to-card/60 border-primary/30 shadow-[0_20px_60px_hsl(250_60%_5%/0.3)] hover:shadow-[0_20px_60px_hsl(250_60%_5%/0.5)] transition-all hover:scale-105 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none" />
                  <div className="relative z-10 space-y-4 text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border border-primary/30">
                      <Icon className="w-8 h-8 text-accent animate-pulse-glow" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Por que usar */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Por que usar?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conecte-se com as mensagens ocultas dos seus sonhos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="p-6 md:p-8 backdrop-blur-xl bg-gradient-to-br from-card/80 to-card/60 border-primary/30 shadow-[0_20px_60px_hsl(250_60%_5%/0.3)] transition-all hover:border-primary/50"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center border border-primary/30">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              O que dizem nossos usuários
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de quem transformou sonhos em sorte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 backdrop-blur-xl bg-gradient-to-br from-card/80 to-card/60 border-primary/30 shadow-[0_20px_60px_hsl(250_60%_5%/0.3)] transition-all hover:shadow-[0_20px_60px_hsl(250_60%_5%/0.5)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                      {testimonial.photo}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-accent text-accent"
                      />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <Card className="p-8 md:p-12 backdrop-blur-xl bg-gradient-to-br from-card/80 to-card/60 border-primary/30 shadow-[0_20px_60px_hsl(250_60%_5%/0.5)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Pronto para descobrir seus números dos sonhos?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transforme a energia do seu sonho em números especiais e conecte-se com o poder do seu subconsciente
              </p>
              <Button
                onClick={() => navigate("/dreamer")}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-[0_0_30px_hsl(var(--dream-glow)/0.3)] hover:shadow-[0_0_40px_hsl(var(--dream-glow)/0.5)] group relative overflow-hidden text-lg px-8 py-6 h-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <Wand2 className="w-6 h-6 mr-2 animate-float" />
                Começar agora
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Numero dos Sonhos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

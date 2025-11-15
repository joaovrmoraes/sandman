import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Wand2, ArrowLeft } from "lucide-react";
import NumberSphere from "./NumberSphere";
import PaymentModal from "./PaymentModal";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useGenerateDreamNumbersResult } from "@/queries/dreams/generate-result.mutation";

const DreamCard = () => {
  const [dream, setDream] = useState("");
  const [quantity, setQuantity] = useState<"6" | "12">("6");
  const [minNumber, setMinNumber] = useState("1");
  const [maxNumber, setMaxNumber] = useState("60");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [interpretation, setInterpretation] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentView, setCurrentView] = useState<"form" | "results">("form");


  const generateDreamNumbers = useGenerateDreamNumbersResult({
    onSuccess: (data) => {
      console.log("Números dos sonhos gerados com sucesso:", data);
    },
    onError: (error) => {
      toast.error("Erro ao gerar números dos sonhos.");
    },
  })

  const handleGenerateDreamNumbers =  async () => {
    await generateDreamNumbers.mutateAsync({
      userMessage: dream
    })
  };

  const generateNumbers = () => {
    if (!dream.trim()) {
      toast.error("Por favor, escreva seu sonho primeiro!");
      return;
    }

    const min = parseInt(minNumber) || 1;
    const max = parseInt(maxNumber) || 60;

    if (min >= max) {
      toast.error("O número máximo deve ser maior que o mínimo!");
      return;
    }

    const count = parseInt(quantity);
    const generatedNumbers: number[] = [];
    
    while (generatedNumbers.length < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!generatedNumbers.includes(num)) {
        generatedNumbers.push(num);
      }
    }

    generatedNumbers.sort((a, b) => a - b);

    // Generate mystical interpretation
    const interpretations = [
      "A queda do seu sonho revela um anseio profundo por transformação e libertação. Em cada descenso há a esperança de renascimento sob um novo céu."
    ];

    const randomInterpretation =
      interpretations[Math.floor(Math.random() * interpretations.length)];

    setNumbers(generatedNumbers);
    setInterpretation(randomInterpretation);
    setShowResults(true);
    setRevealed(false);
    setCurrentView("results");

    toast.success("Números dos sonhos gerados!", {
      description: "Revele-os para descobrir sua sorte!",
    });
  };

  const handleBack = () => {
    setCurrentView("form");
    setShowResults(false);
    setRevealed(false);
  };

  const handleReveal = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentConfirmed = () => {
    setRevealed(true);
    toast.success("Números revelados!", {
      description: "Boa sorte com seus números dos sonhos!",
    });
  };

  return (
    <>
      <Card className="relative backdrop-blur-xl bg-gradient-to-br from-card/80 to-card/60 border-primary/30 shadow-[0_20px_60px_hsl(250_60%_5%/0.5)] overflow-hidden">
        {/* Glow effect overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        
        <div className="relative z-10 overflow-hidden">
          {/* Form View */}
          <div
            className={cn(
              "p-6 md:p-8 space-y-6 transition-all duration-500 ease-in-out",
              currentView === "form"
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0 absolute inset-0 pointer-events-none"
            )}
          >
            {/* Dream input */}
            <div className="space-y-2">
              <Label htmlFor="dream" className="text-foreground/90 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                Conte seu sonho
              </Label>
              <Textarea
                id="dream"
                placeholder="Descreva seu sonho em detalhes..."
                value={dream}
                onChange={(e) => setDream(e.target.value.slice(0, 255))}
                maxLength={255}
                className="min-h-[120px] backdrop-blur-sm bg-input/50 border-primary/20 focus:border-primary/50 transition-colors resize-none p-4"
              />
              <p className="text-xs text-muted-foreground text-right">
                {dream.length}/255 caracteres
              </p>
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade de números</Label>
                <Select value={quantity} onValueChange={(value: "6" | "12") => setQuantity(value)}>
                  <SelectTrigger id="quantity" className="backdrop-blur-sm bg-input/50 border-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-xl bg-card/95">
                    <SelectItem value="6">6 números</SelectItem>
                    <SelectItem value="12">12 números</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min">Número mínimo</Label>
                <Input
                  id="min"
                  type="number"
                  value={minNumber}
                  onChange={(e) => setMinNumber(e.target.value)}
                  className="backdrop-blur-sm bg-input/50 border-primary/20 focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max">Número máximo</Label>
                <Input
                  id="max"
                  type="number"
                  value={maxNumber}
                  onChange={(e) => setMaxNumber(e.target.value)}
                  className="backdrop-blur-sm bg-input/50 border-primary/20 focus:border-primary/50"
                />
              </div>
            </div>

            {/* Generate button */}
            <Button
              onClick={handleGenerateDreamNumbers}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-[0_0_30px_hsl(var(--dream-glow)/0.3)] hover:shadow-[0_0_40px_hsl(var(--dream-glow)/0.5)] group relative overflow-hidden"
              size="lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <Wand2 className="w-5 h-5 mr-2 animate-float" />
              Gerar números do sonho
            </Button>
          </div>

          {/* Results View */}
          <div
            className={cn(
              "p-6 md:p-8 space-y-6 transition-all duration-500 ease-in-out",
              currentView === "results"
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0 absolute inset-0 pointer-events-none"
            )}
          >
            {/* Back button */}
            <Button
              onClick={handleBack}
              variant="ghost"
              className="mb-2 text-muted-foreground hover:text-foreground"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            {/* Interpretation */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground/90 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent animate-pulse-glow" />
                Interpretação Mística
              </h3>
              <div className="p-4 rounded-xl backdrop-blur-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
                <p className="text-foreground/80 leading-relaxed italic">
                  {interpretation}
                </p>
              </div>
            </div>

            {/* Numbers */}
            <div className="space-y-4">
              <h3 className="text-center text-lg font-semibold text-foreground/90 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Seus números dos sonhos
              </h3>
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 py-4">
                {numbers.map((number, index) => (
                  <NumberSphere
                    key={index}
                    number={number}
                    revealed={revealed}
                    index={index}
                  />
                ))}
              </div>

              {!revealed && (
                <Button
                  onClick={handleReveal}
                  className="w-full bg-gradient-to-r from-dream-purple to-dream-pink hover:opacity-90 transition-all shadow-[0_0_30px_hsl(320_80%_60%/0.3)] hover:shadow-[0_0_40px_hsl(320_80%_60%/0.5)]"
                  size="lg"
                >
                  Revelar números (R$ 1,99 via PIX)
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <PaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentConfirmed={handlePaymentConfirmed}
      />
    </>
  );
};

export default DreamCard;

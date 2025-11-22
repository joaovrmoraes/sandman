import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { UseGenerateDreamParams } from "@/queries/dreams/generate-dream.mutation"

const dreamFormSchema = z.object({
  dream: z.string()
    .min(10, "O sonho deve ter pelo menos 10 caracteres")
    .max(255, "O sonho não pode ter mais de 255 caracteres"),
  quantity: z.enum(["6", "15"], {
    required_error: "Selecione a quantidade de números",
  }),
  minNumber: z.string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Deve ser um número válido maior que 0",
    }),
  maxNumber: z.string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Deve ser um número válido maior que 0",
    }),
}).refine((data) => Number(data.minNumber) < Number(data.maxNumber), {
  message: "O número mínimo deve ser menor que o número máximo",
  path: ["maxNumber"],
});

type DreamFormValues = z.infer<typeof dreamFormSchema>;

const DreamCard = () => {
  const [numbers, setNumbers] = useState<{number: number, description: string}[]>([]);
  const [interpretation, setInterpretation] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentView, setCurrentView] = useState<"form" | "results">("form");
  const [dreamGeneratedData, setDreamGeneratedData] = useState<{
    dreamAnalogy: string;
    luckyNumbers: {number: number, description: string}[];
  } | null>(null);

  const form = useForm<DreamFormValues>({
    resolver: zodResolver(dreamFormSchema),
    defaultValues: {
      dream: "",
      quantity: "6",
      minNumber: "1",
      maxNumber: "60",
    },
  });

  const generateDreamMutation = UseGenerateDreamParams({
    onSuccess: (data) => {
      setInterpretation(data.dreamAnalogy);
      setNumbers(data.luckyNumbers);
      setDreamGeneratedData(data)
      setShowResults(true);
      setRevealed(false);
      setCurrentView("results");
      toast.success("Interpretação do sonho recebida!", {
        description: "Veja seus números dos sonhos abaixo.",
      });
    },
    onError: (error) => {
      toast.error("Erro ao interpretar o sonho: " + error.message);
    },
  });

  const handleGenerateDream = (values: DreamFormValues) => {
    generateDreamMutation.mutate({
      body: {
        userMessage: values.dream,
        totalNumber: parseInt(values.quantity),
        numberRange: [parseInt(values.minNumber), parseInt(values.maxNumber)],
      },
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleGenerateDream)} className="space-y-6">
                {/* Dream input */}
                <FormField
                  control={form.control}
                  name="dream"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-accent" />
                        Conte seu sonho
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva seu sonho em detalhes..."
                          className="min-h-[120px] backdrop-blur-sm bg-input/50 border-primary/20 focus:border-primary/50 transition-colors resize-none"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between items-center">
                        <FormMessage />
                        <p className="text-xs text-muted-foreground">
                          {field.value.length}/255 caracteres
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade de números</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="backdrop-blur-sm bg-input/50 border-primary/20">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="backdrop-blur-xl bg-card/95">
                            <SelectItem value="6">6 números</SelectItem>
                            <SelectItem value="15">15 números</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número mínimo</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="backdrop-blur-sm bg-input/50 border-primary/20 focus:border-primary/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número máximo</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="backdrop-blur-sm bg-input/50 border-primary/20 focus:border-primary/50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Generate button */}
                <Button
                  type="submit"
                  disabled={generateDreamMutation.isPending}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-[0_0_30px_hsl(var(--dream-glow)/0.3)] hover:shadow-[0_0_40px_hsl(var(--dream-glow)/0.5)] group relative overflow-hidden disabled:opacity-70"
                  size="lg"
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000",
                    generateDreamMutation.isPending 
                      ? "animate-shimmer" 
                      : "translate-x-[-200%] group-hover:translate-x-[200%]"
                    )} 
                  />
                  <Wand2 className="w-5 h-5 -mb-2  animate-float" />
                  {generateDreamMutation.isPending ? "Gerando..." : "Gerar números do sonho"}
                </Button>
              </form>
            </Form>
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
              
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 py-4">
                {numbers.map((item, index) => (
                  <NumberSphere
                    key={index}
                    number={item.number}
                    revealed={revealed}
                    index={index}
                    word={item.description}
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
        dreamResult={{
          dreamAnalogy: interpretation,
          luckyNumbers: numbers,
        }}
      />
    </>
  );
};

export default DreamCard;

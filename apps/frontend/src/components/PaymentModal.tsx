import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Sparkles, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UseGenerateCheckoutMutation } from "@/queries/payment/generate-checkout.mutation";
import { usePaymentSSE } from "@/hooks/use-payment-sse";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onPaymentConfirmed: () => void;
  dreamResult?: {
    dreamAnalogy: string;
    luckyNumbers: {number: number, description: string}[];
  };
}

interface EmailFormData {
  email: string;
}

interface PaymentResponse {
  message: {
    id: number;
    point_of_interaction: {
      transaction_data: {
        qr_code: string;
        qr_code_base64: string;
        ticket_url: string;
      };
    };
  };
}

const PaymentModal = ({ open, onClose, onPaymentConfirmed, dreamResult }: PaymentModalProps) => {
  const [countdown, setCountdown] = useState(60);
  const [isPaid, setIsPaid] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmailFormData>();

  // Função chamada quando o pagamento for confirmado via SSE
  const handlePaymentConfirmed = useCallback(() => {
    console.log("[PaymentModal] Pagamento confirmado via SSE!");
    setIsPaid(true);
    toast({
      title: "Pagamento confirmado! 🎉",
      description: "Seu pagamento foi detectado com sucesso",
    });
    
    setTimeout(() => {
      onPaymentConfirmed();
      onClose();
    }, 2000);
  }, [toast, onPaymentConfirmed, onClose]);

  // Hook SSE - conecta quando temos paymentData
  const { isConnected } = usePaymentSSE(
    paymentData?.message?.id || null, 
    handlePaymentConfirmed
  );

  useEffect(() => {
    if (!open) {
      setCountdown(60);
      setIsPaid(false);
      setShowPayment(false);
      setPaymentData(null);
      reset();
      return;
    }

    if (!showPayment) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open, showPayment, reset]);

  const generateCheckoutMutation = UseGenerateCheckoutMutation({
    onSuccess: (data: PaymentResponse) => {
      console.log("[PaymentModal] Checkout gerado:", data);
      setPaymentData(data);
      setShowPayment(true);
      toast({
        title: "QR Code gerado!",
        description: "Escaneie o QR Code para efetuar o pagamento",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao gerar checkout",
        description: error.message,
        variant: "destructive",
      });
      setShowPayment(false);
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    if (!dreamResult) {
      toast({
        title: "Erro",
        description: "Resultado do sonho não encontrado",
        variant: "destructive",
      });
      return;
    }

    await generateCheckoutMutation.mutateAsync({ 
      body: {
        email: data.email,
        dreamResult: dreamResult,
      } 
    });
  };

  const handleCopyPixCode = () => {
    const pixCode = paymentData?.message?.point_of_interaction?.transaction_data?.qr_code;
    if (pixCode) {
      navigator.clipboard.writeText(pixCode);
      toast({
        title: "Código copiado!",
        description: "O código PIX foi copiado para a área de transferência",
      });
    }
  };

  const handleOpenPixLink = () => {
    const ticketUrl = paymentData?.message?.point_of_interaction?.transaction_data?.ticket_url;
    if (ticketUrl) {
      window.open(ticketUrl, "_blank");
    }
  };

  const handleSimulatePayment = () => {
    setIsPaid(true);
    setTimeout(() => {
      onPaymentConfirmed();
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-card/95 border-primary/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-accent animate-pulse-glow" />
            {!showPayment ? "Confirme seu e-mail" : "Pagamento PIX"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {
              !showPayment 
                ? "Informe seu e-mail para receber os números da sorte" 
                : "Escaneie o QR Code ou copie o código PIX"
            }          
            </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-6">
          {!showPayment ? (
            /* Email Form */
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full"
                  {...register("email", { 
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "E-mail inválido"
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                size="lg"
                disabled={generateCheckoutMutation.isPending}
              >
                {generateCheckoutMutation.isPending ? "Gerando..." : "Continuar para pagamento"}
              </Button>
            </form>
          ) : !isPaid ? (
            <>
              {/* QR Code da API */}
              {paymentData?.message?.point_of_interaction?.transaction_data?.qr_code_base64 ? (
                <div className="relative w-64 h-64 rounded-2xl bg-white p-4 flex items-center justify-center">
                  <img 
                    src={`data:image/png;base64,${paymentData.message.point_of_interaction.transaction_data.qr_code_base64}`}
                    alt="QR Code PIX"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_hsl(var(--dream-glow)/0.3)]" />
                </div>
              ) : (
                <div className="relative w-64 h-64 rounded-2xl bg-white p-4 flex items-center justify-center">
                  <p className="text-gray-500">Carregando QR Code...</p>
                </div>
              )}

              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-primary">R$ 1,99</p>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm text-muted-foreground">
                    Tempo restante: {countdown}s
                  </p>
                  {isConnected && (
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                      <span>Aguardando pagamento...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Copy PIX Code Button */}
              <Button
                onClick={handleCopyPixCode}
                variant="outline"
                className="w-full gap-2"
                size="lg"
                disabled={!paymentData?.message?.point_of_interaction?.transaction_data?.qr_code}
              >
                <Copy className="w-4 h-4" />
                Copiar código PIX
              </Button>

              {/* Simular Pagamento - apenas em dev */}
              {import.meta.env.VITE_ENABLE_PAYMENT_SIMULATION === 'true' && (
                <Button
                  onClick={handleSimulatePayment}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  Simular Pagamento Concluído
                </Button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-8 animate-reveal">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_40px_hsl(var(--dream-glow)/0.6)]">
                <Check className="w-12 h-12 text-white" />
              </div>
              <p className="text-xl font-bold text-primary">Pagamento Confirmado!</p>
              <p className="text-muted-foreground text-center">
                Revelando seus números dos sonhos...
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;

import { useState, useEffect } from "react";
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
import { QrCode, Check, Sparkles, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onPaymentConfirmed: () => void;
}

const PaymentModal = ({ open, onClose, onPaymentConfirmed }: PaymentModalProps) => {
  const [countdown, setCountdown] = useState(60);
  const [isPaid, setIsPaid] = useState(false);
  const [email, setEmail] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();
  
  // Código PIX simulado
  const pixCode = "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540519.995802BR5925GERADOR NUMEROS SONHOS6009SAO PAULO62070503***63041D3E";

  useEffect(() => {
    if (!open) {
      setCountdown(60);
      setIsPaid(false);
      setEmail("");
      setShowPayment(false);
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
  }, [open, showPayment]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido",
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    toast({
      title: "Código copiado!",
      description: "O código PIX foi copiado para a área de transferência",
    });
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
            <form onSubmit={handleEmailSubmit} className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                size="lg"
              >
                Continuar para pagamento
              </Button>
            </form>
          ) : !isPaid ? (
            <>
              {/* QR Code mockup */}
              <div className="relative w-48 h-48 rounded-2xl bg-white p-4 flex items-center justify-center">
                <QrCode className="w-full h-full text-gray-800" />
                <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_hsl(var(--dream-glow)/0.3)]" />
              </div>

              <div className="text-center space-y-2">
                <p className="text-3xl font-bold text-primary">R$ 1,99</p>
                <p className="text-sm text-muted-foreground">
                  Tempo restante: {countdown}s
                </p>
              </div>

              {/* Copy PIX Code Button */}
              <Button
                onClick={handleCopyPixCode}
                variant="outline"
                className="w-full gap-2"
                size="lg"
              >
                <Copy className="w-4 h-4" />
                Copiar código PIX
              </Button>

              <Button
                onClick={handleSimulatePayment}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                size="lg"
              >
                Simular Pagamento Concluído
              </Button>
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

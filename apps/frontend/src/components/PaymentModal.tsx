import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Check, Sparkles } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onPaymentConfirmed: () => void;
}

const PaymentModal = ({ open, onClose, onPaymentConfirmed }: PaymentModalProps) => {
  const [countdown, setCountdown] = useState(60);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (!open) {
      setCountdown(60);
      setIsPaid(false);
      return;
    }

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
  }, [open]);

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
            Pagamento PIX
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Escaneie o QR Code para revelar seus números da sorte
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-6">
          {!isPaid ? (
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

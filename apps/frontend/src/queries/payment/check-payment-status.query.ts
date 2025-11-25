import { useQuery } from "@tanstack/react-query";
import { CheckPaymentStatusGet } from "@/http/checkout/check-payment-status-get";

interface UseCheckPaymentStatusParams {
  paymentId: number | null;
  enabled?: boolean;
  refetchInterval?: number | false;
}

export const useCheckPaymentStatus = ({
  paymentId,
  enabled = true,
  refetchInterval = false,
}: UseCheckPaymentStatusParams) => {
  return useQuery({
    queryKey: ["payment-status", paymentId],
    queryFn: () => CheckPaymentStatusGet({ paymentId: paymentId! }),
    enabled: enabled && paymentId !== null,
    refetchInterval,
    retry: false,
  });
};

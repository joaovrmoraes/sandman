import { useEffect, useRef, useState } from "react";
import { useCheckPaymentStatus } from "@/queries/payment/check-payment-status.query";

interface SSEPaymentData {
  action: string;
  data: {
    id: string;
  };
}

export function usePaymentSSE(paymentId: number | null, onPaymentConfirmed: () => void) {
  const [isConnected, setIsConnected] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const eventSourceRef = useRef<EventSource | null>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Query para verificar status do pagamento (usado quando volta do background)
  const { data: paymentStatus } = useCheckPaymentStatus({
    paymentId,
    enabled: paymentId !== null && !isPageVisible,
    refetchInterval: !isPageVisible ? 3000 : false, // Polling a cada 3s quando invisível
  });

  // Monitora se o pagamento foi confirmado via polling
  useEffect(() => {
    if (paymentStatus?.paid) {
      console.log('[Polling] Pagamento confirmado');
      onPaymentConfirmed();
    }
  }, [paymentStatus, onPaymentConfirmed]);

  // Monitora visibilidade da página
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = document.visibilityState === "visible";
      setIsPageVisible(visible);
      console.log('[Visibility] Página', visible ? 'visível' : 'oculta');
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Só conecta SSE se tiver um paymentId e a página estiver visível
    if (!paymentId || !isPageVisible) {
      // Fecha SSE se existir quando página fica invisível
      if (eventSourceRef.current) {
        console.log('[SSE] Fechando conexão (página invisível)');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        setIsConnected(false);
      }
      return;
    }

    // URL do SSE
    const sseUrl = `${import.meta.env.VITE_API_BASE_URL}/sse`;

    const eventSource = new EventSource(sseUrl);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log('[SSE] Conectado');
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        // Ignora mensagens vazias ou comentários
        if (!event.data || !event.data.trim() || event.data.startsWith(':')) {
          return;
        }

        console.log('[SSE] Mensagem recebida:', event.data.action);
        
        const data: SSEPaymentData = JSON.parse(event.data);

        // Verifica se é uma atualização de pagamento e se é do nosso pagamento
        if (data.action === "payment.updated" && Number(data.data.id) === paymentId) {
          console.log('[SSE] Pagamento confirmado');
          onPaymentConfirmed();
          
          // Fecha a conexão após confirmar o pagamento
          eventSource.close();
        }
      } catch (error) {
        console.error("[SSE] Erro ao processar mensagem:", error, event.data);
      }
    };

    eventSource.onerror = (error) => {
      console.error("[SSE] Erro na conexão:", error);
      setIsConnected(false);
      eventSource.close();
    };

    // Cleanup: fecha a conexão quando o componente desmontar ou dependências mudarem
    return () => {
      console.log('[SSE] Cleanup - fechando conexão');
      eventSource.close();
      setIsConnected(false);
    };
  }, [paymentId, onPaymentConfirmed, isPageVisible]);

  // Cleanup do intervalo de verificação
  useEffect(() => {
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, []);

  return { isConnected, isPageVisible };
}

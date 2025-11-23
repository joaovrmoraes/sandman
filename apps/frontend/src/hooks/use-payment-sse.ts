import { useEffect, useRef, useState } from "react";

interface SSEPaymentData {
  action: string;
  data: {
    id: string;
  };
}

export function usePaymentSSE(paymentId: number | null, onPaymentConfirmed: () => void) {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Só conecta se tiver um paymentId
    if (!paymentId) return;

    // URL do SSE
    const sseUrl = `${import.meta.env.VITE_API_BASE_URL}/sse`;

    const eventSource = new EventSource(sseUrl);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
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

    // Cleanup: fecha a conexão quando o componente desmontar
    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [paymentId, onPaymentConfirmed]);

  return { isConnected };
}

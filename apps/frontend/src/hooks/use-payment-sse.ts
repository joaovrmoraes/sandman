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
    const sseUrl = `http://localhost:4000/sse`;
    
    console.log("[SSE] Conectando ao servidor... Payment ID:", paymentId);
    
    const eventSource = new EventSource(sseUrl);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("[SSE] Conexão estabelecida");
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        // Ignora mensagens que não são JSON (como "sample data")
        if (!event.data || event.data === "sample data" || !event.data.startsWith("{")) {
          console.log("[SSE] Ignorando mensagem não-JSON:", event.data);
          return;
        }

        const data: SSEPaymentData = JSON.parse(event.data);
        console.log("[SSE] Mensagem recebida:", data);

        // Verifica se é uma atualização de pagamento e se é do nosso pagamento
        if (data.action === "payment.updated" && Number(data.data.id) === paymentId) {
          console.log("[SSE] Pagamento confirmado!", data);
          onPaymentConfirmed();
          
          // Fecha a conexão após confirmar o pagamento
          eventSource.close();
        }
      } catch (error) {
        console.error("[SSE] Erro ao processar mensagem:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("[SSE] Erro na conexão:", error);
      setIsConnected(false);
      eventSource.close();
    };

    // Cleanup: fecha a conexão quando o componente desmontar
    return () => {
      console.log("[SSE] Fechando conexão...");
      eventSource.close();
      setIsConnected(false);
    };
  }, [paymentId, onPaymentConfirmed]);

  return { isConnected };
}

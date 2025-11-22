#!/bin/bash

# Script para testar o webhook do MercadoPago localmente
# Uso: ./test-webhook.sh <payment_id>

PAYMENT_ID=${1:-1325448868}

echo "🔔 Simulando webhook do MercadoPago para pagamento ID: $PAYMENT_ID"
echo ""

curl -X POST http://localhost:4000/payment/webhook \
  -H "Content-Type: application/json" \
  -d "{
    \"action\": \"payment.updated\",
    \"data\": {
      \"id\": \"$PAYMENT_ID\"
    }
  }"

echo ""
echo "✅ Webhook enviado com sucesso!"

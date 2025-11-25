import { DynamoDb } from '../../client/dynamo'
import { DynamoPaymentRepository } from '../../repositories/dynamo/dynamo-payment-repository'
import { CheckPaymentStatusUseCase } from '../check-payment-status'

export function makeCheckPaymentStatusUseCase() {
  const paymentRepository = new DynamoPaymentRepository(
    DynamoDb,
    'PaymentRecords'
  )
  return new CheckPaymentStatusUseCase(paymentRepository)
}

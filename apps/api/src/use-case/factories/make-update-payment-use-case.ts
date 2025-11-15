import { DynamoDb } from '../../client/dynamo'
import { UpdatePaymentUseCase } from '../update-payment'
import { DynamoPaymentRepository } from '../../repositories/dynamo/dynamo-payment-repository'

export function makeUpdatePaymentUseCase(): UpdatePaymentUseCase {
  const paymentRepository = new DynamoPaymentRepository(
    DynamoDb,
    'PaymentRecords'
  )
  const useCase = new UpdatePaymentUseCase(paymentRepository)
  return useCase
}

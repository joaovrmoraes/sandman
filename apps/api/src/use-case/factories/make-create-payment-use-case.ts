import { DynamoDb } from '../../client/dynamo'
import { CreatePaymentUseCase } from '../create-payment'
import { DynamoPaymentRepository } from '../../repositories/dynamo/dynamo-payment-repository'

export function makeCreatePaymentUseCase(): CreatePaymentUseCase {
  const paymentRepository = new DynamoPaymentRepository(
    DynamoDb,
    'PaymentRecords'
  )
  const useCase = new CreatePaymentUseCase(paymentRepository)
  return useCase
}

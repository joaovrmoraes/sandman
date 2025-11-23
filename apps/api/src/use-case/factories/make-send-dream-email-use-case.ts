import { getDynamoClient } from '../../client/dynamo'
import { DynamoPaymentRepository } from '../../repositories/dynamo/dynamo-payment-repository'
import { ResendEmailProvider } from '../../repositories/provider/resend-email-provider'
import { SendDreamEmailUseCase } from '../send-dream-email'

export function makeSendDreamEmailUseCase() {
  const client = getDynamoClient()
  const tableName = process.env.DYNAMO_TABLE_NAME || 'PaymentRecords'

  const paymentRepository = new DynamoPaymentRepository(client, tableName)
  const emailRepository = new ResendEmailProvider()

  return new SendDreamEmailUseCase(paymentRepository, emailRepository)
}

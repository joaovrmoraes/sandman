import type { PaymentRepository } from '../payment-repository'
import type { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { PutItemCommand, UpdateItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb'
import type { PaymentModel } from '../../models/payment-model'

export class DynamoPaymentRepository implements PaymentRepository {
  private readonly client: DynamoDBClient
  private readonly tableName: string

  constructor(client: DynamoDBClient, tableName: string) {
    this.client = client
    this.tableName = tableName
  }

  async create({
    dreamResult,
    email,
    paymentId,
    status,
    timestamp,
    idempotencyKey,
  }: PaymentModel): Promise<void> {
    try {
      const command = new PutItemCommand({
        TableName: this.tableName,
        Item: {
          paymentId: { S: String(paymentId) },
          email: { S: email },
          status: { S: status },
          dreamResult: {
            M: {
              dreamAnalogy: { S: dreamResult.dreamAnalogy },
              luckyNumbers: {
                L: dreamResult.luckyNumbers.map(num => ({
                  M: {
                    number: { N: String(num.number) },
                    description: { S: num.description },
                  },
                })),
              },
            },
          },
          timestamp: { S: timestamp },
          idempotencyKey: { S: idempotencyKey },
        },
      })

      console.log('[DynamoDB] Saving payment:', { paymentId, email, status })
      await this.client.send(command)
      console.log('[DynamoDB] Payment saved successfully')
    } catch (error) {
      console.error('[DynamoDB] Error saving payment:', error)
      throw error
    }
  }

  async updateStatus({
    paymentId,
    status,
  }: { paymentId: number; status: string }): Promise<void> {
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: {
        paymentId: { S: String(paymentId) },
      },
      UpdateExpression: 'SET #status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': { S: status },
      },
    })

    await this.client.send(command)
  }

  async findByPaymentId(paymentId: number): Promise<PaymentModel | null> {
    try {
      const command = new GetItemCommand({
        TableName: this.tableName,
        Key: {
          paymentId: { S: String(paymentId) },
        },
      })

      const result = await this.client.send(command)

      if (!result.Item) {
        return null
      }

      return {
        paymentId: Number(result.Item.paymentId.S),
        email: result.Item.email.S!,
        status: result.Item.status.S!,
        timestamp: result.Item.timestamp.S!,
        idempotencyKey: result.Item.idempotencyKey.S!,
        dreamResult: {
          dreamAnalogy: result.Item.dreamResult.M!.dreamAnalogy.S!,
          luckyNumbers: result.Item.dreamResult.M!.luckyNumbers.L!.map(item => ({
            number: Number(item.M!.number.N),
            description: item.M!.description.S!,
          })),
        },
      }
    } catch (error) {
      console.error('[DynamoDB] Error finding payment:', error)
      throw error
    }
  }
}

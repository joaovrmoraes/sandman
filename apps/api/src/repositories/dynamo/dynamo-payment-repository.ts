import type { PaymentRepository } from '../payment-repository'
import type { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { PutItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
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
  }: PaymentModel): Promise<void> {
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: {
        paymentId: { S: String(paymentId) },
        email: { S: email },
        status: { S: status },
        dreamResult: {
          M: Object.entries(dreamResult).reduce(
            (acc, [key, value]) => {
              acc[key] = { S: String(value) }
              return acc
            },
            {} as Record<string, { S: string }>
          ),
        },
        timestamp: { S: timestamp },
      },
    })

    await this.client.send(command)
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
}

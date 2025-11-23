import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import dotenv from 'dotenv'

dotenv.config()

const client = new DynamoDBClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET || '',
  },
})

export const DynamoDb = client

export function getDynamoClient() {
  return client
}

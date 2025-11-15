import axios from 'axios'
import type { MessageModel } from '../../models/message-model'
import type { DreamRepository } from '../dream-repository'

export class GptProvider implements DreamRepository {
  async getDreamNumber(message: MessageModel[]) {
    const apiKey = process.env.OPENAI_API_KEY
    const apiUrl = 'https://api.openai.com/v1/chat/completions'

    try {
      const response = await axios.post(
        apiUrl,
        {
          model: 'gpt-4o-mini',
          messages: message,
          max_tokens: 500,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )

      return JSON.parse(response.data?.choices[0]?.message?.content)
    } catch (error) {
      console.error(
        'Error sending message to ChatGPT:',
        error.response ? error.response.data : error.message
      )
      throw error
    }
  }
}

import type { DreamModel } from '../models/dream-model'
import type { DreamRepository } from '../repositories/dream-repository'

export class GetDreamNumbers {
  constructor(private readonly dreamRepository: DreamRepository) {}

  async execute({
    totalNumber,
    numberRange,
    userMessage,
  }: {
    totalNumber?: number
    numberRange: [number, number]
    userMessage: string
  }): Promise<DreamModel> {
    const message = [
      {
        role: 'system',
        content: `
          You are a mystical dream consultant. Reply only with a single compact JSON object exactly in this form:
          {"dreamAnalogy": string, "luckyNumbers": [{"number": number, "description": string}]}

          Rules:
          - Language: Brazilian Portuguese.
          - Tone: polished, poetic and mysterious (mystic). Use gentle, evocative language.
          - dreamAnalogy: 1–2 short sentences, prefer 2 lyrical sentence, max 50 words.
          - luckyNumbers: return exactly ${totalNumber} items. Each "number" must be an integer between ${numberRange[0]} and ${numberRange[1]}. Each "description" 1 words, evocative (no punctuation).
          - No extra fields, no explanations, no surrounding text or code fences.
          - Output compact valid JSON only (no comments, no line breaks inside values).
          - Keep response concise and within ~160 tokens.
        `,
        //  `
        //   You are a dream consultant, and you will provide a brief summary of the meaning of a person's dream and with it ${totalNumber} numbers from ${numberRange[0]} to ${numberRange[1]},
        //   returning only a json structured as follows {dreamAnalogy: string, luckyNumbers: {number: number, description: string}[]} and will respond in Brazilian Portuguese,
        //   all this in up to 450 tokens, extremely important to respect the limit of tokens and json format, return just the json format.
        // `,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ]

    return this.dreamRepository.getDreamNumber(message)
  }
}

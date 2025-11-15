import { api } from "@/lib/api"
import { z } from "zod"

const dreamPostRequestSchema = z.object({
    body: z.object({
        userMessage: z.string().min(1).max(256),
        totalNumber: z.number().optional().default(6),
        numberRange: z
            .tuple([z.number(), z.number()])
            .optional()
            .default([1, 60]),
    })
})

const dreamPostResponseSchema = z.object({
    dreamAnalogy: z.string(),
    luckyNumbers: z.array(
        z.object({
            description: z.string(),
            number: z.number(),
        })
    ),
})

export type DreamPostRequest = z.infer<typeof dreamPostRequestSchema>

export type DreamPostResponse = z.infer<typeof dreamPostResponseSchema>

export async function DreamPost({
    userMessage,
    totalNumber,
    numberRange,
}: DreamPostRequest["body"]): Promise<DreamPostResponse> {
    try {
        const response = await api.post("/dreams/numbers", {
            userMessage,
            totalNumber,
            numberRange,
        })

        return dreamPostResponseSchema.parse(response.data)
    } catch (error) {
        console.log(error)
    }
}
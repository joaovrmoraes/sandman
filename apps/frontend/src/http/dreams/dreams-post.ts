import { z } from "zod"
import { apiIsntance } from "@/lib/axios"

const DreamsPostSchema = z.object({
    body: z.object({
        userMessage: z.string().min(1).max(500),
        totalNumber: z.number().optional().default(6),
        numberRange: z.tuple([z.number(), z.number()]).optional().default([1, 60]),
    }),
})

export type DreamPostRequest = z.infer<typeof DreamsPostSchema>

export interface DreamPostResponse {
    dreamAnalogy: string
    luckyNumbers: {
        number: number
        description: string
    }[]
}

export async function DreamPost({
    body
}: DreamPostRequest): Promise<DreamPostResponse> {
    try {
        const response = await apiIsntance.post<DreamPostResponse>(
            "/dreams/numbers",
            body
        )
        
        return response.data
    } catch (error) {
        console.log("Error in DreamPost:", error)

        throw new Error("Failed to fetch dream interpretation.")
    }
}
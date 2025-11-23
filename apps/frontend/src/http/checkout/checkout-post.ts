import { z } from "zod"
import { apiIsntance } from "@/lib/axios"

const CheckoutPostSchema = z.object({
    body: z.object({
        email: z.string().email(),
        dreamResult: z.object({
            dreamAnalogy: z.string(),
            luckyNumbers: z.array(
                z.object({
                    number: z.number(),
                    description: z.string(),
                })
            ),
        }),
    }),
})

export type CheckoutPostRequest = z.infer<typeof CheckoutPostSchema>

export async function CheckoutPost({body}: CheckoutPostRequest) {
    try {
        
        const response = await apiIsntance.post("/payment/checkout", body)
        
        return response.data
    } catch (error: unknown) {
        console.error("Error in CheckoutPost:", error)
        
        // Tenta extrair a mensagem de erro do backend
        const axiosError = error as { response?: { data?: { error?: string; details?: string } }; message?: string }
        const errorMessage = axiosError.response?.data?.error || 
                           axiosError.response?.data?.details || 
                           axiosError.message || 
                           "Failed to process checkout."
        
        throw new Error(errorMessage)
    }
}
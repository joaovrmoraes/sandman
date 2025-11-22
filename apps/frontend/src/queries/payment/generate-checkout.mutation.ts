import { useMutation } from "@tanstack/react-query";
import { CheckoutPost } from "@/http/checkout/checkout-post"

interface UseGenerateCheckoutParams {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}

export const UseGenerateCheckoutMutation = (params: UseGenerateCheckoutParams) => {
    const mutation = useMutation({
        mutationFn: CheckoutPost,
        onSuccess: (response) => {
            params.onSuccess?.(response);
        },
        onError: (error: Error) => {
            params.onError?.(error);
        },
    })

    return mutation
}
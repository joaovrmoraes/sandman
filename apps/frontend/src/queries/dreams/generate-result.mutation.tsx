import { useMutation } from "@tanstack/react-query"
import { DreamPost,  DreamPostResponse} from "@/http/dreams/dream-post"

interface UseGenerateDreamNumbersResultParams {
    onSuccess?: (data: DreamPostResponse) => void
    onError?: (error: unknown) => void
}

export const useGenerateDreamNumbersResult = ({
    onSuccess,
    onError,
}: UseGenerateDreamNumbersResultParams) => {
    const mutation = useMutation({
        mutationFn: DreamPost,
        onSuccess: (response) => {
            onSuccess(response)
        },
        onError: (error) => {
            onError(error)
        },
    })

    return mutation
}
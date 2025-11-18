import { useMutation } from "@tanstack/react-query";
import { DreamPost, DreamPostResponse } from "@/http/dreams/dreams-post"

interface UseGenerateDreamParams {
    onSuccess?: (data: DreamPostResponse) => void;
    onError?: (error: Error) => void;
}

export const UseGenerateDreamParams = (params: UseGenerateDreamParams) => {
    const mutation = useMutation({
        mutationFn: DreamPost,
        onSuccess: (response) => {
            params.onSuccess?.(response);
        },
        onError: (error: Error) => {
            params.onError?.(error);
        },
    })

    return mutation
};
    
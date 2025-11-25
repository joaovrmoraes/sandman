import { apiIsntance } from "@/lib/axios";

interface CheckPaymentStatusParams {
  paymentId: number;
}

interface CheckPaymentStatusResponse {
  status: string;
  paid: boolean;
}

export async function CheckPaymentStatusGet({
  paymentId,
}: CheckPaymentStatusParams): Promise<CheckPaymentStatusResponse> {
  try {
    const response = await apiIsntance.get(`/payment/status/${paymentId}`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error in CheckPaymentStatusGet:", error);

    const axiosError = error as {
      response?: { data?: { error?: string }; status?: number };
      message?: string;
    };

    if (axiosError.response?.status === 404) {
      throw new Error("Payment not found");
    }

    const errorMessage =
      axiosError.response?.data?.error ||
      axiosError.message ||
      "Failed to check payment status.";

    throw new Error(errorMessage);
  }
}

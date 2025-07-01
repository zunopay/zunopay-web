import { fetchPayment, fetchReceiver } from "@/lib/api/payment/queries"
import { GetReceiverParams } from "@/models/payment/params"
import { useQuery } from "@tanstack/react-query"
import { paymentKeys } from "./paymentKeys"

export const useFetchReceiver = (params: GetReceiverParams) => {
    return useQuery({
      queryFn: () => fetchReceiver(params),
      queryKey: paymentKeys.getReceiver(),
      staleTime: 1000 * 5
    })
}

export const useFetchPayment = (id: string) => {
  return useQuery({
    queryFn: () => fetchPayment(id),
    queryKey: paymentKeys.getReceiver(),
    staleTime: 1000 * 5
  })
}

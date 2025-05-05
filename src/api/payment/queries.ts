import { fetchReceiver } from "@/lib/api/payment/queries"
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
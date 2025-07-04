import { useQuery } from "@tanstack/react-query"
import { fetchPayment } from "."
import { paymentKeys } from "./keys"


export const useFetchPayment = (id: string) => {
  return useQuery({
    queryFn: () => fetchPayment(id),
    queryKey: paymentKeys.getPayment(),
    staleTime: 1000 * 5
  })
}

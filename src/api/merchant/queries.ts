import { useQuery } from "@tanstack/react-query"
import { fetchMerchants } from "@/lib/api/merchant/queries"
import { merchantKeys } from "./merchantKeys"

export const useFetchMerchants = () => {
    return useQuery({
      queryFn: () => fetchMerchants(),
      queryKey: merchantKeys.getMerchants(),
      staleTime: 1000 * 5
    })
}
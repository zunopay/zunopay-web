import { useQuery } from "@tanstack/react-query"
import { fetchShops } from "@/lib/api/shop/queries"
import { shopKeys } from "./shopKeys"

export const useFetchShops = () => {
    return useQuery({
      queryFn: () => fetchShops(),
      queryKey: shopKeys.getShops(),
      staleTime: 1000 * 5
    })
}
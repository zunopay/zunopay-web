import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchShops, registerShop } from "@/lib/api/shop/queries"
import { shopKeys } from "./shopKeys"
import { RegisterShopBody } from "@/models/shop"

export const useFetchShops = () => {
    return useQuery({
      queryFn: () => fetchShops(),
      queryKey: shopKeys.getShops(),
      staleTime: 1000 * 5
    })
}

export const useRegisterShop = () => {
  return useMutation({
    mutationFn: (body: RegisterShopBody) => registerShop(body),
    onSuccess: ({ errorMessage }) => {

    },
  })
}
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchShops, registerShop, updateShop } from "@/lib/api/shop/queries"
import { shopKeys } from "./shopKeys"

export const useFetchShops = () => {
    return useQuery({
      queryFn: () => fetchShops(),
      queryKey: shopKeys.getShops(),
      staleTime: 1000 * 5
    })
}

export const useRegisterShop = () => {
  return useMutation({
    mutationFn: (formData: FormData) => registerShop(formData),
  })
}

export const useUpdateShop = () => {
  return useMutation({
    mutationFn: (formData: FormData) => updateShop(formData),
  })
}
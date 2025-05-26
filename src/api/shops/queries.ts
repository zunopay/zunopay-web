import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchShops, fetchUserShop, onboardShop, registerShop, updateShop } from "@/lib/api/shop/queries"
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

export const useOnboardShop = () => {
  return useMutation({
    mutationFn: (data: {username: string, formData: FormData}) => onboardShop(data.username, data.formData),
  })
}

export const useUpdateShop = () => {
  return useMutation({
    mutationFn: (formData: FormData) => updateShop(formData),
  })
}

export const useFetchUserShop = () => {
  return useQuery({
    queryKey: shopKeys.getUserShop(),
    queryFn: () => fetchUserShop(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false
  });
};
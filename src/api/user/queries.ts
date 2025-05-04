import { fetchBalance, fetchMe, fetchRewardPoints } from '@/lib/api/user/queries'
import { useQuery } from '@tanstack/react-query'
import { userKeys } from './userKeys'
import { fetchReceiver } from '@/lib/api/payment/queries'
import { GetReceiverParams } from '@/models/payment/params'

export const useFetchBalance = () => {
  return useQuery({
    queryFn: () => fetchBalance(),
    queryKey: userKeys.getBalance(),
    staleTime: 1000 * 5
  })
}

export const useFetchRewardPoints = () => {
  return useQuery({
    queryFn: () => fetchRewardPoints(),
    queryKey: userKeys.getRewardPoints(),
    staleTime: 1000 * 60 * 24
  })
}

export const useFetchMe = () => {
  return useQuery({
    queryFn: () => fetchMe(),
    queryKey: userKeys.getMe(),
    staleTime: 1000 * 5
  })
}

export const useFetchReceiver = (params: GetReceiverParams) => {
  return useQuery({
    queryFn: () => fetchReceiver(params),
    queryKey: userKeys.getReceiver(),
    staleTime: 1000 * 5
  })
}

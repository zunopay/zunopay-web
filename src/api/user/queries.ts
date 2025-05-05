import { connectVpa, fetchBalance, fetchConnectedVpa, fetchMe, fetchRewardPoints } from '@/lib/api/user/queries'
import { useMutation, useQuery } from '@tanstack/react-query'
import { userKeys } from './userKeys'
import { ConnectBank } from '@/models/user'
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'

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

export const useFetchConnectedVpa = () => {
  return useQuery({
    queryFn: () => fetchConnectedVpa(),
    queryKey: userKeys.getConnectedVpa(),
    staleTime: 5*1000
  })
}


export const useConnectVpa = () => {
  const { refresh } = useRouter()

  return useMutation({
    mutationFn: (body: ConnectBank) => connectVpa(body),
    onSuccess: ({ errorMessage }) => {
      toast({
        description: errorMessage,
        variant: !!errorMessage ? 'error' : 'success',
      })
      if (!errorMessage) {
        refresh()
      }
    },
  })
}

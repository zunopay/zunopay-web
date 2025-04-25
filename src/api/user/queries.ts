import { fetchBalance } from '@/lib/api/user/queries'
import { useQuery } from '@tanstack/react-query'
import { userKeys } from './userKeys'

export const useFetchBalance = () => {
  return useQuery({
    queryFn: () => fetchBalance(),
    queryKey: userKeys.getBalance(),
    staleTime: 1000 * 5
  })
}

import {
  fetchBalance,
  fetchMe,
  fetchMerchant,
  fetchMerchants,
  fetchRewardPoints,
  fetchRoyaltyEarned,
} from "./index";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "./keys";

export const useFetchBalance = () => {
  return useQuery({
    queryFn: () => fetchBalance(),
    queryKey: userKeys.getBalance(),
    staleTime: 1000 * 5,
  });
};

export const useFetchRewardPoints = () => {
  return useQuery({
    queryFn: () => fetchRewardPoints(),
    queryKey: userKeys.getRewardPoints(),
    staleTime: 1000 * 60 * 24,
  });
};

export const useFetchMe = () => {
  return useQuery({
    queryFn: () => fetchMe(),
    queryKey: userKeys.getMe(),
    staleTime: 1000 * 5,
  });
};

export const useFetchRoyaltyEarned = () => {
  return useQuery({
    queryFn: () => fetchRoyaltyEarned(),
    queryKey: userKeys.getRoyaltyEarned(),
    staleTime: 1000 * 5,
  });
};

export const useFetchMerchants = () => {
  return useQuery({
    queryFn: () => fetchMerchants(),
    queryKey: userKeys.getMerchants(),
    staleTime: 1000 * 5
  })
}

export const useFetchMerchant = (slug: string) => {
  return useQuery({
    queryFn: () => fetchMerchant(slug),
    queryKey: userKeys.getMerchant(slug),
    staleTime: 1000 * 5
  })
}
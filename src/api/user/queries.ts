import {
  fetchBalance,
  fetchMe,
  fetchRewardPoints,
  fetchRoyaltyEarned,
  verifyEmail,
} from "@/lib/api/user/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userKeys } from "./userKeys";

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

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: () => verifyEmail(),
  });
};

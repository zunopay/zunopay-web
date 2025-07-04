import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from ".";

export const useVerifyEmail = () => {
    return useMutation({
      mutationFn: () => verifyEmail(),
    });
  };
  
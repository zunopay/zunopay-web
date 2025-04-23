import { fetchBalance } from "@/api/user/queries";
import { useEffect, useState } from "react";

export function useFetchBalance() {
  const [balance, setBalance] = useState<string>("--");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const {data: balance} = await fetchBalance();
        setBalance(balance || "0");
      } catch (err) {
        console.error(err)
        setError("Failed to fetch balance");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { balance, isLoading, error };
}

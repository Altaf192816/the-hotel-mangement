import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabin";

export function useCabins() {
  //useQuery is used to fetch data and have other functionality and states
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],//queryKey can be use to get data in different page without refetching the data.here "cabin" is the key
    queryFn: getCabin,
  });
  return { error, isLoading, cabins };
}

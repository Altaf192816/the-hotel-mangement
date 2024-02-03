import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDateTillToday } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const queryDays = subDays(new Date(), numDays).toISOString();
  
  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDateTillToday(queryDays),
    queryKey: ["bookings", `last-${numDays}`],
  });
  return { bookings, isLoading,numDays };
}

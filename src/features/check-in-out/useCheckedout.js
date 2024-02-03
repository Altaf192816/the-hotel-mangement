import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckedout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess(data) {
      toast.success(`Booking #${data.id} sucessfully checked out`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError() {
      toast.error("There was an error while checking out");
    },
  });
  return { checkout, isCheckingout };
}

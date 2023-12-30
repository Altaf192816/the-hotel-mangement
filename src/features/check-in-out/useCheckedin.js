import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckedin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({bookingId,breakfast}) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess(data) {
      toast.success(`Booking #${data.id} sucessfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError() {
      toast.error("There was an error while checking in");
    },
  });
  return {checkin,isCheckingIn};
}

  

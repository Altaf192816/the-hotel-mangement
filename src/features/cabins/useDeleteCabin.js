import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi} from "../../services/apiCabin";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  //useMutation hook is used to do mutation on remote state
  const { isLoading: isDeleting, mutate:deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Sucessfully delete the cabin");
      //invalidating the query will fetch the data again
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return {isDeleting,deleteCabin};
}



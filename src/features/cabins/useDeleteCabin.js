import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabin";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  //useMutation hook is used to do mutation on remote state
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi, // same as writing this mutationFn : (id)=>deleteCabinApi(id),
    //onSuccess function will excute on sucessfull mutation of data on server 
    onSuccess: () => {
      toast.success("Sucessfully delete the cabin");
      //invalidating the query will fetch the data again and ui get updated
      queryClient.invalidateQueries({
        queryKey: ["cabins"],//using queryKey to tell queryClient which data has to invalidate
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}

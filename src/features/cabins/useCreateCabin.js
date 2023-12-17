import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient();
    //mutation hook for creating cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin is sucessfully created");//toast is from react-toast
      queryClient.invalidateQueries({ queryKey: ["cabins"] });//imediatiley invalidating data after creating and editing
    },
    onError: (err) => toast.error(err.message),
  });
  return {createCabin,isCreating};
}



import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  //mutation hook for setting
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting sucessfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateSetting, isUpdating };
}


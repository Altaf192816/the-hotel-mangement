import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);//storing manually data in cache
      navigate("/dashboard",{replace:true});
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email and password is incorrect");
    },
  });
  return { login, isLoading };
}

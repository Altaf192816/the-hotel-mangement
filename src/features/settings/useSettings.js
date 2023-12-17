import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    error,
    isLoading: isSetting,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isSetting, settings, error };
}

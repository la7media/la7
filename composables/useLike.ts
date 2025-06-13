import { useLocalStorage } from "@vueuse/core";

export const useLike = () => {
  const filterLike = useLocalStorage("filterLike", () => false);
  const toggleFilterLike = () => {
    filterLike.value = !filterLike.value;
  };
  return {
    filterLike,
    toggleFilterLike,
  };
};

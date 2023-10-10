import { create } from "zustand";

const useSearchFilter = create((set) => ({
    search: "",
    addSearch: (value) => set((state) => ({ search: value })),
    removeSearch: () => set(search = ""),
}));

export default useSearchFilter;
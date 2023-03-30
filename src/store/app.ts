import { create } from "zustand";
import request from "@/utils/request";

interface AppStoreState {
  url: string;
  fetchMock: () => Promise<MockData>;
}

const useAppStore = create<AppStoreState>()((_, get) => ({
  url: "/api/mock",
  fetchMock: async () => {
    return await request<MockData>(get().url);
  },
}));

export default useAppStore;
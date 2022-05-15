import create, { SetState } from 'zustand';

type useSearchState = {
  search: string;
  setSearch: (search: string) => void;
};

export const useSearch = create((set: SetState<useSearchState>) => ({
  search: '',
  setSearch: (search: string) => set({ search }),
}));

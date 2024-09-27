import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/shared/api";
import { useDispatch, useSelector } from "react-redux";

interface AppSliceInitialState {
  branch?: number;
  isMenuOpen: boolean;
}

const initialState: AppSliceInitialState = {
  branch: undefined,
  isMenuOpen: true,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setBranch(state, action: PayloadAction<number>) {
      state.branch = action.payload;
    },
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { setBranch, toggleMenu } = appSlice.actions;

export const appSelectors = {
  getBranch: (state: RootState) => state[appSlice.name].branch,
  getMenu: (state: RootState) => state[appSlice.name].isMenuOpen,
};

export const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

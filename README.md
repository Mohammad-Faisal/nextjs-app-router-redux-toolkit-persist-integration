# How to setup redux tooling with redux persist in NextJS

## Install dependencies

```sh
yarn add @reduxjs/toolkit react-redux redux-persist
```

## Create a slice

```ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  authState: boolean;
}

const initialState: IAuthState = {
  authState: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;
```

## Create the store

```ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "@/store/authSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["authState"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Create the provider

```tsx
import { Provider } from "react-redux";
import { store } from "./index";
import { persistStore } from "redux-persist";

persistStore(store);
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
```

Then wrap the app with the provider

```tsx
"use client";
import ReduxProvider from "@/store/redux-provider";
import AuthUpdater from "./auth-updater";
import AuthViewer from "./auth-viewer";

export default function Home() {
  return (
    <ReduxProvider>
      <main className="w-full h-screen grid md:grid-cols-2 place-items-center">
        <AuthUpdater />
        <AuthViewer />
      </main>
    </ReduxProvider>
  );
}
```

## Access the store

```tsx
import React from "react";
import { useAppSelector } from "@/store";

const AuthViewer = () => {
  const authState = useAppSelector((state) => state.auth.authState);

  return (
    <div className="flex gap border border-1 border-black p-20">
      You are now {authState ? "Logged  In" : "Logged Out"}
    </div>
  );
};

export default AuthViewer;
```

## Update the store

```tsx
import React from "react";
import { setAuthState } from "@/store/authSlice";
import { useAppDispatch } from "@/store";

const AuthUpdater = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-4 border border-1 border-black p-20">
      <button
        className="p-4 border border-1 border-black hover:bg-gray-300"
        onClick={() => dispatch(setAuthState(true))}
      >
        Log in
      </button>
      <button
        className="p-4 border border-1 border-black hover:bg-gray-300"
        onClick={() => dispatch(setAuthState(false))}
      >
        Log out
      </button>
    </div>
  );
};

export default AuthUpdater;
```

That's it. Now you can use redux tooling with redux persist in NextJS

![ScreenRecording2024-01-28at03 33 04-ezgif com-video-to-gif-converter](https://github.com/Mohammad-Faisal/nextjs-app-router-redux-toolkit-persist-integration/assets/22127944/fe283b99-8160-4d83-a8c4-6308397b73dd)


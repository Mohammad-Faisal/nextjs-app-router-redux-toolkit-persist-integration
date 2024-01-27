"use client";
import ReduxProvider from "@/store/redux-provider";
import AuthUpdater from "./auth-updater";
import AuthViewer from "./auth-viewer";

export default function Home() {
  return (
    <ReduxProvider>
      <main className="w-full  grid grid-cols-2 place-items-center">
        <AuthUpdater />
        <AuthViewer />
      </main>
    </ReduxProvider>
  );
}

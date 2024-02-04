import AuthUpdater from "./auth-updater";
import AuthViewer from "./auth-viewer";

export default async function Home() {

  console.log("serverside rendering");

  return (
    <main className="w-full h-screen grid md:grid-cols-2 place-items-center">
      <AuthUpdater />
      <AuthViewer />
    </main>
  );
}

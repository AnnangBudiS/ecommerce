import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function PageLayout() {
  return (
    <>
      <header className="bg-white shadow">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routes/AppRouter.tsx";
import { RouterProvider } from "react-router-dom";
import UserProvider from "./providers/UserProvider.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster />
    </UserProvider>
  </StrictMode>
);

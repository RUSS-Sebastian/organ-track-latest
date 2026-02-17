import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext";
import { OrganProvider } from "./context/OrganContext.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <OrganProvider>
        <App />
      </OrganProvider>
    </UserProvider>
  </StrictMode>,
);

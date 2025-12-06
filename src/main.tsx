import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeGTM } from "./utils/gtm";

// Initialize Google Tag Manager
initializeGTM();

createRoot(document.getElementById("root")!).render(<App />);

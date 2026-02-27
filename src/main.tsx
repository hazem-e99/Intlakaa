import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeDynamicSEO } from "./utils/dynamicSeo";

// Initialize Dynamic SEO (Meta tags & Pixels)
initializeDynamicSEO();

createRoot(document.getElementById("root")!).render(<App />);

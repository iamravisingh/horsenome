import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./reset.css";
import App from "./App.tsx";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <App />
      </motion.div>
    </ThemeProvider>
  </StrictMode>
);

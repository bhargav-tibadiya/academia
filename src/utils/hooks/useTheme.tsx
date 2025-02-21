// Packages
import { useState, useEffect } from "react";

const useTheme = () => {
  // Hooks
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Apply theme class to the RootContainer
  useEffect(() => {
    const rootContainer = document.querySelector(".RootContainer");
    if (rootContainer) {
      rootContainer.classList.remove("light", "dark");
      rootContainer.classList.add(theme);
    }

    // Save preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};

export default useTheme;

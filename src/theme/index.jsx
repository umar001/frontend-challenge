import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { teal } from "@mui/material/colors";
import React, { createContext, useEffect, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import darkTheme from "./dark";
import lightTheme from "./light";

export const ThemeModeContext = createContext({ toggleColorMode: () => {} });
const DARK_SCHEME_QUERY = "(prefers-color-scheme: light)";
export default function CustomThemeProvider({ children }) {
  const isDarkOS = useMediaQuery(DARK_SCHEME_QUERY);
  // const [mode, setMode] = useState<"light" | "dark">("light");
  const [mode, setMode] = useLocalStorage("themeMode", "light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

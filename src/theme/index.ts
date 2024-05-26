import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#161C24", paper: "#212B36" },
    primary: { main: "#00A76F" },
    secondary: { main: "#8E33FF" },
    info: { main: "#00B8D9" },
    success: { main: "#22C55E" },
    warning: { main: "#FFAB00" },
    error: { main: "#FF5630" },
  },
});

export { theme };

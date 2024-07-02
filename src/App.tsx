import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

import { store } from "./store";
import { theme } from "./theme";
import { NotificationBar } from "./components/Notification";
import { AppRoutes } from "./routes";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NotificationBar />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;

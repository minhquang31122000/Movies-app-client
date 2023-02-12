import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PageWrapper } from "components/common";
import MainLayout from "layout/MainLayout";
import THEME_CONFIGS from "configs/theme.configs";
import ROUTES from "routes";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    <ThemeProvider theme={THEME_CONFIGS.custom({ mode: themeMode })}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />

      {/* mui reset css*/}
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {ROUTES.map((route, index) =>
              route.index ? (
                <Route
                  key={index}
                  index
                  element={
                    route?.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      <>{route.element}</>
                    )
                  }
                />
              ) : (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    route?.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      <>{route.element}</>
                    )
                  }
                />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "./app/store";
import { muiTheme } from "./theme/muiTheme";
import App from "./App";
import { Loading } from "./components";
import "./i18n";
import "./index.css";

import { Home, Menu, Cart, Checkout, OrderSuccess, NotFound, Payment, OrderStatus, WaitingOrder } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "order-status",
        element: <OrderStatus />,
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
      {
        path: "waiting-order",
        element: <WaitingOrder />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
    ],
  },
]);

Sentry.init({
  dsn: "https://cfbaf0e1c975451492632826b9a2b502@o4504287293276160.ingest.sentry.io/4504287399641088",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  </Provider>
);

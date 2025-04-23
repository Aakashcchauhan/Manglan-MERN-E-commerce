import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import store from "./redux/store";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider>
    <Auth0Provider
      domain="dev-06230h30f24vu86s.us.auth0.com"
      clientId="LxVKJl3W99aOmu4CB3KzVfDWccXHCJJr"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </ThemeProvider>
);

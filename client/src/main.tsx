import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { store } from "./app/store";
import { GlobalStyle } from "./styles/GlobalStyle";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <FluentProvider theme={webLightTheme}>
        <GlobalStyle />
        <App />
      </FluentProvider>
    </Provider>
  </React.StrictMode>
);
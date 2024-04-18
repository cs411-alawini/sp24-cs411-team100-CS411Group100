import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import {
  redirectToLogin
} from "./components/Authorization";
import "./i18n";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

const ProgressIndicator = lazy(
  () => import("./components/Common/UI/ProgressIndicator")
);

const isAuthorized = true

if (isAuthorized) {
  /*
    * User token is available in local storage
    * Or is available in the query params
    */
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <Suspense fallback={<ProgressIndicator />}>
        <Provider store={store}>
          <App />
        </Provider>
      </Suspense>
    </React.StrictMode>
  );
} else {
  redirectToLogin();
}
// If you want to start measuring performance in your app, pass a function
// to log results
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

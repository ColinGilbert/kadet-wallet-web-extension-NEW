import React from "react";
import { createRoot } from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
import "@pages/popup/index.css";
import "@assets/styles/tailwind.css";
import Popup from "@pages/popup/Popup";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
function init() {
  const rootContainer = document.querySelector("#__root");
  console.log("rootContainer");
  if (!rootContainer) throw new Error("Can't find Popup root element");
  const root = createRoot(rootContainer);
  root.render(
    <Provider store={store}>
      <Popup />
    </Provider>
  );
}

init();

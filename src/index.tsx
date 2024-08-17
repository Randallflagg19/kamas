import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/reduxStore";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
let rerenderTree = (state: any) => {
  // debugger
  root.render(
    <BrowserRouter>
      <React.StrictMode>
        <App
          state={store.getState()}
          dispatch={store.dispatch.bind(store)}
          store={store}
        />
      </React.StrictMode>
    </BrowserRouter>
  );
};

rerenderTree(store.getState());

store.subscribe(() => {
  let state = store.getState()
  rerenderTree(state)
});

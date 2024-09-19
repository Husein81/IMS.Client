import ReactDOM from "react-dom/client";
import "./app/layout/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/Routes";
import { Provider } from "react-redux";
import { store } from "./app/redux/Store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
//   console.log(message)
// })

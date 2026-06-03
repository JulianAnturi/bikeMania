import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)
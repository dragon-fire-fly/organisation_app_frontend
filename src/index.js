import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";

const supabase = createClient(
  "https://kckvhjrrosiqgfccjstt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtja3ZoanJyb3NpcWdmY2Nqc3R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxNDQ2NDMsImV4cCI6MTk5OTcyMDY0M30.vH55p7swuOFz3w6cMMO6NtcB_3-MCDbJGVLwkdk3vh8"
);

ReactDOM.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <App />
      </Router>
    </SessionContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

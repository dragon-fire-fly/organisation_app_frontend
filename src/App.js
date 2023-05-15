import "./App.css";
import "./api/axiosDefaults";
import axios from "axios";
import GoogleCalendarAPI from "./components/GoogleCalendarAPI";
import DemoApp from "./components/Calendar";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <GoogleCalendarAPI /> */}
      {/* <DemoApp /> */}
    </div>
  );
}

export default App;

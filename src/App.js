import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./component/home/User";
import Schedule from "./component/home/Schedule";
import CheckStatus from "./component/home/CheckStatus";
import Login from "./component/home/Login";
import Register from "./component/home/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<User />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/checkstatus" element={<CheckStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

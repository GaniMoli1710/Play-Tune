import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProfileDashboard from "./components/ProfileDashboard";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes> {/* Only Routes and Route should be here, no BrowserRouter */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileDashboard />} />
      </Routes>
    </div>
  );
};

export default App;

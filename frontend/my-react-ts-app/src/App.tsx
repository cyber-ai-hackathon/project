import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import InputForm from "./components/InputForm";
import UserPage from "./components/UserPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shokujin" element={<InputForm />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;

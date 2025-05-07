import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Clienti from "./components/Clienti";
import Fatture from "./components/Fatture";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Auth token={token} setToken={setToken} />} />
          <Route path="/clienti" element={<Clienti token={token} />} />
          <Route path="/fatture" element={<Fatture token={token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

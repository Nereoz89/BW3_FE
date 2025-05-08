import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Auth = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("api url", apiUrl);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await api.post(`${apiUrl}${endpoint}`, { username, password });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      navigate("/clienti");
    } catch (error) {
      alert(error.response?.data?.message || "Errore");
    }
  };

  if (token) {
    return (
      <div className="alert alert-success">
        Sei già autenticato. Vai alla sezione <a href="/clienti">Clienti</a>.
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Registrazione"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">
          {isLogin ? "Login" : "Registrati"}
        </button>
        <button type="button" className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Crea un account" : "Hai già un account? Login"}
        </button>
      </form>
    </div>
  );
};

export default Auth;

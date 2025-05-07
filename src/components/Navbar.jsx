import { Link } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          EPIC ENERGY
        </Link>
        {token && (
          <div className="navbar-nav">
            <Link className="nav-link" to="/clienti">
              Clienti
            </Link>
            <Link className="nav-link" to="/fatture">
              Fatture
            </Link>
            <button className="btn btn-link nav-link" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

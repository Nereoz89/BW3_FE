import { useState, useEffect } from "react";
import api from "../services/api";

const Clienti = ({ token }) => {
  const [clienti, setClienti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api
        .get("/clienti", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setClienti(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [token]);

  if (!token) {
    return <div className="alert alert-warning">Effettua il login per visualizzare i clienti</div>;
  }

  if (loading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div>
      <h2>Lista Clienti</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Ragione Sociale</th>
            <th>Email</th>
            <th>Fatturato</th>
            <th>Telefono</th>
          </tr>
        </thead>
        <tbody>
          {clienti.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.ragioneSociale}</td>
              <td>{cliente.email}</td>
              <td>{cliente.fatturatoAnnuale}</td>
              <td>{cliente.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clienti;

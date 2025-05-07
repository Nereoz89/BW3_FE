import { useState, useEffect } from "react";
import api from "../services/api";

const Fatture = ({ token }) => {
  const [fatture, setFatture] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api
        .get("/fatture", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setFatture(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [token]);

  if (!token) {
    return <div className="alert alert-warning">Effettua il login per visualizzare le fatture</div>;
  }

  if (loading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div>
      <h2>Lista Fatture</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Numero</th>
            <th>Data</th>
            <th>Importo</th>
            <th>Stato</th>
          </tr>
        </thead>
        <tbody>
          {fatture.map((fattura) => (
            <tr key={fattura.id}>
              <td>{fattura.numero}</td>
              <td>{fattura.data}</td>
              <td>{fattura.importo}</td>
              <td>{fattura.stato}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fatture;

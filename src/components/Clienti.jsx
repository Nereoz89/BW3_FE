import { useState, useEffect } from "react";
import api from "../services/api";
import { Button, Form, Modal, ModalDialog } from "react-bootstrap";

const Clienti = ({ token }) => {
  const [clienti, setClienti] = useState([]);
  const [loading, setLoading] = useState(true);

  const [ragioneSociale, setRagioneSociale] = useState("");
  const [partitaIva, setPartitaIva] = useState("");
  const [email, setEmail] = useState("");
  const [fatturatoAnnuale, setFatturatoAnnuale] = useState("");
  const [pec, setPec] = useState("");
  const [telefono, setTelefono] = useState("");
  const [emailContatto, setEmailContatto] = useState("");
  const [nomeContatto, setNomeContatto] = useState("");
  const [cognomeContatto, setCognomeContatto] = useState("");
  const [telefonoContatto, setTelefonoContatto] = useState("");
  const [logoAziendale, setLogoAziendale] = useState("");
  const [tipoCliente, setTipoCliente] = useState("");
  const [sedeLegaleId, setSedeLegaleId] = useState("");
  const [sedeOperativaId, setSedeOperativaId] = useState("");
  const [dataInserimento, setDataInserimento] = useState("");
  const [dataUltimoContatto, setDataUltimoContatto] = useState("");
  const [fatturaId, setFatturaId] = useState("");
  const [modalOn, setModalOn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("api url", apiUrl);
    try {
      const endpoint = "/api/clienti";
      const response = await api.post(`${apiUrl}${endpoint}`, {
        ragioneSociale,
        partitaIva,
        email,
        dataInserimento,
        dataUltimoContatto,
        fattureId: fatturaId
          .split(",")
          .map((id) => id.trim())
          .filter((id) => id !== "")
          .map((id) => Number(id)),
        fatturatoAnnuale: Number(fatturatoAnnuale),
        pec,
        telefono,
        emailContatto,
        nomeContatto,
        cognomeContatto,
        telefonoContatto,
        logoAziendale,
        tipoCliente,
        sedeLegaleId,
        sedeOperativaId,
      });
      console.log(response);
      setModalOn(false);
    } catch (error) {
      console.error("Submit error:", error);
      alert(error.response?.data?.message || "Errore");
    }
  };
  useEffect(() => {
    if (token) {
      api
        .get("/clienti?page=0&size=20&sort=id", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setClienti(response.data.content);
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
      <div className="d-flex justify-content-between">
        <h2>Lista Clienti</h2>
        <button className="border border-0 py-0 px-2" variant="white" onClick={() => setModalOn(true)}>
          ➕
        </button>
      </div>
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
      {modalOn && (
        <div className="modal show d-block" tabIndex="-1">
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="ragione_sociale">
                  <Form.Label>Ragione Sociale</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci la Ragione Sociale"
                    value={ragioneSociale}
                    onChange={(e) => setRagioneSociale(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="partita_iva">
                  <Form.Label>Partita IVA</Form.Label>
                  <Form.Control type="text" placeholder="Inserisci la partita iva" value={partitaIva} onChange={(e) => setPartitaIva(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Inserisci la mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="data_inserimento">
                  <Form.Label>Data di inserimento</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Inserisci la data di inserimento"
                    value={dataInserimento}
                    onChange={(e) => setDataInserimento(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="data_ultimo_contatto">
                  <Form.Label>Data di ultimo contatto</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Inserisci la data di ultimo contatto"
                    value={dataUltimoContatto}
                    onChange={(e) => setDataUltimoContatto(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fatturato_annuale">
                  <Form.Label>Fatturato annuale</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Inserisci il fatturato annuale"
                    value={fatturatoAnnuale}
                    onChange={(e) => setFatturatoAnnuale(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="pec">
                  <Form.Label>PEC</Form.Label>
                  <Form.Control type="email" placeholder="Inserisci la PEC" value={pec} onChange={(e) => setPec(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="telefono">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control type="text" placeholder="Inserisci il numero di telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email_contatto">
                  <Form.Label>Email Contatto</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Inserisci la mail del contatto"
                    value={emailContatto}
                    onChange={(e) => setEmailContatto(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="nome_contatto">
                  <Form.Label>Nome del contatto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il nome del contatto"
                    value={nomeContatto}
                    onChange={(e) => setNomeContatto(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cognome_contatto">
                  <Form.Label>Cognome del contatto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il cognome del contatto"
                    value={cognomeContatto}
                    onChange={(e) => setCognomeContatto(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="telefono_contatto">
                  <Form.Label>Telefono del contatto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci il telefono del contatto"
                    value={telefonoContatto}
                    onChange={(e) => setTelefonoContatto(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="logo_azienda">
                  <Form.Label>Logo Aziendale</Form.Label>
                  <Form.Control type="text" value={logoAziendale} onChange={(e) => setLogoAziendale(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="tipo_cliente">
                  <Form.Label>Seleziona un'opzione</Form.Label>
                  <Form.Select value={tipoCliente} onChange={(e) => setTipoCliente(e.target.value)}>
                    <option>Seleziona...</option>
                    <option value="PA">PA</option>
                    <option value="SAS">SAS</option>
                    <option value="SPA">SPA</option>
                    <option value="SRL">SRL</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="fatture_id">
                  <Form.Label>Fatture</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Inserisci il numero della fattura"
                    value={fatturaId}
                    onChange={(e) => setFatturaId(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="sede_Legale">
                  <Form.Label>Sede legale</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Inserisci l'indirizzo della sede legale"
                    value={sedeLegaleId}
                    onChange={(e) => setSedeLegaleId(Number(e.target.value))}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="sede_Operativa">
                  <Form.Label>Sede operativa</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Inserisci l'indirizzo della sede operativa"
                    value={sedeOperativaId}
                    onChange={(e) => setSedeOperativaId(Number(e.target.value))}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>

            {/*         <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer> */}
          </Modal.Dialog>
        </div>
      )}
    </div>
  );
};

export default Clienti;

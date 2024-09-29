import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Produit() {
  const [listProduis, setListProduis] = useState([
    { id: 1, nom: "Ordinateur", prix: 7490, categorie: "informatique" },
    { id: 2, nom: "imprimante", prix: 1500, categorie: "informatique" },
    { id: 3, nom: "scanner", prix: 490, categorie: "informatique" },
  ]);
  const [id, setId] = useState(0);
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");
  const [afficherFrom, setAfficherForm] = useState(false);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (id === 0) {
      const newId = new Date().getTime();
      const newProduit = { newId, nom, prix, categorie };
      setListProduis([...listProduis, newProduit]);
    } else {
      const updatedProduit = listProduis.map((prd) =>
        prd.id == id ? { ...prd, nom, prix, categorie } : prd
      );
      setListProduis(updatedProduit);
    }
    setId(0);
    setNom("");
    setPrix("");
    setCategorie("");
    setAfficherForm(false);
  };
  const handelDelete = (produit) => {
    const listProduiscopy = listProduis.filter((prd) => prd.id != produit.id);
    setListProduis(listProduiscopy);
  };
  const handelEdit = (produit) => {
    setId(produit.id);
    setNom(produit.nom);
    setPrix(produit.prix);
    setCategorie(produit.categorie);
    setAfficherForm(true);
  };

  return (
    <div className="container m-3">
      <div className="card m-3">
        <div className="card-header">
          <h1>Liste des Produits</h1>
        </div>
        <div className="ms-auto m-2">
          <button
            className="btn btn-outline-primary"
            onClick={() => setAfficherForm(!afficherFrom)}
          >
            Ajouter Produit
          </button>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix</th>
                <th>Categorie</th>
              </tr>
            </thead>
            <tbody>
              {listProduis && listProduis.length > 0
                ? listProduis.map((produit) => (
                    <tr>
                      <td>{produit.nom}</td>
                      <td>{produit.prix}</td>
                      <td>{produit.categorie}</td>
                      <td>
                        <button
                          className="btn btn-outline-success"
                          onClick={() => handelEdit(produit)}
                        >
                          edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handelDelete(produit)}
                        >
                          supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>
      {afficherFrom && (
        <div className="container">
          <div className="card">
            <form onSubmit={handelSubmit}>
              <div className="form-group m-3">
                <label className="form-label"> Nom :</label>
                <input
                  className="form-control"
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              <div className="form-group m-3">
                <label className="form-label"> Prix :</label>
                <input
                  className="form-control"
                  type="text"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                />
              </div>
              <div className="form-grou m-3">
                <label className="form-label"> Categorie :</label>
                <input
                  className="form-control"
                  type="text"
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                />
              </div>
              <div className="form-group m-3">
                <button className="btn btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

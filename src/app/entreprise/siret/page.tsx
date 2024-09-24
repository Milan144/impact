"use client";
import { SetStateAction, useState } from "react";
import Navbar from "@/app/components/navbar";
import TopBar from "@/app/components/topBar";

const SiretPage = () => {
  const [siret, setSiret] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false); // Ajout pour afficher la validation

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSiret(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setData(null);
    setValidated(false);

    try {
      const response = await fetch(`/api/siret?siret=${siret}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Erreur lors de la requête");

      const result = await response.json();
      setData(result);
      setValidated(true); // Si la requête est valide, définissez validé à true
    } catch (error) {
        setError("Aucune entreprise trouvée avec ce numéro de siret");
    }
  };

  return (
    <>
      <TopBar />
      <div className="flex flex-col items-center min-h-screen bg-gray-200">
        {/* Container principal */}
        {/* Formulaire de recherche SIRET */}
        <div className="mt-6 w-full max-w-md p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-center">
            Vérification du numéro de SIRET
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-center">
              <input
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                value={siret}
                onChange={handleChange}
                placeholder="Entrez un numéro de SIRET"
                required
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: "#90579F" }}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Valider
            </button>
          </form>

          {/* Affichage de la validation */}
          {validated && (
            <p className="text-green-500 text-center mt-4">
              Numéro de SIRET validé
            </p>
          )}

          {/* Affichage des erreurs */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Affichage des résultats */}
          {data && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
              <h2 className="text-lg font-semibold">Nom de l'entreprise</h2>
              <pre className="text-sm text-gray-700">
                {JSON.stringify(data["etablissement"]["uniteLegale"]["denominationUniteLegale"], null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default SiretPage;

"use client";
import { SetStateAction, useState } from "react";
import Navbar from "@/app/components/navbar";
import TopBar from "@/app/components/topBar";

const SignupWithSiretPage = () => {
  // State pour le SIRET
  const [siret, setSiret] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [success, setSuccess] = useState(false);

  // Gestion du changement pour le SIRET
  const handleSiretChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSiret(e.target.value);
  };

  // Gestion de la soumission pour la validation du SIRET
  const handleSiretSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setData(null);
    setValidated(false);

    try {
      const response = await fetch(`/api/siret?siret=${siret}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Erreur lors de la requête");

      const result = await response.json();
      setData(result);
      setValidated(true); // SIRET validé
    } catch (error) {
      setError("Aucune entreprise trouvée avec ce numéro de siret");
    }
  };

  // Gestion du changement pour le formulaire d'inscription
  const handleSignupChange =
    (setter: React.Dispatch<SetStateAction<string>>) =>
    (e: { target: { value: string } }) => {
      setter(e.target.value);
    };

  // Gestion de la soumission pour le formulaire d'inscription
  const handleSignupSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSignupError("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setSignupError("Les mots de passe ne correspondent pas");
      return;
    }

    // Déterminer le type d'utilisateur à partir de l'URL
    const userType = window.location.pathname.includes("/ugc/signup")
      ? "ugc"
      : "entreprise";

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, type: userType }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'inscription");

      setSuccess(true);
    } catch (error) {
      setSignupError("Erreur lors de l'inscription");
    }
  };

  return (
    <>
      <TopBar />
      <div className="flex flex-col items-center bg-gray-200">
        {/* Étape 1: Formulaire de vérification du SIRET */}
        {!validated && (
          <div className="mt-6 w-full max-w-md p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              Vérification du numéro de SIRET
            </h2>

            <form onSubmit={handleSiretSubmit} className="space-y-4">
              <div className="flex items-center justify-center">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  value={siret}
                  onChange={handleSiretChange}
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

            {error && (
              <div className="mt-4 text-center">
                <p className="text-red-500 text-center">{error}</p>
                <div className="mt-6">
                  <h1 className="mb-10">
                    Vous devez disposer d&apos;un numéro de SIRET valide pour
                    continuer. Voici quelques liens utiles pour vous aider à
                    créer votre entreprise.
                  </h1>
                  <ul className="flex flex-col items-center">
                    <li>
                      <a
                        href="https://www.service-public.fr/creation-entreprise"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 underline"
                      >
                        Service Public - Création d&apos;entreprise
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.impots.gouv.fr/portail/professionnel/creation-dentreprise"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 underline"
                      >
                        Impots.gouv.fr - Création d&apos;entreprise
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.apce.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 underline"
                      >
                        Agence France Entrepreneur - Création d&apos;entreprise
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.cci.fr/creation-entreprise"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 underline"
                      >
                        CCI - Création d&apos;entreprise
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Affichage des résultats */}
            {data && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                <h2 className="text-lg font-semibold">
                  Nom de l&apos;entreprise
                </h2>
                <pre className="text-sm text-gray-700">
                  {JSON.stringify(
                    data["etablissement"]["uniteLegale"][
                      "denominationUniteLegale"
                    ],
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </div>
        )}
        {validated && (
          <div className="mt-6 w-full max-w-md p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              Créer un compte{" "}
              {window.location.pathname.includes("/ugc/signup")
                ? "UGC"
                : "entreprise"}
            </h2>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="flex items-center justify-center">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  value={username}
                  onChange={handleSignupChange(setUsername)}
                  placeholder="Nom d'utilisateur"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="email"
                  value={email}
                  onChange={handleSignupChange(setEmail)}
                  placeholder="Adresse e-mail"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="password"
                  value={password}
                  onChange={handleSignupChange(setPassword)}
                  placeholder="Mot de passe"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="password"
                  value={confirmPassword}
                  onChange={handleSignupChange(setConfirmPassword)}
                  placeholder="Confirmer le mot de passe"
                  required
                />
              </div>

              <button
                type="submit"
                style={{ backgroundColor: "#90579F" }}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                S&apos;inscrire
              </button>
            </form>

            {/* Affichage des erreurs */}
            {signupError && (
              <p className="text-red-500 text-center mt-4">{signupError}</p>
            )}

            {/* Affichage du succès */}
            {success && (
              <p className="text-green-500 text-center mt-4">
                Inscription réussie
              </p>
            )}
          </div>
        )}
      </div>
      <Navbar />
    </>
  );
};

export default SignupWithSiretPage;

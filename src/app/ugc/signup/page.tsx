  "use client";
  import { SetStateAction, useState } from "react";
  import Navbar from "@/app/components/navbar";
  import TopBar from "@/app/components/topBar";

  const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange =
      (setter: React.Dispatch<SetStateAction<string>>) =>
      (e: { target: { value: string } }) => {
        setter(e.target.value);
      };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setError("");
      setSuccess(false);

      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }

      if (password.length < 8) {
        setError("Le mot de passe doit contenir au moins 8 caractères");
        return;
      }

      // Détermine le type d'utilisateur à partir de l'URL
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
        setError("Erreur lors de l'inscription");
      }
    };

    return (
      <>
        <TopBar />
        <div className="flex flex-col items-center bg-gray-200">
          {/* Container principal */}
          <div className="mt-6 w-full max-w-md p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
              Créer un compte UGC
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-center">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  value={username}
                  onChange={handleChange(setUsername)}
                  placeholder="Nom d'utilisateur"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="email"
                  value={email}
                  onChange={handleChange(setEmail)}
                  placeholder="Adresse e-mail"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="password"
                  value={password}
                  onChange={handleChange(setPassword)}
                  placeholder="Mot de passe"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <input
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="password"
                  value={confirmPassword}
                  onChange={handleChange(setConfirmPassword)}
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
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {/* Affichage du succès */}
            {success && (
              <p className="text-green-500 text-center mt-4">
                Inscription réussie
              </p>
            )}
          </div>
        </div>
        <Navbar />
      </>
    );
  };

  export default SignupPage;

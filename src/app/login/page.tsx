"use client";
import { useState } from "react";
import Navbar from "@/app/components/navbar";
import TopBar from "@/app/components/topBar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Get param /login?type=ugc
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");


  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Email ou mot de passe incorrect");

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = type === "ugc" ? "/ugc/offers" : "/entreprise/offers";
        }, 1000);
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch (error) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <>
      <TopBar />
      <div className="flex flex-col items-center bg-gray-200">
        <div className="mt-6 w-full max-w-md p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Connexion</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              style={{ backgroundColor: "#90579F" }}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Connexion
            </button>
          </form>

          {/* Affichage des erreurs */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Affichage du succès */}
          {success && (
            <p className="text-green-500 text-center mt-4">Connexion réussie</p>
          )}
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default LoginPage;

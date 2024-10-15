'use client';

import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import TopBar from "@/app/components/topBar";
import { checkTokenValidity, getCookie } from "../../../../lib/token"; // Import de la fonction de validation
import { useRouter } from "next/navigation";
const AddOfferPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [reward, setReward] = useState("");
  const [idEntreprise, setIdEntreprise] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement pour le loader
  const router = useRouter();

  // Vérification si l'utilisateur est connecté
  useEffect(() => {
    const validateToken = async () => {
      const token = getCookie("token"); // Retrieve token from cookies
      const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string; // Ensure the NEXT_PUBLIC_JWT_SECRET is available
      const type = getCookie("type"); // Retrieve user type
      const isValid = checkTokenValidity(token, secret, type, router); // Pass router as an argument
      if (!isValid) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };
    validateToken();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newOffer = {
      name, // Nom de l'entreprise
      description,
      category,
      reward,
      code: Math.random().toString(36).substring(7),
      idEntreprise,
      title, // Titre de l'offre
      type,
    };

    try {
      const response = await fetch("/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOffer),
      });

      if (!response.ok) {
        throw new Error("Une erreur s'est produite lors de l'ajout de l'offre");
      }

      setMessage("Offre ajoutée avec succès !");
      setName("");
      setDescription("");
      setCategory("");
      setReward("");
      setIdEntreprise(""); // TODO: Quand l'entreprise est connectée, on peut récupérer son ID
      setTitle("");
      setType("");
    } catch (error) {
      setMessage("Erreur lors de l'ajout de l'offre");
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">
          Chargement...
        </h2>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <div className="container mx-auto mt-10 p-4">
        <h2 className="text-2xl font-bold mb-4">Ajouter une nouvelle offre</h2>
        {message && (
          <div
            className={`p-2 rounded-md ${
              message.includes("succès") ? "bg-green-300" : "bg-red-300"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div>
              <label htmlFor="idEntreprise" className="block font-bold">
                Titre de l&apos;offre
              </label>
              <input
                type="text"
                id="idEntreprise"
                value={idEntreprise}
                onChange={(e) => setIdEntreprise(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <label htmlFor="description" className="block font-bold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block font-bold">
              Catégorie
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="reward" className="block font-bold">
              Récompense
            </label>
            <input
              type="text"
              id="reward"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="type" className="block font-bold">
              Type
            </label>
            <input
              type="text"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Ajouter l&apos;offre
          </button>
        </form>
      </div>
      <Navbar />
    </>
  );
};

export default AddOfferPage;

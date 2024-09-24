'use client';

import Navbar from "@/app/components/navbar";
import TopBar from "@/app/components/topBar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { checkTokenValidity, getCookie } from "../../../../../lib/token_ugc"; // Importer la fonction de validation du token

export default function Offer({ params }: { params: { id: string } }) {
  const [offer, setOffer] = useState<offer | null>(null);
  const [loading, setLoading] = useState(true); // Pour gérer l'état du chargement
  const [validatingToken, setValidatingToken] = useState(true); // État de validation du token
  const router = useRouter();

  interface offer {
    name: string;
    description: string;
    category: string;
    reward: string;
    idEntreprise: string;
    code: string;
  }

  // Vérification du token
  useEffect(() => {
    const validateToken = async () => {
      const token = getCookie("token"); // Retrieve token from cookies
      const secret = process.env.JWT_SECRET as string; // Ensure the JWT_SECRET is available
      const type = getCookie("type"); // Retrieve user type
      const isValid = checkTokenValidity(token, secret, type, router); // Pass router as an argument
      if (!isValid) {
        router.replace("/login"); // Redirection si l'utilisateur n'est pas connecté
      } else {
        setValidatingToken(false); // Le token est valide, arrêter la validation
      }
    };
    validateToken();
  }, [router]);

  // Récupération des offres après validation du token
  useEffect(() => {
    if (!validatingToken) {
      const fetchOffer = async () => {
        setLoading(true);
        const response = await fetch(`/api/offer?id=${params.id}`);
        const data = await response.json();
        setOffer(data);
        setLoading(false);
      };
      fetchOffer();
    }
  }, [params.id, validatingToken]);

  // Affichage du loader pendant la validation du token et le chargement de l'offre
  if (validatingToken || loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">
          Chargement...
        </h2>
        <p className="w-1/3 text-center text-white">
          L&apos;offre est en train de charger, cela peut prendre quelques
          secondes, veuillez garder la page ouverte.
        </p>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <div>
        <div className="relative">
          <Image
            width={100}
            height={100}
            className="h-48 w-full object-cover md:w-full"
            src={`/img/restaurant${3}.png`}
            alt="Restaurant image"
          />
          <Link href="/ugc/offers">
            <button className="absolute top-2.5 left-2.5 bg-gray-400 bg-opacity-70 rounded-full border-0 w-10 h-10 flex items-center justify-center text-lg p-0">
              <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600" />
            </button>
          </Link>
        </div>
      </div>
      <div className="pb-20 mr-5 ml-5">
        <div className="flex items-center justify-between py-2">
          <div className="text-xl text-gray-800 font-bold">{offer?.name}</div>
          <div className="flex items-center">
            <div className="mr-2">⭐️⭐️⭐️⭐️⭐️</div>
            <div>(15 avis)</div>
          </div>
        </div>
        <div className="flex justify-start mt-2">
          {offer?.category.split(" ").map((word, index) => (
            <div
              key={index}
              style={{ backgroundColor: "#90579F" }}
              className="flex items-center text-white px-1 py-0.5 rounded-lg mx-1"
            >
              {word}
            </div>
          ))}
        </div>
        <div className="text-center text-black mt-10 mb-10">
          <p>
            Découvrez notre restaurant, un havre culinaire où la tradition
            rencontre la modernité dans une atmosphère conviviale. Notre équipe
            incarne des valeurs d’excellence, d’authenticité et de passion pour
            offrir une expérience unique. Embarquez pour une aventure
            gastronomique exceptionnelle, où chaque membre est essentiel à notre
            succès.
          </p>
        </div>
        <div className="flex justify-between space-x-5 mb-4">
          <button
            style={{ backgroundColor: "#90579F", width: "200px" }}
            className="text-white text-sm px-5 py-1 rounded-lg flex items-center justify-center overflow-auto"
          >
            <FontAwesomeIcon icon={faUser} className="text-white mr-2" />
            Je postule à cette annonce
          </button>
          <button
            style={{ backgroundColor: "#90579F", width: "200px" }}
            className="text-white text-sm px-5 py-1 rounded-lg flex items-center justify-center overflow-auto"
          >
            <FontAwesomeIcon icon={faHeart} className="text-white mr-2" />
            Je sauvegarde cette annonce
          </button>
        </div>
        <div>
          <h3 className="text-black text-xl font-bold mb-10 mt-10 text-left">
            Brief
          </h3>
          <p
            style={{ whiteSpace: "pre-line" }}
            className="text-black text-left w-5/6 mx-auto"
          >
            {offer?.description}
          </p>
        </div>
        <div className="flex justify-between space-x-5 mt-10">
          <button
            style={{ backgroundColor: "#90579F", width: "200px" }}
            className="text-white text-sm px-5 py-1 rounded-lg flex items-center justify-center overflow-auto"
          >
            <FontAwesomeIcon icon={faUser} className="text-white mr-2" />
            Je postule à cette annonce
          </button>
          <button
            style={{ backgroundColor: "#90579F", width: "200px" }}
            className="text-white text-sm px-5 py-1 rounded-lg flex items-center justify-center overflow-auto"
          >
            <FontAwesomeIcon icon={faHeart} className="text-white mr-2" />
            Je sauvegarde cette annonce
          </button>
        </div>
        <div className="mt-10 pb-20 text-center text-[#90579F] font-bold">
          <a href="#">J&apos;entre en contact avec l&apos;entreprise</a>
        </div>
      </div>
      <Navbar />
    </>
  );
}

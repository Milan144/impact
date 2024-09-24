"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import Image from "next/image";
import Navbar from "../../components/navbar";
import TopBar from "../../components/topBar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Link from "next/link";
import {
  faFilter,
  faHeart,
  faLocation,
  faSort,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { checkTokenValidity } from "../../../../lib/token_ugc"; // Fonction pour valider le token

const App = () => {
  const [offers, setOffers] = useState("");
  const [loading, setLoading] = useState(true); // État pour afficher le loader
  const [validatingToken, setValidatingToken] = useState(true); // État pour valider le token
  const router = useRouter();

  interface offer {
    id: string;
    name: string;
    description: string;
    category: string;
    reward: string;
  }

  // Vérification du token
  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkTokenValidity();
      if (!isValid) {
        router.replace("/login"); // Redirection si le token est invalide
      } else {
        setValidatingToken(false); // Le token est valide, arrêt de la validation
      }
    };
    validateToken();
  }, [router]);

  // Récupération des offres après la validation du token
  useEffect(() => {
    if (!validatingToken) {
      const fetchOffers = async () => {
        const response = await fetch(`/api/offers`);
        const data = await response.json();
        setOffers(data);
        setLoading(false); // Arrêter le chargement
      };
      fetchOffers();
    }
  }, [validatingToken]);

  // Affichage du loader pendant la validation du token et le chargement des offres
  if (validatingToken || loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">
          Chargement...
        </h2>
        <p className="w-1/3 text-center text-white">
          Les offres sont en train de charger, cela peut prendre quelques
          secondes, veuillez garder la page ouverte.
        </p>
      </div>
    );
  }

  return (
    <div>
      <TopBar />
      <div className="relative isolate px-6 pt-5 lg:px-8 mb-40">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#182F53] via-[#544697] to-[#90579F] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div>
          <h3 className="text-gray-900 text-xl font-bold">
            Les annonces à la une
          </h3>
          <div className="flex items-center justify-between space-x-4 mt-5">
            {Array.isArray(offers) && offers.length > 0 && (
              <>
                <button className="rounded-full text-xl font-bold">&lt;</button>
                <Link href={`/ugc/offer/${offers[offers.length - 1].code}`}>
                  <div
                    key={offers[offers.length - 1].code}
                    className="mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl lg:max-w-3xl xl:max-w-4xl m-5 w-full"
                  >
                    <div className="md:flex">
                      <div className="md:flex-shrink-0 h-48 md:h-auto w-full overflow-hidden">
                        <Image
                          width={100}
                          height={100}
                          className="h-full w-full object-cover md:w-full"
                          src={`/img/restaurant${3}.png`}
                          alt="Restaurant image"
                        />
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-center">
                        <div className="uppercase tracking-wide text-sm text-gray-600 font-semibold">
                          {offers[offers.length - 1].name}
                        </div>
                        <div>
                          <span className="inline-block text-yellow-600 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                            <span>
                              <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faStar} />
                            </span>
                            <span>
                              <FontAwesomeIcon icon={faStar} />
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-gray-400">
                        {offers[offers.length - 1].category}
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <button
                          style={{ backgroundColor: "#90579F" }}
                          className="hover:bg-indigo-700 text-white font-bold py-1 px-2 text-xs rounded-md"
                        >
                          Voir le brief
                        </button>
                        <div>
                          <span>
                            <FontAwesomeIcon icon={faHeart} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <button className="rounded-full text-xl font-bold">&gt;</button>
              </>
            )}
          </div>
        </div>
        {/* Le reste du contenu */}
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <Navbar />
    </div>
  );
};

export default App;

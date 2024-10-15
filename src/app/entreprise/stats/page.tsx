'use client';

import "../../globals.css";
import Image from "next/image";
import Navbar from "../../components/navbar";
import TopBar from "../../components/topBar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkTokenValidity, getCookie } from "../../../../lib/token"; // Import de la fonction de validation du token

const Stats = () => {
  const [loading, setLoading] = useState(true); // État de chargement pour le loader
  const router = useRouter();

  // Vérification si l'utilisateur est connecté
  useEffect(() => {
    const validateToken = async () => {
      const token = getCookie("token"); // Retrieve token from cookies
      const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string; // Ensure the NEXT_PUBLIC_JWT_SECRET is available
      const type = getCookie("type"); // Retrieve user type
      const isValid = checkTokenValidity(token, secret, type, router); // Pass router as an argument
      if (!isValid) {
        router.replace("/login"); // Redirection si l'utilisateur n'est pas connecté
      } else {
        setLoading(false); // Arrêter le chargement si le token est valide
      }
    };
    validateToken();
  }, [router]);

  // Affichage du loader pendant la vérification du token
  if (loading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-white text-xl font-semibold">
          Chargement...
        </h2>
        <p className="w-1/3 text-center text-white">
          Les statistiques sont en cours de chargement, veuillez patienter.
        </p>
      </div>
    );
  }

  return (
    <div>
      <TopBar />

      <div className="relative isolate px-6 pt-5 lg:px-8 mb-40">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-900 text-xl mt-5 mb-5 font-bold">
            Les statistiques de cette annonce
          </h3>
        </div>
        <div className="flex justify-between items-center">
          <Image
            width={1000}
            height={1000}
            className="h-48 w-full object-cover md:w-full"
            src={`/img/stats.jpg`}
            alt="Statistiques image"
          />
        </div>
        <br />
        <h3 className="font-bold text-center text-black">
          Nombre total d&apos;impressions :{" "}
          <span className="text-green-500">5,773</span>
        </h3>
        <h3 className="font-bold text-center text-black">
          Nombre total de clics : <span className="text-green-500">3,773</span>
        </h3>
        <h3 className="font-bold text-center text-black">
          Nombre total de vues : <span className="text-green-500">2,773</span>
        </h3>
      </div>
    </div>
  );
};

export default Stats;

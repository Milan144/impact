'use client';

import "../../globals.css";
import Image from "next/image";
import Navbar from "../../components/navbar";
import TopBar from "../../components/topBar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCookies } from "../../../../lib/cookieContext";
import { validateToken } from "../../../../lib/validateToken";

const Stats = () => {
  const [loading, setLoading] = useState(true); // État de chargement pour le loader
  const router = useRouter();
  const { cookie } = useCookies();
  const pathname = usePathname();

  // Vérification si l'utilisateur est connecté
  useEffect(() => {
    if (cookie) {
      validateToken(cookie, setLoading, router, pathname).then(r => r);
    }
  }, [cookie, router, pathname]);

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

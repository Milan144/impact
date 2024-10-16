'use client';

import React, { useEffect, useState } from "react";
import "../../globals.css";
import Image from "next/image";
import Navbar from "../../components/navbar";
import TopBar from "../../components/topBar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  faSort,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useCookies } from '../../../../lib/cookieContext';
import { validateToken } from '../../../../lib/validateToken';

const App = () => {
  const router = useRouter();
  const [offers, setOffers] = useState("");
  const [archivedOffers, setArchivedOffers] = useState("");
  const [loading, setLoading] = useState(true);
 const pathname = usePathname();
  interface Offer {
    id: string;
    name: string;
    description: string;
    category: string;
    reward: string;
    archived: string;
    title: string;
    type: string;
  }

  const { cookie } = useCookies(); // On récupère les cookies via le contexte

  useEffect(() => {
    if (cookie) {
      validateToken(cookie, setLoading, router, pathname).then(r => r);
    }
  }, [cookie, router, pathname]);

  useEffect(() => {
    if (!loading) {
      const fetchEntreprise = async () => {
        const responseOffres = await fetch(`/api/offersentreprise?id=1`);
        const responseArchivedOffres = await fetch(
            `/api/offersentreprise?id=1&archived=true`
        );
        const dataOffres = await responseOffres.json();
        const dataArchivedOffres = await responseArchivedOffres.json();
        setOffers(dataOffres);
        setArchivedOffers(dataArchivedOffres);
      };
      fetchEntreprise();
    }
  }, [loading]);

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
        <div className="flex justify-between items-center">
          <h3 className="text-gray-900 text-xl font-bold">
            Vos annonces en ligne
          </h3>
          <button className="text-black border border-black bg-transparent px-2 py-1 flex items-center rounded-full">
            <span className="text-gray-600">
              <FontAwesomeIcon icon={faSort} />
            </span>{" "}
            Trier
          </button>
        </div>
        <div className="flex justify-between">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto w-full"
          >
            {Array.isArray(offers) && offers.length > 0 ? (
              offers.map((offer, index) => (
                <div
                  key={index}
                  className="mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl lg:max-w-3xl xl:max-w-4xl m-5 w-full"
                >
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 h-48 md:h-auto">
                      <Image
                        width={100}
                        height={100}
                        className="h-full w-full object-cover md:w-full"
                        src={`/img/restaurant${index}.png`}
                        alt="Restaurant image"
                      />
                    </div>
                    <div className="p-8 grid grid-cols-2 gap-4">
                      <div>
                        <div className="uppercase tracking-wide text-sm text-gray-600 font-semibold">
                          {offer.title}
                        </div>
                        <div className="mt-2 text-gray-400">{offer.type}</div>
                        <Link
                          key={offer.id}
                          href={`/entreprise/offercandidates`}
                        >
                          <button
                            style={{ backgroundColor: "#90579F" }}
                            className="hover:bg-indigo-700 text-white font-bold py-1 px-2 text-xs rounded-md mt-2"
                          >
                            Voir les candidats
                          </button>
                        </Link>
                      </div>
                      <div className="flex flex-col items-center justify-center ml-4 relative">
                        <div className="rounded-full bg-gray-200 border-2 border-purple-600 p-2 w-10 h-10 flex items-center justify-center relative">
                          <FontAwesomeIcon icon={faUser} />
                          <div
                            style={{ backgroundColor: "#90579F" }}
                            className="rounded-full text-white text-xs absolute bottom-0 right-0 mb-[-2] mr-[-2] w-4 h-4 flex items-center justify-center"
                          >
                            3
                          </div>
                        </div>
                        <div className="text-xs text-center text-black mt-2">
                          En ligne depuis 25 jours
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3>Vous n&apos;avez pas d&apos;annonces en ligne</h3>
            )}
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-gray-900 text-xl font-bold">
            Vos anciennes annonces
          </h3>
        </div>
        <div className="flex justify-between">
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto w-full"
          >
            {Array.isArray(archivedOffers) && archivedOffers.length > 0 ? (
              archivedOffers.map((offer, index) => (
                <div
                  key={index}
                  className="mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl lg:max-w-3xl xl:max-w-4xl m-5 w-full"
                >
                  <div className="md:flex">
                    <div className="md:flex-shrink-0 h-48 md:h-auto">
                      <Image
                        width={100}
                        height={100}
                        className="h-full w-full object-cover md:w-full"
                        src={`/img/restaurant${index}.png`}
                        alt="Restaurant image"
                      />
                    </div>
                    <div className="p-8 grid grid-cols-2 gap-4">
                      <div>
                        <div className="uppercase tracking-wide text-sm text-gray-600 font-semibold">
                          {offer.title}
                        </div>
                        <div className="mt-2 text-gray-400">{offer.type}</div>
                        <Link key={offer.id} href={`/entreprise/stats`}>
                          <button
                            style={{ backgroundColor: "#90579F" }}
                            className="hover:bg-indigo-700 text-white font-bold py-1 px-2 text-xs rounded-md mt-2"
                          >
                            Voir les statistiques
                          </button>
                        </Link>
                      </div>
                      <div className="flex flex-col items-center justify-center ml-4 relative">
                        <div className="rounded-full overflow-hidden relative w-10 h-10">
                          <Image
                            layout="fill"
                            objectFit="cover"
                            className="absolute inset-0"
                            src={`/img/noemie.jpg`}
                            alt="noemie"
                          />
                        </div>
                        <div className="text-xs text-center text-black mt-2">
                          Contenu réalisé par Camille
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3>Vous n&apos;avez pas d&apos;anciennes annonces</h3>
            )}
          </ul>
        </div>
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

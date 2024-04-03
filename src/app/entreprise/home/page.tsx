"use client"
import DemoRequestPopup from '../../components/demoRequestPopup';
import TopBar from '@/app/components/topBar';
import Navbar from '@/app/components/navbar'
import { useState } from 'react'
import Link from 'next/link'

export default function HomeEntreprise() {
    const [showPopup, setShowPopup] = useState(false);
    
    return (
        <div>
            <TopBar />
            <header className="pl-0">
                <div
                    className="p-5 text-center bg-image relative"
                    style={{
                        backgroundImage: `url(/img/entreprise.jpg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '100vh'
                    }}
                >
                    <div className="px-5 absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
                        <div className="text-white text-center">
                            <h1 className="mb-3 text-xl md:text-xl lg:text-6xl">Vous souhaitez faire appel à des UGC pour faire connaître votre business ?</h1>
                            <h4 className="mb-3 text-lg md:text-xl lg:text-2xl">Rejoignez-nous et rentrez en contact avec des UGC !</h4>
                            <button
                                className="mb-5 border border-white py-2 px-4 text-white hover:bg-white hover:text-black transition duration-300"
                                onClick={() => setShowPopup(true)}
                            >
                                Demander une démo
                            </button>
                            <Link href="/entreprise/offers">
                                <button
                                    className="border border-white py-2 px-4 text-white bg-transparent hover:bg-white hover:text-black transition duration-300"
                                    style={{ flex: 1 }} 
                                >
                                    Commencer l'inscription
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {showPopup && <DemoRequestPopup onClose={() => setShowPopup(false)} />}
            </header>
        </div>
    );
}

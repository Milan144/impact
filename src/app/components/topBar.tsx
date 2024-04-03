'use client';
import Image from "next/image";
import logo from "./logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/link";

const redirect = () => {
  window.location.href = "/";
}

const TopBar = () => {

  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);


  return (
    <div
      className="sticky top-0 left-0 right-0 text-white px-8 flex items-center justify-between h-20 w-screen z-10"
      style={{ background: "linear-gradient(to right, #182F53, #90579F)" }}
    >
      <Image
        src={logo}
        alt="LOGO"
        className="absolute left-8 w-1/10 h-auto filter invert"
        width={100}
        height={100}
        onClick={redirect}
      />
      <div className="ml-auto flex space-x-4">
        {path.startsWith("/ugc") && (
          <Link href="/construction">
            <span className="text-2xl">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </Link>
        )} 
        <Link href="/construction">
          <span className="text-2xl">
            <FontAwesomeIcon icon={faHeart} />
          </span>
        </Link>
        <Link href="/construction">
          <span className="text-2xl">
            <FontAwesomeIcon icon={faBell} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "../../../../lib/mongodb";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "votre_clé_secrète";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Données manquantes" }, { status: 400 });
    }

    // Connexion à la base de données
    const client = await clientPromise;
    const db = client.db("impact");

    // Recherche de l'utilisateur par email
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "Email incorrect" }, { status: 401 });
    }

    // Comparaison du mot de passe haché
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Mot de passe incorrect" }, { status: 401 });
    }

    // Création d'un jeton JWT pour l'utilisateur
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" } // Le jeton expire après 1 heure
    );

    // Création d'une réponse avec un cookie HTTP pour stocker le jeton JWT
    const response = NextResponse.json({ success: true, message: "Connexion réussie" });

    response.cookies.set("token", token, {
      httpOnly: true, // Le cookie est uniquement accessible via le serveur
      secure: process.env.NODE_ENV === "production", // Utilise un cookie sécurisé en production
      maxAge: 60 * 60, // 1 heure
      path: "/", // Le cookie est accessible sur tout le site
    });

    // Enregistre en cookies le type dans le user
    response.cookies.set("type", user.type, {
      httpOnly: true, // Le cookie est uniquement accessible via le serveur
      secure: process.env.NODE_ENV === "production", // Utilise un cookie sécurisé en production
      maxAge: 60 * 60, // 1 heure
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return NextResponse.json({ success: false, message: "Erreur serveur" }, { status: 500 });
  }
}

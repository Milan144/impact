import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const clientPromise = MongoClient.connect(process.env.MONGODB_URI);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    // Hash le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Déterminer le type d'utilisateur à partir de l'URL
    const urlPath = req.headers.get("referer") || "";
    const type = urlPath.includes("/ugc/signup") ? "ugc" : "entreprise";

    const client = await clientPromise;
    const db = client.db("impact");
    const usersCollection = db.collection("users");

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "L'email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Insérer l'utilisateur dans la base de données
    const result = await usersCollection.insertOne({
      username,
      email,
      password: hashedPassword,
      type,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Utilisateur créé avec succès", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

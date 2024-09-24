import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET(req: NextRequest) {
  // Getting params
  try {
    // Initialize MongoDB
    const client = await clientPromise;
    const db = client.db("impact");

    // Get all offers
    const offers = await db.collection("offres").find({}).toArray();

    return NextResponse.json(offers);
  } catch (e) {
    console.error(e);
    return new NextResponse("Error", { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  const offer = await req.json();

  try {
    if (!offer) {
      return new NextResponse("Données manquantes", { status: 400 });
    }

    // Connexion à la base de données
    const client = await clientPromise;
    const db = client.db("impact");

    // Insertion de la nouvelle offre dans la collection
    await db.collection("offres").insertOne(offer);

    return NextResponse.json({ message: "Nouvelle offre ajoutée." });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'offre :", error);
    return new NextResponse("Erreur", { status: 500 });
  }
}

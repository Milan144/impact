import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    // Vérifie que la méthode est POST
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Méthode non autorisée' }, { status: 405 });
    }

    // Lecture explicite du corps de la requête (body)
    let body;
    try {
        body = await req.json();  // Utilise req.json() pour récupérer le corps
    } catch (error) {
        return NextResponse.json({ message: 'Erreur lors de la lecture du body' }, { status: 400 });
    }

    const { token, type } = body;

    if (!token || !type) {
        return NextResponse.json({ message: 'Paramètres manquants' }, { status: 400 });
    }

    try {
        const decoded = jwt.verify(token, secret);
        return NextResponse.json({ valid: true, decoded });
    } catch (error) {
        console.error('Erreur lors de la validation du token:', error);
        return NextResponse.json({ message: 'Token invalide' }, { status: 401 });
    }
}

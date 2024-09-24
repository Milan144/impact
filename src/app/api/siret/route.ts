import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const siret = searchParams.get('siret');

  if (!siret) {
    return new NextResponse('SIRET manquant', { status: 400 });
  }
  console.log('SIRET:', siret);

  try {
    const response = await axios.get(`https://api.insee.fr/entreprises/sirene/V3.11/siret/${siret}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_INSEE_API_TOKEN}`,
      },
    });
    return new NextResponse(JSON.stringify(response.data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new NextResponse('Erreur lors de la récupération des données', { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // importa il client prisma

export async function POST(request: Request) {
  try {
    const { nome, categoriaId } = await request.json();

    if (!nome || !categoriaId) {
      return NextResponse.json({ error: "Nome o categoria mancanti" }, { status: 400 });
    }

    // Creo il progetto nel DB
    const nuovoProgetto = await prisma.progetto.create({
      data: {
        nome: nome.trim(),
        categoriaId: Number(categoriaId),
      },
    });

    return NextResponse.json(nuovoProgetto, { status: 201 });
  } catch (error) {
    console.error("Errore creazione progetto:", error);
    return NextResponse.json({ error: "Errore interno nel server" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Legge tutti i progetti, includendo i dati categoria (opzionale)
    const progetti = await prisma.progetto.findMany({
      include: {
        categoria: true, // se vuoi anche info categoria nel risultato
      },
    });

    return NextResponse.json(progetti);
  } catch (error) {
    console.error("Errore fetching progetti:", error);
    return NextResponse.json({ error: "Errore caricamento progetti" }, { status: 500 });
  }
}

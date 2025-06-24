import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // importa il client prisma

export async function POST(request: Request) {
  try {
    const { nome, categoriaIds } = await request.json();

    if (!nome || !categoriaIds || !Array.isArray(categoriaIds) || categoriaIds.length === 0) {
      return NextResponse.json({ error: "Nome o categorie mancanti" }, { status: 400 });
    }

    const nuovoProgetto = await prisma.progetto.create({
      data: {
        nome: nome.trim(),
        categorie: {
          connect: categoriaIds.map((id: number) => ({ id })),
        },
      },
      include: {
        categorie: true,
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
    const progetti = await prisma.progetto.findMany({
      include: {
        categorie: true,
      },
    });

    return NextResponse.json(progetti);
  } catch (error) {
    console.error("Errore fetching progetti:", error);
    return NextResponse.json(
      { error: "Errore caricamento progetti", details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, nome, categoriaIds } = data;

    if (!id || !nome || !categoriaIds || !Array.isArray(categoriaIds)) {
      return NextResponse.json({ error: "Dati mancanti per aggiornamento" }, { status: 400 });
    }

    const progettoAggiornato = await prisma.progetto.update({
      where: { id: Number(id) },
      data: {
        nome: nome.trim(),
        categorie: {
          set: categoriaIds.map((id: number) => ({ id })),
        },
      },
      include: {
        categorie: true,
      },
    });

    return NextResponse.json(progettoAggiornato);
  } catch (error) {
    console.error("Errore aggiornamento progetto:", error);
    return NextResponse.json({ error: "Errore interno nel server" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID progetto mancante" }, { status: 400 });
    }

    const progettoEsistente = await prisma.progetto.findUnique({
      where: { id: Number(id) },
    });

    if (!progettoEsistente) {
      return NextResponse.json({ error: "Progetto non trovato" }, { status: 404 });
    }

    await prisma.progetto.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Progetto eliminato con successo" });
  } catch (error) {
    console.error("Errore eliminazione progetto:", error);
    return NextResponse.json({ error: "Errore interno nel server" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function parseId(id: unknown) {
  const parsed = Number(id);
  return isNaN(parsed) ? null : parsed;
}

export async function POST(request: Request) {
  try {
    const { nome, categoriaIds } = await request.json();

    if (!nome || typeof nome !== "string" || nome.trim() === "") {
      return NextResponse.json({ error: "Nome progetto obbligatorio" }, { status: 400 });
    }
    if (!Array.isArray(categoriaIds) || categoriaIds.some(id => typeof id !== "number")) {
      return NextResponse.json({ error: "categoriaIds deve essere un array di numeri" }, { status: 400 });
    }

    const nuovoProgetto = await prisma.progetto.create({
      data: {
        nome: nome.trim(),
        categorie: {
          connect: categoriaIds.map((id: number) => ({ id })),
        },
      },
      include: { categorie: true },
    });

    return NextResponse.json(nuovoProgetto, { status: 201 });
  } catch (error) {
    console.error("Errore creazione progetto:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const progetti = await prisma.progetto.findMany({
      include: { categorie: true },
    });
    return NextResponse.json(progetti);
  } catch (error) {
    console.error("Errore fetching progetti:", error);
    return NextResponse.json({ error: "Errore caricamento progetti" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, nome, categoriaIds } = data;

    const parsedId = parseId(id);
    if (!parsedId) {
      return NextResponse.json({ error: "ID progetto non valido" }, { status: 400 });
    }
    if (!nome || typeof nome !== "string" || nome.trim() === "") {
      return NextResponse.json({ error: "Nome progetto obbligatorio" }, { status: 400 });
    }
    if (!Array.isArray(categoriaIds) || categoriaIds.some(id => typeof id !== "number")) {
      return NextResponse.json({ error: "categoriaIds deve essere un array di numeri" }, { status: 400 });
    }

    const progettoEsistente = await prisma.progetto.findUnique({ where: { id: parsedId } });
    if (!progettoEsistente) {
      return NextResponse.json({ error: "Progetto non trovato" }, { status: 404 });
    }

    const progettoAggiornato = await prisma.progetto.update({
      where: { id: parsedId },
      data: {
        nome: nome.trim(),
        categorie: {
          set: categoriaIds.map((id: number) => ({ id })),
        },
      },
      include: { categorie: true },
    });

    return NextResponse.json(progettoAggiornato);
  } catch (error) {
    console.error("Errore aggiornamento progetto:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");
    const parsedId = parseId(idParam);

    if (!parsedId) {
      return NextResponse.json({ error: "ID progetto mancante o non valido" }, { status: 400 });
    }

    const progettoEsistente = await prisma.progetto.findUnique({ where: { id: parsedId } });
    if (!progettoEsistente) {
      return NextResponse.json({ error: "Progetto non trovato" }, { status: 404 });
    }

    await prisma.progetto.delete({ where: { id: parsedId } });

    return NextResponse.json({ message: "Progetto eliminato con successo" });
  } catch (error) {
    console.error("Errore eliminazione progetto:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

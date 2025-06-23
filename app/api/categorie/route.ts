import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categorie = await prisma.categoria.findMany();
    return NextResponse.json(categorie);
  } catch (error) {
    return NextResponse.json({ error: "Errore nel caricamento categorie" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { nome } = await request.json();

    if (!nome || nome.trim() === "") {
      return NextResponse.json({ error: "Nome categoria obbligatorio" }, { status: 400 });
    }

    // Prova a creare la categoria
    const nuovaCategoria = await prisma.categoria.create({
      data: {
        nome: nome.trim(),
      },
    });

    return NextResponse.json(nuovaCategoria, { status: 201 });
  } catch (error: any) {
    // Controlla se errore è per violazione chiave unica
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Categoria già esistente" }, { status: 409 });
    }
    return NextResponse.json({ error: "Errore durante la creazione categoria" }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  const id = Number(new URL(request.url).searchParams.get('id'));
  if (!id) return NextResponse.json({ error: "Id mancante" }, { status: 400 });
  await prisma.categoria.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

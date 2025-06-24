import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const progettoId = searchParams.get("progettoId");
  if (!progettoId) {
    return NextResponse.json({ error: "progettoId mancante" }, { status: 400 });
  }
  try {
    const tasks = await prisma.task.findMany({
      where: { progettoId: Number(progettoId) },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Errore fetch tasks:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { nome, priorita, progettoId, fatto = false } = await request.json();
    if (!nome || !priorita || !progettoId) {
      return NextResponse.json({ error: "Campi mancanti" }, { status: 400 });
    }
    const nuovaTask = await prisma.task.create({
      data: { nome, priorita, progettoId: Number(progettoId), fatto },
    });
    return NextResponse.json(nuovaTask, { status: 201 });
  } catch (error) {
    console.error("Errore creazione task:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  try {
    const { id, fatto } = await request.json();
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "ID task non valido" }, { status: 400 });
    }
    const updated = await prisma.task.update({
      where: { id: parsedId },
      data: { fatto: Boolean(fatto) },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Errore aggiornamento task:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");
  const id = idParam ? Number(idParam) : NaN;
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID task non valido" }, { status: 400 });
  }
  try {
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ message: "Task eliminata con successo" });
  } catch (e) {
    console.error("Errore eliminazione task:", e);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

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
      where: {
        progettoId: Number(progettoId),
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Errore fetch tasks:", error);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { nome, priorita, progettoId } = await request.json();

    // Validazione semplice
    if (!nome || !priorita || !progettoId) {
      return NextResponse.json({ error: "Campi mancanti" }, { status: 400 });
    }

    // Creazione task
    const nuovaTask = await prisma.task.create({
      data: {
        nome,
        priorita,
        progettoId: Number(progettoId),
      },
    });

    return NextResponse.json(nuovaTask, { status: 201 });
  } catch (error) {
    console.error("Errore durante la creazione della task:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

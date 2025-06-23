// /app/api/progetti/route.ts
import { NextResponse } from "next/server";

let progetti: { id: number; nome: string; categoriaId: number }[] = [];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nome, categoriaId } = data;

    if (!nome || !categoriaId) {
      return NextResponse.json({ error: "Nome o categoria mancanti" }, { status: 400 });
    }

    const nuovoProgetto = {
      id: progetti.length + 1,
      nome,
      categoriaId,
    };

    progetti.push(nuovoProgetto);

    return NextResponse.json(nuovoProgetto);
  } catch (error) {
    return NextResponse.json({ error: "Errore nel body" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(progetti);
}

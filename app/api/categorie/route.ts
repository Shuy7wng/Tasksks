// /app/api/categorie/route.ts (Next.js App Router)
import { NextResponse } from "next/server";

const categorie = [
  { id: 1, nome: "Categoria 1" },
  { id: 2, nome: "Categoria 2" },
  { id: 3, nome: "Categoria 3" },
];

export async function GET() {
  return NextResponse.json(categorie);
}

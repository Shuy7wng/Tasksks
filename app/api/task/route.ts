import { NextResponse } from "next/server";

const mockTasks = [
  { id: 1, name: "Task 1", priority: "alta", progettoId: 1 },
  { id: 2, name: "Task 2", priority: "media", progettoId: 1 },
  { id: 3, name: "Task 3", priority: "bassa", progettoId: 2 },
];

// Funzione finta per filtrare i task per progettoId
function getTasksByProjectId(progettoId: number) {
  return mockTasks.filter((task) => task.progettoId === progettoId);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const progettoIdStr = url.searchParams.get("progettoId");

  if (!progettoIdStr) {
    return NextResponse.json({ error: "Manca progettoId" }, { status: 400 });
  }

  const progettoId = parseInt(progettoIdStr);
  if (isNaN(progettoId)) {
    return NextResponse.json({ error: "progettoId non valido" }, { status: 400 });
  }

  const tasks = getTasksByProjectId(progettoId);

  return NextResponse.json(tasks);
}

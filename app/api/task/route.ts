// app/api/task/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nome, priorita, progettoId } = body

    if (!nome || !priorita || !progettoId) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 })
    }

    const nuovaTask = await prisma.task.create({
      data: {
        nome,
        priorita,
        progetto: {
          connect: { id: progettoId },
        },
      },
    })

    return NextResponse.json(nuovaTask)
  } catch (error) {
    console.error('Errore creazione task:', error)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}

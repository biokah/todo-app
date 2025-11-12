import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ tasks });
}

export async function POST(req: Request) {
  const { title } = await req.json();
  if (!title || typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Título inválido" }, { status: 400 });
  }
  const task = await prisma.task.create({ data: { title: title.trim() } });
  return NextResponse.json({ task }, { status: 201 });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// En Next 16, params puede ser una Promise:
type RouteCtx = { params: Promise<{ id: string }> };

export async function PATCH(_req: Request, ctx: RouteCtx) {
  const { id } = await ctx.params; // 👈 await
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const current = await prisma.task.findUnique({ where: { id } });
    if (!current) return NextResponse.json({ error: "No encontrada" }, { status: 404 });

    const updated = await prisma.task.update({
      where: { id },
      data: { completed: !current.completed },
    });
    return NextResponse.json({ task: updated });
  } catch (err) {
    console.error("PATCH /tasks/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: RouteCtx) {
  const { id } = await ctx.params; // 👈 await
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    await prisma.task.delete({ where: { id } });
  } catch {
    // idempotente si ya no existe
  }
  return NextResponse.json({ ok: true });
}



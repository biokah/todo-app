"use client";
export function TaskCounter({ total, done }: { total: number; done: number }) {
  return (
    <p style={{ fontSize: 14, color: "var(--nextui-colors-foreground-500)" }}>
      {done} / {total} completadas
    </p>
  );
}

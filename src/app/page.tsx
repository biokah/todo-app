"use client";
import { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Divider, Spacer, Button } from "@heroui/react";
import { TodoInput } from "@/components/TodoInput";
import { TaskItem, UITask } from "@/components/TodoItem";
import { Counter } from "@/components/Counter";

export default function HomePage() {
  const [tasks, setTasks] = useState<UITask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/tasks", { cache: "no-store" });
      const data = await res.json();
      setTasks(data.tasks);
      setLoading(false);
    })();
  }, []);

  const totals = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    return { total, done };
  }, [tasks]);

  async function addTask(title: string) {
    const optimistic: UITask = { id: `temp-${crypto.randomUUID()}`, title, completed: false };
    setTasks((prev) => [optimistic, ...prev]);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const { task } = await res.json();
      setTasks((prev) => [task, ...prev.filter((t) => t.id !== optimistic.id)]);
    } catch {
      setTasks((prev) => prev.filter((t) => t.id !== optimistic.id));
    }
  }

  async function toggleTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    try {
      await fetch(`/api/tasks/${id}`, { method: "PATCH" });
    } catch {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    }
  }

  async function removeTask(id: string) {
    const snapshot = tasks;
    setTasks((cur) => cur.filter((t) => t.id !== id));
    try {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    } catch {
      setTasks(snapshot);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #eef0ff, #f6f7ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Card
        shadow="md"
        radius="md"
        style={{
          width: "100%",
          maxWidth: 500,
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <CardHeader style={{ flexDirection: "column", alignItems: "center", gap: 4 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700 }}>
            📝 Mi Lista de Tareas
          </h1>
          <p style={{ color: "#666", fontSize: 14 }}>
            {totals.total - totals.done === 0
              ? "0 tareas pendientes"
              : `${totals.total - totals.done} tareas pendientes`}
          </p>
        </CardHeader>

        <Divider />

        <CardBody style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <TodoInput onAdd={addTask} />

          {loading ? (
            <p>Cargando…</p>
          ) : tasks.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>
              No hay tareas aún ✨
            </p>
          ) : (
            <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onRemove={removeTask}
                />
              ))}
            </ul>
          )}

          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              color: "#555",
            }}
          >
            <span>Total: {totals.total}</span>
            <span>Completadas: {totals.done}</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}


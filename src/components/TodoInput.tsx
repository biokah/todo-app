"use client";
import { useState } from "react";
import { Input, Button } from "@heroui/react";

export function TodoInput({ onAdd }: { onAdd: (title: string) => void }) {
  const [value, setValue] = useState("");

  function submit() {
    const title = value.trim();
    if (!title) return;
    onAdd(title);
    setValue("");
  }

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Input
        aria-label="Agregar nueva tarea"
        placeholder="Agregar nueva tarea..."
        value={value}
        onValueChange={setValue}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        radius="sm"
        variant="bordered"
      />
      <Button
        onPress={submit}
        color="default"
        size="md"
        radius="sm"
        style={{ backgroundColor: "black", color: "white", padding: "0 2rem" }}
      >
        Agregar
      </Button>
    </div>
  );
}


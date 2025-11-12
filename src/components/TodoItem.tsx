"use client";
import { Checkbox, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

export type UITask = { id: string; title: string; completed: boolean; createdAt?: string };

export function TaskItem({
  task, onToggle, onRemove
}: {
  task: UITask;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const isTemp = task.id.startsWith("temp-");

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        background: "#f9f9fb",
        border: "1px solid #e0e0e0",
        borderRadius: 8,
        padding: "0.6rem 0.8rem",
      }}
    >


      <Checkbox
        size="sm"
        radius="sm"
        color="primary"
        classNames={{
          base: "m-0 bg-transparent data-[hover=true]:bg-transparent",
          wrapper: "w-5 h-5 min-w-5 min-h-5 rounded-[6px]",
          icon: "text-white",
          label: "ml-2",
        }}
        isSelected={task.completed}
        onValueChange={() => !isTemp && onToggle(task.id)}
        isDisabled={isTemp}
      >
        <span
          style={{
            fontSize: 15,
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#999" : "#000",
          }}
        >
          {task.title}
        </span>
      </Checkbox>




      <Button
        isIconOnly
        size="sm"
        variant="light"
        onPress={() => onRemove(task.id)}
        isDisabled={isTemp}

      >
        <Trash2 size={18} color="#d33" />
      </Button>
    </li>
  );
}

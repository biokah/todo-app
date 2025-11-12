# To‑Do App — Prueba Técnica

Prueba técnica desarrollada con **Next.js 16 (App Router)**, **HeroUI v2**, **Prisma** y **PostgreSQL (Docker Compose)**.

---

## 🚀 Características principales

* ➕ **Añadir tareas** a la lista.
* ✅ **Marcar tareas** como completadas.
* ❌ **Eliminar tareas individuales.**
* 🔢 **Contador** de tareas totales y completadas en tiempo real.

---

## 🧱 Stack utilizado

* **Next.js 16 (App Router, TypeScript)**
* **HeroUI v2** (basado en NextUI + Tailwind plugin)
* **Prisma ORM**
* **PostgreSQL 16 (Docker Compose)**

---

## 🧩 Instrucciones de instalación

### 1️⃣ Clonar e instalar dependencias

```bash
git clone <URL-del-repo>
cd todo-app
npm install
```

### 2️⃣ Iniciar base de datos (Docker Compose)

```bash
docker compose up -d
```

### 3️⃣ Configurar entorno

```bash
cp .env.example .env
```

Contenido del `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todos?schema=public"
```

### 4️⃣ Generar cliente Prisma y ejecutar migración

```bash
npx prisma generate --schema=prisma/schema.prisma
npx prisma migrate dev --name init --schema=prisma/schema.prisma
```

### 5️⃣ Correr el proyecto

```bash
npm run dev
```

Abrir en el navegador el siguiente link 👉 [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Archivos clave

### `docker-compose.yml`

```yaml
version: "3.9"
services:
  db:
    image: postgres:16
    container_name: todo-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: todos
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

### `tailwind.config.js`

```js
const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: { extend: {} },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: { DEFAULT: "#000000", foreground: "#ffffff" },
          },
        },
      },
    }),
  ],
};
```

### `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### `src/app/providers.tsx`

```tsx
"use client";
import { HeroUIProvider } from "@heroui/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
```

---

## 🗂️ Estructura del proyecto

```
src/
├─ app/
│  ├─ api/
│  │  ├─ tasks/route.ts
│  │  └─ tasks/[id]/route.ts
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ providers.tsx
│  └─ globals.css
├─ components/
│  ├─ Counter.tsx
│  ├─ TodoInput.tsx
│  └─ TodoItem.tsx
└─ lib/
   └─ prisma.ts
prisma/
├─ schema.prisma
.env.example
```

---

## 🧪 Endpoints API

### `GET /api/tasks`

Obtiene todas las tareas.

### `POST /api/tasks`

Crea una nueva tarea.

### `PATCH /api/tasks/[id]`

Alterna el estado de completado de una tarea.

### `DELETE /api/tasks/[id]`

Elimina una tarea.

---

## 🐳 Dockerfile para producción (opcional)

```Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate --schema=prisma/schema.prisma && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY package.json .
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🧾 .gitignore

```
node_modules
.next
out
.env
.env.local
.DS_Store
```

---


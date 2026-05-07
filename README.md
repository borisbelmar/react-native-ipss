# React Native IPSS — App de Notas

Aplicación móvil de notas con CRUD completo, persistencia local y validación de formularios.

**Stack:** React Native + Expo + TypeScript + AsyncStorage + Zod

## Funcionalidades

- Login con validación Zod
- CRUD de notas (crear, listar, editar, eliminar)
- Persistencia en el dispositivo con AsyncStorage
- Navegación con Expo Router (file-based routing)
- Validación de formularios con Zod

## Estructura

```
app/                  ← Rutas de Expo Router
├── _layout.tsx       ← Layout raíz
├── index.tsx         ← Login
├── +not-found.tsx    ← 404
└── (tabs)/
    ├── _layout.tsx   ← Tab bar (Notas, Perfil)
    ├── index.tsx     ← Lista de notas
    ├── [id].tsx      ← Crear/editar nota
    └── profile.tsx   ← Perfil

components/           ← Componentes UI
├── NoteForm.tsx
├── NoteItem.tsx
├── useClientOnlyValue.ts
└── useClientOnlyValue.web.ts

hooks/                ← Custom hooks
├── useLogin.ts
├── useNotes.ts
└── useNoteForm.ts

schemas/              ← Schemas Zod
└── note.schema.ts

types/                ← Tipos TypeScript
└── note.ts

constants/
└── Colors.ts
```

## Requisitos

- Node.js 18+
- Expo CLI (`npx expo`)
- Dispositivo físico o emulador (Android/iOS)

## Instalación

```bash
yarn install
```

## Ejecutar

```bash
npx expo start
```

Escanea el QR con Expo Go (Android/iOS) o presiona `a` para Android emulator / `i` para iOS simulator.

## Login

- Email: cualquier email válido
- Password: `1234`

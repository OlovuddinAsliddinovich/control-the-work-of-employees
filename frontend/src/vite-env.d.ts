/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // Sizning o'zgaruvchingiz
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

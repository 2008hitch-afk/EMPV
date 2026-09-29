/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_ORIGIN?: string;
  readonly VITE_SITE_BASE_PATH?: string;
  readonly VITE_ENABLE_BACKGROUND_LAB?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

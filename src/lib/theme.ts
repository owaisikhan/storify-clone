/**
 * Where the visitor's light/dark choice is remembered.
 *
 * Kept in a plain module rather than alongside the toggle: the pre-paint script
 * in app/layout.tsx is server-rendered, and a server component importing a
 * constant from a "use client" module receives a client reference instead of
 * the value — which silently compiles to `localStorage.getItem(undefined)`.
 */
export const THEME_STORAGE_KEY = "storify:theme";

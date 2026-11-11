import { useSyncExternalStore } from "react";

const SCHERMO_LARGO = "(min-width: 1024px)";

function ascolta(aggiorna: () => void) {
  const media = window.matchMedia(SCHERMO_LARGO);
  media.addEventListener("change", aggiorna);
  return () => media.removeEventListener("change", aggiorna);
}

function schermoLargo() {
  return window.matchMedia(SCHERMO_LARGO).matches;
}

export function useWideScreen() {
  return useSyncExternalStore(ascolta, schermoLargo, () => false);
}

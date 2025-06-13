import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomChar(): string {
  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const indiceAleatorio = Math.floor(Math.random() * alfabeto.length);
  return alfabeto[indiceAleatorio] ?? "A";
}

export function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getCurrentLocation =
  async (): Promise<GeolocationPosition | null> => {
    if (!navigator.geolocation) {
      alert("La geolocalización no está soportada en este navegador.");
      return null;
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => {
          console.error("Error obteniendo ubicación:", error);
          alert("No se pudo obtener tu ubicación.");
          reject(error);
        },
        { enableHighAccuracy: true }
      );
    });
  };

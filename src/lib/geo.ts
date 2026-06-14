// src/lib/geo.ts
import { fetchNearbyGymsFn } from "./geo.functions";

export interface GeoResult {
  lat: number;
  lng: number;
  accuracy: number;
}

export function requestLocation(): Promise<GeoResult> {
  // ... mantém o código original ...
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocalização não suportada neste navegador."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      (err) => {
        const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
        const isIOS = /iPhone|iPad|iPod/.test(ua);
        let msg: string;
        if (err.code === err.PERMISSION_DENIED) {
          msg = isIOS
            ? "Permissão negada. No iPhone abra Ajustes → Safari → Localização → Permitir, depois recarregue a página."
            : "Permissão negada. Toque no cadeado da barra de endereço e permita a localização.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = "Localização indisponível. Verifique se o GPS/Wi-Fi está ativo.";
        } else if (err.code === err.TIMEOUT) {
          msg = "Tempo esgotado ao obter localização. Tente novamente em local com melhor sinal.";
        } else {
          msg = "Erro ao obter localização.";
        }
        reject(new Error(msg));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });
}

export interface NearbyGym {
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance: number;
}

export function formatDistance(m: number): string {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(2)} km`;
}

export async function fetchNearbyGyms(lat: number, lng: number, radiusM = 1500): Promise<NearbyGym[]> {
  // Agora chama a server function, que roda no servidor (sem CORS)
  const gyms = await fetchNearbyGymsFn({ data: { lat, lng, radiusM } });
  return gyms as NearbyGym[];
}
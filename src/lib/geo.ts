/**
 * Geolocation que funciona no iOS Safari.
 *
 * REGRA CRÍTICA: o iOS só dispara o popup nativo de permissão se
 * `navigator.geolocation.getCurrentPosition` for chamado SINCRONAMENTE
 * dentro do mesmo tick do user gesture (clique). Por isso esta função
 * NÃO pode ser awaitada antes de ser invocada — quem chama deve usá-la
 * como primeira coisa dentro do onClick.
 */
export interface GeoResult {
  lat: number;
  lng: number;
  accuracy: number;
}

export function requestLocation(): Promise<GeoResult> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocalização não suportada neste navegador."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
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

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function fetchNearbyGyms(
  lat: number,
  lng: number,
  radiusM: number
): Promise<NearbyGym[]> {
  const query = `
    [out:json][timeout:25];
    (
      node["leisure"="fitness_centre"](around:${radiusM},${lat},${lng});
      way["leisure"="fitness_centre"](around:${radiusM},${lat},${lng});
      node["sport"="fitness"](around:${radiusM},${lat},${lng});
      node["amenity"="gym"](around:${radiusM},${lat},${lng});
    );
    out center tags;
  `;
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });
  if (!res.ok) throw new Error("Falha ao consultar academias próximas.");
  const data = await res.json();
  const gyms: NearbyGym[] = (data.elements || [])
    .map((el: any) => {
      const elat = el.lat ?? el.center?.lat;
      const elng = el.lon ?? el.center?.lon;
      if (typeof elat !== "number" || typeof elng !== "number") return null;
      const tags = el.tags || {};
      const addr = [tags["addr:street"], tags["addr:housenumber"], tags["addr:suburb"]]
        .filter(Boolean)
        .join(", ");
      return {
        name: tags.name || "Academia",
        address: addr || tags["addr:full"] || "Endereço não disponível",
        lat: elat,
        lng: elng,
        distance: haversine(lat, lng, elat, elng),
      };
    })
    .filter(Boolean) as NearbyGym[];
  return gyms.sort((a, b) => a.distance - b.distance);
}

export function formatDistance(m: number): string {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(2)} km`;
}
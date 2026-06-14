// src/lib/geo.functions.ts
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

interface NearbyGym {
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

export const fetchNearbyGymsFn = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      lat: z.number(),
      lng: z.number(),
      radiusM: z.number().optional().default(1500),
    }).parse(input)
  )
  .handler(async ({ data }) => {
    const { lat, lng, radiusM } = data;
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
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if (!res.ok) throw new Error("Falha ao consultar academias próximas.");
    const dataJson = await res.json();
    const gyms: NearbyGym[] = (dataJson.elements || [])
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
  });
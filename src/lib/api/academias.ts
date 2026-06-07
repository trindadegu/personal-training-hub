import type { Academia } from "../types";
import {
  listAcademiasPublicFn,
  listAcademiasAdminFn,
  createAcademiaFn,
  updateAcademiaFn,
  deleteAcademiaFn,
} from "./academias.functions";

export async function listAcademiasPublic(): Promise<Academia[]> {
  return ((await listAcademiasPublicFn()) ?? []) as Academia[];
}
export async function listAcademiasAdmin(): Promise<Academia[]> {
  return ((await listAcademiasAdminFn()) ?? []) as Academia[];
}
export async function createAcademia(input: {
  nome: string;
  endereco?: string | null;
  lat: number;
  lng: number;
  raio_metros?: number;
  ativo?: boolean;
}): Promise<void> {
  await createAcademiaFn({ data: input });
}
export async function updateAcademia(
  id: string,
  patch: Partial<{
    nome: string;
    endereco: string | null;
    lat: number;
    lng: number;
    raio_metros: number;
    ativo: boolean;
  }>,
): Promise<void> {
  await updateAcademiaFn({ data: { id, patch: patch as any } });
}
export async function deleteAcademia(id: string): Promise<void> {
  await deleteAcademiaFn({ data: { id } });
}

/** Geocoding via OpenStreetMap (Nominatim). Sem chave de API. */
export async function geocodeAddress(query: string): Promise<
  Array<{ display: string; lat: number; lng: number }>
> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { "Accept-Language": "pt-BR" },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as Array<{ display_name: string; lat: string; lon: string }>;
  return data.map((d) => ({
    display: d.display_name,
    lat: Number(d.lat),
    lng: Number(d.lon),
  }));
}
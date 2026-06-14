import { c as createServerRpc } from "./createServerRpc-BBFx9diD.mjs";
import { c as createServerFn } from "./server-DVxLX_uO.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "util";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371e3;
  const toRad = (v) => v * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
const fetchNearbyGymsFn_createServerFn_handler = createServerRpc({
  id: "6dc08a1185c6ebab9acfc6c17ab3fb4cba4e5827d7ddfd784872c77808467bf4",
  name: "fetchNearbyGymsFn",
  filename: "src/lib/geo.functions.ts"
}, (opts) => fetchNearbyGymsFn.__executeServer(opts));
const fetchNearbyGymsFn = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  lat: numberType(),
  lng: numberType(),
  radiusM: numberType().optional().default(1500)
}).parse(input)).handler(fetchNearbyGymsFn_createServerFn_handler, async ({
  data
}) => {
  const {
    lat,
    lng,
    radiusM
  } = data;
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
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  if (!res.ok) throw new Error("Falha ao consultar academias próximas.");
  const dataJson = await res.json();
  const gyms = (dataJson.elements || []).map((el) => {
    const elat = el.lat ?? el.center?.lat;
    const elng = el.lon ?? el.center?.lon;
    if (typeof elat !== "number" || typeof elng !== "number") return null;
    const tags = el.tags || {};
    const addr = [tags["addr:street"], tags["addr:housenumber"], tags["addr:suburb"]].filter(Boolean).join(", ");
    return {
      name: tags.name || "Academia",
      address: addr || tags["addr:full"] || "Endereço não disponível",
      lat: elat,
      lng: elng,
      distance: haversine(lat, lng, elat, elng)
    };
  }).filter(Boolean);
  return gyms.sort((a, b) => a.distance - b.distance);
});
export {
  fetchNearbyGymsFn_createServerFn_handler
};

import { supabase } from "@/integrations/supabase/client";
import type { Checkin } from "../types";

export interface NewCheckin {
  aluno_id: string;
  aluno_nome: string;
  gym_name: string;
  gym_address: string;
  distance_m: number;
  lat_aluno: number;
  lng_aluno: number;
  lat_gym: number;
  lng_gym: number;
}

export async function createCheckin(c: NewCheckin): Promise<Checkin> {
  const { data, error } = await supabase.from("checkins").insert(c).select().single();
  if (error) throw error;
  return data as Checkin;
}

export async function listCheckins(alunoId?: string): Promise<Checkin[]> {
  let q = supabase.from("checkins").select("*").order("created_at", { ascending: false });
  if (alunoId) q = q.eq("aluno_id", alunoId);
  const { data, error } = await q.limit(500);
  if (error) throw error;
  return (data ?? []) as Checkin[];
}

export async function lastCheckinForStudent(alunoId: string): Promise<Checkin | null> {
  const { data, error } = await supabase
    .from("checkins")
    .select("*")
    .eq("aluno_id", alunoId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data as Checkin) ?? null;
}

export async function checkinToday(alunoId: string): Promise<Checkin | null> {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const { data, error } = await supabase
    .from("checkins")
    .select("*")
    .eq("aluno_id", alunoId)
    .gte("created_at", start.toISOString())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data as Checkin) ?? null;
}
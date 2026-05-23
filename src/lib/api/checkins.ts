import type { Checkin } from "../types";
import {
  createCheckinFn,
  listCheckinsAdminFn,
  lastCheckinForStudentFn,
  checkinTodayFn,
} from "./checkins.functions";

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
  return (await createCheckinFn({ data: c })) as Checkin;
}

export async function listCheckins(alunoId?: string): Promise<Checkin[]> {
  return ((await listCheckinsAdminFn({ data: { alunoId } })) ?? []) as Checkin[];
}

export async function lastCheckinForStudent(alunoId: string): Promise<Checkin | null> {
  return ((await lastCheckinForStudentFn({ data: { alunoId } })) as Checkin | null) ?? null;
}

export async function checkinToday(alunoId: string): Promise<Checkin | null> {
  return ((await checkinTodayFn({ data: { alunoId } })) as Checkin | null) ?? null;
}
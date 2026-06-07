import type { Plano } from "../types";
import {
  listPlanosPublicFn,
  listPlanosAdminFn,
  createPlanoFn,
  updatePlanoFn,
  deletePlanoFn,
} from "./planos.functions";

export async function listPlanosPublic(): Promise<Plano[]> {
  return ((await listPlanosPublicFn()) ?? []) as Plano[];
}
export async function listPlanosAdmin(): Promise<Plano[]> {
  return ((await listPlanosAdminFn()) ?? []) as Plano[];
}
export async function createPlano(input: {
  nome: string;
  descricao?: string | null;
  preco_mensal: number;
  beneficios: string[];
  ordem?: number;
  ativo?: boolean;
}): Promise<void> {
  await createPlanoFn({ data: input });
}
export async function updatePlano(
  id: string,
  patch: Partial<{
    nome: string;
    descricao: string | null;
    preco_mensal: number;
    beneficios: string[];
    ordem: number;
    ativo: boolean;
  }>,
): Promise<void> {
  await updatePlanoFn({ data: { id, patch: patch as any } });
}
export async function deletePlano(id: string): Promise<void> {
  await deletePlanoFn({ data: { id } });
}
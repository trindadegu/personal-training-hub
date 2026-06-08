import {
  myProfileFn,
  myPlanoFn,
  myPagamentosFn,
  myNotasFn,
  updateMyProfileFn,
  uploadMyAvatarFn,
  avatarSignedUrlFn,
} from "./me.functions";
import type { Aluno, Plano } from "../types";
import type { Pagamento } from "./pagamentos";
import type { Nota } from "./notas";

export async function getMyProfile(): Promise<Aluno | null> {
  return ((await myProfileFn()) as Aluno | null) ?? null;
}
export async function getMyPlano(): Promise<Plano | null> {
  return ((await myPlanoFn()) as Plano | null) ?? null;
}
export async function getMyPagamentos(): Promise<Pagamento[]> {
  return ((await myPagamentosFn()) as Pagamento[]) ?? [];
}
export async function getMyNotas(): Promise<Nota[]> {
  return ((await myNotasFn()) as Nota[]) ?? [];
}
export async function updateMyProfile(patch: { telefone?: string | null; objetivo?: string | null }): Promise<void> {
  await updateMyProfileFn({ data: patch });
}
export async function uploadMyAvatar(base64: string, mime: string): Promise<void> {
  await uploadMyAvatarFn({ data: { base64, mime } });
}
export async function getAvatarSignedUrl(alunoId: string): Promise<string | null> {
  return (await avatarSignedUrlFn({ data: { alunoId } })) as string | null;
}
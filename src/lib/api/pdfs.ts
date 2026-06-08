import {
  listPdfsAdminFn,
  listMyPdfsFn,
  uploadPdfAdminFn,
  deletePdfAdminFn,
} from "./pdfs.functions";
import type { TreinoPdf } from "../types";

export async function listPdfsAdmin(alunoId: string): Promise<TreinoPdf[]> {
  return ((await listPdfsAdminFn({ data: { alunoId } })) ?? []) as TreinoPdf[];
}
export async function listMyPdfs(): Promise<TreinoPdf[]> {
  return ((await listMyPdfsFn()) ?? []) as TreinoPdf[];
}
export async function uploadPdf(input: {
  alunoId: string;
  nome: string;
  descricao?: string | null;
  base64: string;
}): Promise<void> {
  await uploadPdfAdminFn({ data: input });
}
export async function deletePdf(id: string): Promise<void> {
  await deletePdfAdminFn({ data: { id } });
}
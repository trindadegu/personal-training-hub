import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Camera, Save, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getMyProfile,
  getMyPlano,
  updateMyProfile,
  uploadMyAvatar,
  getAvatarSignedUrl,
} from "@/lib/api/me";
import { listMyPdfs } from "@/lib/api/pdfs";
import { formatBRL, formatDateBR } from "@/lib/api/config";

export const Route = createFileRoute("/aluno/perfil")({
  component: PerfilPage,
});

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(r.error);
    r.onload = () => resolve(String(r.result));
    r.readAsDataURL(file);
  });
}

function PerfilPage() {
  const qc = useQueryClient();
  const { data: aluno } = useQuery({ queryKey: ["my-profile"], queryFn: getMyProfile });
  const { data: plano } = useQuery({ queryKey: ["my-plano"], queryFn: getMyPlano });
  const { data: pdfs = [] } = useQuery({ queryKey: ["my-pdfs"], queryFn: listMyPdfs });
  const { data: avatarUrl } = useQuery({
    queryKey: ["my-avatar", aluno?.id, aluno?.foto_url],
    queryFn: () => (aluno ? getAvatarSignedUrl(aluno.id) : Promise.resolve(null)),
    enabled: !!aluno?.foto_url,
  });

  const [telefone, setTelefone] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (aluno) {
      setTelefone(aluno.telefone ?? "");
      setObjetivo(aluno.objetivo ?? "");
    }
  }, [aluno]);

  if (!aluno) return <p className="text-sm text-muted-foreground">Carregando...</p>;

  async function save() {
    setSaving(true);
    try {
      await updateMyProfile({ telefone: telefone || null, objetivo: objetivo || null });
      toast.success("Perfil atualizado");
      qc.invalidateQueries({ queryKey: ["my-profile"] });
    } catch (e: any) {
      toast.error(e?.message ?? "Erro");
    } finally {
      setSaving(false);
    }
  }

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Imagem muito grande (máx 5 MB)");
      return;
    }
    try {
      const b64 = await fileToBase64(f);
      await uploadMyAvatar(b64, f.type);
      toast.success("Foto atualizada");
      qc.invalidateQueries({ queryKey: ["my-profile"] });
      qc.invalidateQueries({ queryKey: ["my-avatar"] });
    } catch (err: any) {
      toast.error(err?.message ?? "Falha no upload");
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="relative grid h-20 w-20 place-items-center overflow-hidden rounded-full border-2 border-primary/30 bg-muted"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="font-display text-2xl font-bold text-muted-foreground">
                  {aluno.nome.charAt(0).toUpperCase()}
                </span>
              )}
              <span className="absolute bottom-0 right-0 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                <Camera className="h-3 w-3" />
              </span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handlePhoto}
            />
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-bold leading-tight">{aluno.nome}</p>
              <p className="text-xs text-muted-foreground">
                Aluno desde {formatDateBR(aluno.created_at.slice(0, 10))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base">Dados pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label>Telefone</Label>
            <Input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(DDD) 9XXXX-XXXX"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Objetivo</Label>
            <Textarea
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              placeholder="O que você quer alcançar com os treinos?"
              rows={3}
            />
          </div>
          <Button onClick={save} disabled={saving}>
            <Save className="h-4 w-4" /> Salvar
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base">Plano contratado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {plano ? (
            <>
              <p className="font-display text-lg font-bold">{plano.nome}</p>
              <p className="text-sm text-muted-foreground">{plano.descricao}</p>
              <p className="mt-2 text-sm">
                Valor mensal:{" "}
                <span className="font-semibold">
                  {formatBRL(Number(plano.preco_mensal))}
                </span>
              </p>
              {aluno.dia_vencimento && (
                <p className="text-sm text-muted-foreground">
                  Vence todo dia {aluno.dia_vencimento}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum plano vinculado.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base">PDFs do treino</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {pdfs.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              Nenhum PDF anexado pelo professor.
            </p>
          ) : (
            pdfs.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-xl border border-border p-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{p.nome}</p>
                    {p.descricao && (
                      <p className="truncate text-xs text-muted-foreground">
                        {p.descricao}
                      </p>
                    )}
                  </div>
                </div>
                {p.signed_url && (
                  <a
                    href={p.signed_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                  >
                    <Download className="h-3.5 w-3.5" /> Abrir
                  </a>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
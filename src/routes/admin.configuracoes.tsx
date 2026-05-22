import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminConfig, updateAdminConfig } from "@/lib/api/auth";
import { getConfig, setConfig } from "@/lib/api/config";

export const Route = createFileRoute("/admin/configuracoes")({
  component: ConfigPage,
});

function ConfigPage() {
  const qc = useQueryClient();
  const { data: cfg } = useQuery({ queryKey: ["admin-config"], queryFn: getAdminConfig });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (cfg) {
      setUsername(cfg.username);
      setPassword(cfg.password);
      setWhatsapp(cfg.whatsapp ?? "");
    }
  }, [cfg]);

  const { data: msgTpl } = useQuery({ queryKey: ["cfg-msg"], queryFn: () => getConfig("mensagem_cobranca") });
  const [mensagem, setMensagem] = useState("");
  useEffect(() => { if (msgTpl) setMensagem(msgTpl); }, [msgTpl]);

  async function save() {
    setSaving(true);
    try {
      await updateAdminConfig({ username: username.trim(), password, whatsapp: whatsapp.trim() });
      if (mensagem.trim()) await setConfig("mensagem_cobranca", mensagem);
      toast.success("Configurações salvas!");
      qc.invalidateQueries({ queryKey: ["admin-config"] });
      qc.invalidateQueries({ queryKey: ["cfg-msg"] });
    } catch (err: any) {
      toast.error(err?.message ?? "Erro.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">Credenciais do admin e contato.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base">Credenciais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Usuário</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Senha</Label>
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Mostrar senha"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>WhatsApp para contato (somente dígitos com DDI)</Label>
            <Input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
              placeholder="5585981521490"
              inputMode="numeric"
            />
            <p className="text-xs text-muted-foreground">
              Usado quando o aluno clica em &quot;Esqueci minha senha&quot;.
            </p>
          </div>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Salvar
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-base">Mensagem de cobrança no WhatsApp</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Variáveis disponíveis: <code>{"{nome}"}</code>, <code>{"{mes}"}</code>, <code>{"{valor}"}</code>, <code>{"{vencimento}"}</code>.
          </p>
          <Textarea rows={5} value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
          <Button onClick={save} disabled={saving}>
            <Save className="h-4 w-4" /> Salvar mensagem
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Dumbbell, MapPin, LineChart, ArrowRight, Check, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { getAdminSession, getStudentSession } from "@/lib/session";
import { listPlanosPublic } from "@/lib/api/planos";
import { getAdminWhatsapp } from "@/lib/api/admin-contact";
import { formatBRL } from "@/lib/api/config";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { data: planos = [] } = useQuery({
    queryKey: ["planos-public"],
    queryFn: listPlanosPublic,
  });
  const [leadOpen, setLeadOpen] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState<{ id: string; nome: string } | null>(null);
  const [leadNome, setLeadNome] = useState("");
  const [leadTel, setLeadTel] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [sending, setSending] = useState(false);
  useEffect(() => {
    if (getAdminSession()) navigate({ to: "/admin" });
    else if (getStudentSession()) navigate({ to: "/aluno" });
  }, [navigate]);

  function openLead(p: { id: string; nome: string }) {
    setPlanoSelecionado(p);
    setLeadNome("");
    setLeadTel("");
    setLeadEmail("");
    setLeadOpen(true);
  }

  async function enviarLead() {
    const schema = z.object({
      nome: z.string().trim().min(2, "Informe seu nome").max(120),
      telefone: z.string().trim().min(8, "Telefone inválido").max(40),
      email: z.string().trim().email("E-mail inválido").max(160),
    });
    const parsed = schema.safeParse({ nome: leadNome, telefone: leadTel, email: leadEmail });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }
    if (!planoSelecionado) return;
    setSending(true);
    try {
      const numero = (await getAdminWhatsapp()).replace(/\D/g, "");
      if (!numero) {
        toast.error("WhatsApp do professor não configurado.");
        return;
      }
      const msg =
        `Olá! Tenho interesse em contratar um plano.\n\n` +
        `Nome: ${parsed.data.nome}\n` +
        `Telefone: ${parsed.data.telefone}\n` +
        `E-mail: ${parsed.data.email}\n` +
        `Plano escolhido: ${planoSelecionado.nome}\n\n` +
        `Gostaria de mais informações e dar continuidade à contratação.\n\nObrigado!`;
      window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, "_blank");
      setLeadOpen(false);
      toast.success("Solicitação enviada! Em breve o professor entrará em contato.");
    } catch (err: any) {
      toast.error(err?.message ?? "Falha ao enviar.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
            <Dumbbell className="h-4 w-4" />
          </span>
          Atlântida
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm">
            <Link to="/login">Entrar</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-20 pt-12 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Acessoria Atlântida
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
            Treinos que você acompanha do{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              bolso
            </span>
            .
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Plano semanal personalizado, check-in na academia em um toque e o
            histórico do mês inteiro na palma da mão.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link to="/login">
                Acessar minha conta
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-20 grid max-w-5xl gap-4 md:grid-cols-3"
        >
          {[
            {
              icon: Dumbbell,
              title: "Treino do dia",
              desc: "Foco, exercícios, séries, vídeos e progresso em tempo real.",
            },
            {
              icon: MapPin,
              title: "Check-in com GPS",
              desc: "Confirme presença direto na academia mais próxima.",
            },
            {
              icon: LineChart,
              title: "Histórico mensal",
              desc: "Calendário, sequência e estatísticas de adesão.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow-md)]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </motion.div>

        {planos.length > 0 && (
          <motion.section
            id="planos"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-24 max-w-6xl"
          >
            <div className="text-center">
              <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                Planos
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
                Escolha como quer ser acompanhado
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Do treino solo ao acompanhamento completo com nutrição.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {planos.map((p, i) => {
                const destaque = i === 1;
                return (
                  <div
                    key={p.id}
                    className={`relative flex flex-col rounded-3xl border p-6 shadow-[var(--shadow-sm)] transition ${
                      destaque
                        ? "border-primary/60 bg-card shadow-[var(--shadow-lg)]"
                        : "border-border bg-card"
                    }`}
                  >
                    {destaque && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[image:var(--gradient-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                        Mais popular
                      </span>
                    )}
                    <h3 className="font-display text-xl font-bold">{p.nome}</h3>
                    {p.descricao && (
                      <p className="mt-1 text-sm text-muted-foreground">{p.descricao}</p>
                    )}
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold">
                        {formatBRL(Number(p.preco_mensal))}
                      </span>
                      <span className="text-sm text-muted-foreground">/mês</span>
                    </div>
                    <ul className="mt-5 flex-1 space-y-2 text-sm">
                      {(p.beneficios ?? []).map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-6 w-full"
                      variant={destaque ? "default" : "outline"}
                      onClick={() => openLead({ id: p.id, nome: p.nome })}
                    >
                      Quero esse plano
                    </Button>
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}
      </main>

      <Dialog open={leadOpen} onOpenChange={setLeadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">
              Quero o {planoSelecionado?.nome}
            </DialogTitle>
            <DialogDescription>
              Preencha seus dados e abriremos o WhatsApp do professor com sua mensagem pronta.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="lead-nome">Nome completo</Label>
              <Input id="lead-nome" value={leadNome} onChange={(e) => setLeadNome(e.target.value)} placeholder="Seu nome" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-tel">Telefone</Label>
              <Input id="lead-tel" value={leadTel} onChange={(e) => setLeadTel(e.target.value)} placeholder="(85) 99999-9999" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-email">E-mail</Label>
              <Input id="lead-email" type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="voce@email.com" />
            </div>
            <p className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
              Após confirmação, o professor criará seu acesso e enviará a senha.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLeadOpen(false)}>Cancelar</Button>
            <Button onClick={enviarLead} disabled={sending}>
              <MessageCircle className="h-4 w-4" /> Continuar no WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

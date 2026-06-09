import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Dumbbell, Eye, EyeOff, Loader2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { WhatsappFab } from "@/components/app/whatsapp-fab";
import { listStudentsPublic } from "@/lib/api/students";
import { loginAdmin, loginStudent, getAdminWhatsapp } from "@/lib/api/auth";
import { setAdminSession, setStudentSession } from "@/lib/session";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Entrar — Acessoria Atlântida" },
      {
        name: "description",
        content:
          "Acesse sua conta de aluno ou de professor na Acessoria Atlântida para ver treinos, check-ins e pagamentos.",
      },
      { property: "og:title", content: "Entrar — Acessoria Atlântida" },
      {
        property: "og:description",
        content: "Acesse sua conta de aluno ou professor.",
      },
      { property: "og:url", content: "https://acessoriaatlantida.lovable.app/login" },
    ],
    links: [{ rel: "canonical", href: "https://acessoriaatlantida.lovable.app/login" }],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"admin" | "student">("admin");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-[image:var(--gradient-primary)] opacity-20 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-accent opacity-15 blur-3xl" />
      </div>

      <div className="absolute left-4 top-4">
        <Button asChild variant="ghost" size="sm" className="gap-1.5">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="mb-8 flex items-center justify-center gap-2 font-display text-xl font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
            <Dumbbell className="h-5 w-5" />
          </span>
          Atlântida
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lg)] md:p-8">
          <Tabs value={tab} onValueChange={(v) => setTab(v as "admin" | "student")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="student">Aluno</TabsTrigger>
            </TabsList>
            <TabsContent value="admin" className="pt-6">
              <AdminLoginForm onDone={() => navigate({ to: "/admin" })} />
            </TabsContent>
            <TabsContent value="student" className="pt-6">
              <StudentLoginForm onDone={() => navigate({ to: "/aluno" })} />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>

      <WhatsappFab message="Olá! Preciso de ajuda para entrar no app de treinos." />
    </div>
  );
}

function AdminLoginForm({ onDone }: { onDone: () => void }) {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: adminWpp } = useQuery({
    queryKey: ["admin-whatsapp-public"],
    queryFn: getAdminWhatsapp,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = await loginAdmin(user.trim(), pwd);
      if (!ok) {
        toast.error("Usuário ou senha incorretos.");
        return;
      }
      setAdminSession(user.trim());
      toast.success("Bem-vindo!");
      onDone();
    } catch (err: any) {
      toast.error(err?.message ?? "Erro ao entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="user">Usuário</Label>
        <Input id="user" value={user} onChange={(e) => setUser(e.target.value)} required autoComplete="username" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="pwd">Senha</Label>
        <div className="relative">
          <Input
            id="pwd"
            type={show ? "text" : "password"}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            autoComplete="current-password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Mostrar/ocultar senha"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar como admin"}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2 border-[#25D366]/40 text-[#1ebe5b] hover:bg-[#25D366]/10 hover:text-[#1ebe5b]"
        onClick={() => {
          const wpp = (adminWpp ?? "").replace(/\D/g, "");
          if (!wpp) {
            toast.error("WhatsApp do professor não configurado.");
            return;
          }
          const msg = encodeURIComponent("Olá! Estou com problema para acessar o painel admin.");
          window.open(`https://wa.me/${wpp}?text=${msg}`, "_blank");
        }}
      >
        <MessageCircle className="h-4 w-4" /> Precisa de ajuda? Falar no WhatsApp
      </Button>
    </form>
  );
}

function StudentLoginForm({ onDone }: { onDone: () => void }) {
  const [studentId, setStudentId] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: students = [] } = useQuery({
    queryKey: ["alunos-public"],
    queryFn: listStudentsPublic,
  });

  const { data: adminWpp } = useQuery({ queryKey: ["admin-whatsapp-public"], queryFn: getAdminWhatsapp });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const aluno = await loginStudent(studentId, pwd);
      if (!aluno) {
        toast.error("Aluno ou senha incorretos.");
        return;
      }
      setStudentSession(aluno.id, aluno.nome);
      toast.success(`Olá, ${aluno.nome}!`);
      onDone();
    } catch (err: any) {
      toast.error(err?.message ?? "Erro ao entrar.");
    } finally {
      setLoading(false);
    }
  }

  function forgot() {
    const wpp = adminWpp ?? "5585981521490";
    const msg = encodeURIComponent("Olá! Esqueci minha senha do app de treinos.");
    window.open(`https://wa.me/${wpp}?text=${msg}`, "_blank");
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2">
        <Label>Seu nome</Label>
        <Select value={studentId} onValueChange={setStudentId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione seu nome" />
          </SelectTrigger>
          <SelectContent>
            {students.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground">Nenhum aluno cadastrado.</div>
            ) : (
              students.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.nome}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="spwd">Senha (6 dígitos)</Label>
        <div className="relative">
          <Input
            id="spwd"
            type={show ? "text" : "password"}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            inputMode="numeric"
            maxLength={6}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Mostrar/ocultar senha"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading || !studentId}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={forgot}
        className="w-full gap-2 border-[#25D366]/40 text-[#1ebe5b] hover:bg-[#25D366]/10 hover:text-[#1ebe5b]"
      >
        <MessageCircle className="h-4 w-4" /> Esqueci minha senha — falar com o professor
      </Button>
    </form>
  );
}
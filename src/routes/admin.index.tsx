import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Users, Dumbbell, MapPin, Activity, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listStudents } from "@/lib/api/students";
import { listCheckins } from "@/lib/api/checkins";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

async function countHistorico() {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  const { count, error } = await supabase
    .from("treino_historico")
    .select("*", { count: "exact", head: true })
    .gte("data", start.toISOString().slice(0, 10));
  if (error) throw error;
  return count ?? 0;
}

function AdminDashboard() {
  const { data: alunos = [] } = useQuery({ queryKey: ["alunos"], queryFn: listStudents });
  const { data: checkins = [] } = useQuery({ queryKey: ["checkins"], queryFn: () => listCheckins() });
  const { data: treinosMes = 0 } = useQuery({ queryKey: ["treinos-mes"], queryFn: countHistorico });

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const checkinsHoje = checkins.filter((c) => new Date(c.created_at) >= start).length;

  const stats = [
    { label: "Alunos", value: alunos.length, icon: Users, hint: "ativos no painel" },
    { label: "Check-ins hoje", value: checkinsHoje, icon: MapPin, hint: `${checkins.length} no total` },
    { label: "Treinos no mês", value: treinosMes, icon: Activity, hint: "registrados no histórico" },
    { label: "Treino padrão", value: "1", icon: Dumbbell, hint: "modelo aplicável" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Visão geral</h1>
        <p className="text-sm text-muted-foreground">Um panorama rápido da sua operação.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-hidden border-border/60">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-3 font-display text-3xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.hint}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <QuickLink to="/admin/alunos" title="Gerenciar alunos" desc="Adicione, edite ou remova alunos." icon={Users} />
        <QuickLink to="/admin/treinos" title="Montar treinos" desc="Edite o treino semanal de cada aluno." icon={Dumbbell} />
        <QuickLink to="/admin/checkins" title="Ver check-ins" desc="Consulte histórico e localizações." icon={MapPin} />
        <QuickLink to="/admin/padrao" title="Treino padrão" desc="Modelo aplicado a novos alunos." icon={Activity} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Últimos check-ins</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {checkins.slice(0, 6).map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border border-border/60 p-3 text-sm">
              <div>
                <p className="font-medium">{c.aluno_nome}</p>
                <p className="text-xs text-muted-foreground">
                  {c.gym_name}
                  {c.distance_m != null ? ` · ${c.distance_m} m` : ""}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(c.created_at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
              </p>
            </div>
          ))}
          {checkins.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">Nenhum check-in ainda.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function QuickLink({
  to,
  title,
  desc,
  icon: Icon,
}: {
  to: "/admin/alunos" | "/admin/treinos" | "/admin/checkins" | "/admin/padrao";
  title: string;
  desc: string;
  icon: typeof Users;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-card/80"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-md)]">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
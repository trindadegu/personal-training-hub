import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Dumbbell, MapPin, LineChart, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { getAdminSession, getStudentSession } from "@/lib/session";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getAdminSession()) navigate({ to: "/admin" });
    else if (getStudentSession()) navigate({ to: "/aluno" });
  }, [navigate]);

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
      </main>
    </div>
  );
}

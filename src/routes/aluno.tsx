import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { clearStudentSession, getStudentSession } from "@/lib/session";
import { Dumbbell, LogOut } from "lucide-react";

export const Route = createFileRoute("/aluno")({
  component: AlunoPage,
});

function AlunoPage() {
  const navigate = useNavigate();
  const session = typeof window !== "undefined" ? getStudentSession() : null;

  useEffect(() => {
    if (!session) navigate({ to: "/login" });
  }, [session, navigate]);

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
              <Dumbbell className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">Olá,</p>
              <p className="font-display font-semibold leading-none">{session.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                clearStudentSession();
                navigate({ to: "/login" });
              }}
              aria-label="Sair"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-md)]">
          <h1 className="font-display text-2xl font-bold">Sua área pessoal</h1>
          <p className="mt-3 text-muted-foreground">
            O treino do dia, check-in com GPS e o histórico mensal serão liberados na próxima
            etapa. A base do sistema (login, banco, design e a correção do check-in para iPhone)
            já está pronta — peça a continuação para eu montar essas telas.
          </p>
        </div>
      </main>
    </div>
  );
}
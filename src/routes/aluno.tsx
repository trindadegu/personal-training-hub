import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { clearStudentSession, getStudentSession, type StudentSession } from "@/lib/session";
import { CalendarDays, Dumbbell, LogOut } from "lucide-react";

export const Route = createFileRoute("/aluno")({
  component: AlunoLayout,
});

function AlunoLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState<StudentSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = getStudentSession();
    setSession(s);
    setReady(true);
    if (!s) navigate({ to: "/login" });
  }, [navigate]);

  if (!ready || !session) return null;

  const tabs = [
    { to: "/aluno", label: "Treino", icon: Dumbbell, exact: true },
    { to: "/aluno/historico", label: "Histórico", icon: CalendarDays, exact: false },
  ] as const;

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-md)]">
              <Dumbbell className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Olá,</p>
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

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur">
        <div className="container mx-auto grid max-w-md grid-cols-2 px-4 py-2">
          {tabs.map((t) => {
            const active = t.exact
              ? location.pathname === t.to
              : location.pathname.startsWith(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
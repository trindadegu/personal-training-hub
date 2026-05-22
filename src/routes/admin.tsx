import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Users,
  Dumbbell,
  LayoutDashboard,
  ClipboardList,
  MapPin,
  Settings,
  LogOut,
  Menu,
  Wallet,
  Wallet2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { clearAdminSession, getAdminSession } from "@/lib/session";
import type { AdminSession } from "@/lib/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Visão geral", icon: LayoutDashboard, exact: true },
  { to: "/admin/alunos", label: "Alunos", icon: Users, exact: false },
  { to: "/admin/treinos", label: "Treinos", icon: Dumbbell, exact: false },
  { to: "/admin/padrao", label: "Treino padrão", icon: ClipboardList, exact: false },
  { to: "/admin/checkins", label: "Check-ins", icon: MapPin, exact: false },
  { to: "/admin/financeiro", label: "Financeiro · Negócio", icon: Wallet, exact: false },
  { to: "/admin/pessoal", label: "Financeiro · Pessoal", icon: Wallet2, exact: false },
  { to: "/admin/configuracoes", label: "Configurações", icon: Settings, exact: false },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = getAdminSession();
    setSession(s);
    setReady(true);
    if (!s) navigate({ to: "/login" });
  }, [navigate]);

  if (!ready || !session) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
          <SidebarContent />
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Painel</p>
                <p className="font-display text-base font-semibold leading-none">Admin · {session.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Sair"
                onClick={() => {
                  clearAdminSession();
                  navigate({ to: "/login" });
                }}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <main className="container mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-6 md:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarContent() {
  const location = useLocation();
  return (
    <div className="flex h-full flex-col p-4">
      <Link to="/admin" className="mb-6 flex items-center gap-2 px-2 font-display text-lg font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-md)]">
          <Dumbbell className="h-4 w-4" />
        </span>
        Atlântida
      </Link>
      <nav className="flex-1 space-y-1">
        {NAV.map((n) => {
          const active = n.exact ? location.pathname === n.to : location.pathname.startsWith(n.to);
          const Icon = n.icon;
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {n.label}
            </Link>
          );
        })}
      </nav>
      <p className="px-3 pt-4 text-[10px] uppercase tracking-wider text-muted-foreground">
        v1 · Painel do personal
      </p>
    </div>
  );
}
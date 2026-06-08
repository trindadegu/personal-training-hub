import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Wallet, CheckCircle2, Clock, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getMyPagamentos, getMyPlano } from "@/lib/api/me";
import { formatBRL, formatDateBR } from "@/lib/api/config";
import { mesLabel } from "@/lib/api/pagamentos";
import { StripePagamentoCheckout } from "@/components/app/stripe-embedded-checkout";
import { hasPaymentsConfigured } from "@/lib/stripe";

export const Route = createFileRoute("/aluno/pagamentos")({
  validateSearch: (s: Record<string, unknown>): { paid?: string } => ({
    paid: typeof s.paid === "string" ? s.paid : undefined,
  }),
  component: PagamentosPage,
});

function PagamentosPage() {
  const { paid } = useSearch({ from: "/aluno/pagamentos" });
  const qc = useQueryClient();
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (paid) {
      toast.success("Pagamento processado! Atualizando…");
      setOpenId(null);
      // refetch in a few seconds to give webhook time to mark paid
      const t = setTimeout(() => {
        qc.invalidateQueries({ queryKey: ["my-pagamentos"] });
        qc.invalidateQueries({ queryKey: ["my-overdue"] });
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [paid, qc]);

  const { data: pagamentos = [] } = useQuery({
    queryKey: ["my-pagamentos"],
    queryFn: getMyPagamentos,
  });
  const { data: plano } = useQuery({ queryKey: ["my-plano"], queryFn: getMyPlano });

  const proxima = pagamentos.find((p) => p.status === "pendente");
  const canPay = hasPaymentsConfigured();

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-display text-2xl font-bold">Pagamentos</h1>
        <p className="text-sm text-muted-foreground">Histórico e próxima cobrança.</p>
      </header>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Plano atual
              </p>
              <p className="mt-1 font-display text-lg font-bold">
                {plano?.nome ?? "Sem plano vinculado"}
              </p>
              {plano && (
                <p className="text-sm text-muted-foreground">
                  {formatBRL(Number(plano.preco_mensal))} / mês
                </p>
              )}
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Wallet className="h-5 w-5" />
            </span>
          </div>
          {proxima && (
            <p className="mt-3 text-sm">
              <span className="text-muted-foreground">Próxima cobrança: </span>
              <span className="font-semibold">
                {formatDateBR(proxima.vencimento)} · {formatBRL(Number(proxima.valor))}
              </span>
            </p>
          )}
        </CardContent>
      </Card>

      <section className="space-y-2">
        <h2 className="px-1 text-sm font-semibold text-muted-foreground">Histórico</h2>
        {pagamentos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              Nenhum pagamento registrado.
            </CardContent>
          </Card>
        ) : (
          pagamentos.map((p) => {
            const atrasado =
              p.status === "pendente" &&
              new Date(p.vencimento) < new Date(new Date().toISOString().slice(0, 10));
            return (
              <Card key={p.id}>
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display font-semibold">
                      {mesLabel(p.mes_referencia)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Vence {formatDateBR(p.vencimento)} · {formatBRL(Number(p.valor))}
                    </p>
                    {p.pago_em && (
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                        Pago em {formatDateBR(p.pago_em)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase ${
                        p.status === "pago"
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                          : atrasado
                            ? "bg-destructive/15 text-destructive"
                            : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      {p.status === "pago" ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {p.status === "pago" ? "Pago" : atrasado ? "Atrasado" : "Pendente"}
                    </span>
                    {p.status === "pendente" && canPay && (
                      <Button
                        size="sm"
                        variant={atrasado ? "destructive" : "default"}
                        onClick={() => setOpenId(p.id)}
                      >
                        <CreditCard className="mr-1 h-3.5 w-3.5" />
                        Pagar agora
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </section>

      <Dialog open={!!openId} onOpenChange={(v) => !v && setOpenId(null)}>
        <DialogContent className="max-w-2xl p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Pagamento</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 sm:px-6 sm:pb-6">
            {openId && (
              <StripePagamentoCheckout
                pagamentoId={openId}
                returnUrl={`${window.location.origin}/aluno/pagamentos?paid=1`}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
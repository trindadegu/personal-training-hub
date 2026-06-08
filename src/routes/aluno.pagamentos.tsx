import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Wallet, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getMyPagamentos, getMyPlano } from "@/lib/api/me";
import { formatBRL, formatDateBR } from "@/lib/api/config";
import { mesLabel } from "@/lib/api/pagamentos";

export const Route = createFileRoute("/aluno/pagamentos")({
  component: PagamentosPage,
});

function PagamentosPage() {
  const { data: pagamentos = [] } = useQuery({
    queryKey: ["my-pagamentos"],
    queryFn: getMyPagamentos,
  });
  const { data: plano } = useQuery({ queryKey: ["my-plano"], queryFn: getMyPlano });

  const proxima = pagamentos.find((p) => p.status === "pendente");

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
                <CardContent className="flex items-center justify-between p-4">
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
                </CardContent>
              </Card>
            );
          })
        )}
      </section>
    </div>
  );
}
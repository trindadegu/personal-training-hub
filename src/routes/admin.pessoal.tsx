import { createFileRoute } from "@tanstack/react-router";
import { FinanceiroPanel } from "@/components/app/financeiro-panel";

export const Route = createFileRoute("/admin/pessoal")({
  component: () => <FinanceiroPanel escopo="pessoal" titulo="Financeiro · Pessoal" />,
});
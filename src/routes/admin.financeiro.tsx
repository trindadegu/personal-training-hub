import { createFileRoute } from "@tanstack/react-router";
import { FinanceiroPanel } from "@/components/app/financeiro-panel";

export const Route = createFileRoute("/admin/financeiro")({
  component: () => <FinanceiroPanel escopo="negocio" titulo="Financeiro · Negócio" />,
});
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-DIV666p3.mjs";
import { u as updateAdminConfig, e as getAdminConfig } from "./auth-BBDnHtYh.mjs";
import { s as setConfig, g as getConfig } from "./config-BwxWJN3e.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import { E as EyeOff, a as Eye, L as LoaderCircle, H as Save } from "../_libs/lucide-react.mjs";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "./router-DNEfQkU_.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "./createSsrRpc-BaOR-_gw.mjs";
import "./server-DVxLX_uO.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "./tslib.js";
import "../_libs/supabase__functions-js.mjs";
import "./stripe.server-Dfh-S32c.mjs";
import "../_libs/zod.mjs";
import "events";
import "http";
import "https";
import "./students.functions-SKg7Ok10.mjs";
function ConfigPage() {
  const qc = useQueryClient();
  const {
    data: cfg
  } = useQuery({
    queryKey: ["admin-config"],
    queryFn: getAdminConfig
  });
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [whatsapp, setWhatsapp] = reactExports.useState("");
  const [show, setShow] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (cfg) {
      setUsername(cfg.username);
      setWhatsapp(cfg.whatsapp ?? "");
    }
  }, [cfg]);
  const {
    data: msgTpl
  } = useQuery({
    queryKey: ["cfg-msg"],
    queryFn: () => getConfig("mensagem_cobranca")
  });
  const [mensagem, setMensagem] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (msgTpl) setMensagem(msgTpl);
  }, [msgTpl]);
  async function save() {
    setSaving(true);
    try {
      await updateAdminConfig({
        username: username.trim(),
        password: password.length > 0 ? password : void 0,
        whatsapp: whatsapp.trim()
      });
      if (mensagem.trim()) await setConfig("mensagem_cobranca", mensagem);
      toast.success("Configurações salvas!");
      setPassword("");
      qc.invalidateQueries({
        queryKey: ["admin-config"]
      });
      qc.invalidateQueries({
        queryKey: ["cfg-msg"]
      });
    } catch (err) {
      toast.error(err?.message ?? "Erro.");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight", children: "Configurações" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Credenciais do admin e contato." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Credenciais" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Usuário" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: username, onChange: (e) => setUsername(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nova senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: show ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), className: "pr-10", placeholder: "Deixe em branco para manter a atual", autoComplete: "new-password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow((s) => !s), className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", "aria-label": "Mostrar senha", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "WhatsApp para contato (somente dígitos com DDI)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: whatsapp, onChange: (e) => setWhatsapp(e.target.value.replace(/\D/g, "")), placeholder: "5585981521490", inputMode: "numeric" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: 'Usado quando o aluno clica em "Esqueci minha senha".' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving, children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          "Salvar"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Mensagem de cobrança no WhatsApp" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Variáveis disponíveis: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "{nome}" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "{mes}" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "{valor}" }),
          ", ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "{vencimento}" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 5, value: mensagem, onChange: (e) => setMensagem(e.target.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " Salvar mensagem"
        ] })
      ] })
    ] })
  ] });
}
export {
  ConfigPage as component
};

import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-fMRf3trd.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-B91GfZkm.mjs";
import { T as ThemeToggle } from "./theme-toggle-t8P3na68.mjs";
import { W as WhatsappFab } from "./whatsapp-fab-CLC2n_em.mjs";
import { l as listStudentsPublic } from "./students-DLnr-SLK.mjs";
import { l as loginAdmin, a as loginStudent, g as getAdminWhatsapp } from "./auth-BBDnHtYh.mjs";
import { s as setAdminSession, a as setStudentSession } from "./session-DWdtqcAN.mjs";
import "../_libs/seroval.mjs";
import "../_libs/stripe.mjs";
import { A as ArrowLeft, D as Dumbbell, E as EyeOff, a as Eye, L as LoaderCircle, M as MessageCircle } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/dotenv.mjs";
import "fs";
import "path";
import "os";
import "crypto";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "./tslib.js";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./types-DN-33vrr.mjs";
import "./createSsrRpc-BaOR-_gw.mjs";
import "./server-DVxLX_uO.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./students.functions-SKg7Ok10.mjs";
import "../_libs/zod.mjs";
import "./router-DNEfQkU_.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./stripe.server-Dfh-S32c.mjs";
import "events";
import "http";
import "https";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = reactExports.useState("admin");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 -z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -left-20 h-96 w-96 rounded-full bg-[image:var(--gradient-primary)] opacity-20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-accent opacity-15 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 top-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Voltar"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-4 top-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-8 flex items-center justify-center gap-2 font-display text-xl font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "h-5 w-5" }) }),
        "Atlântida"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-lg)] md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: tab, onValueChange: (v) => setTab(v), className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "admin", children: "Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "student", children: "Aluno" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "admin", className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoginForm, { onDone: () => navigate({
          to: "/admin"
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "student", className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StudentLoginForm, { onDone: () => navigate({
          to: "/aluno"
        }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsappFab, { message: "Olá! Preciso de ajuda para entrar no app de treinos." })
  ] });
}
function AdminLoginForm({
  onDone
}) {
  const [user, setUser] = reactExports.useState("");
  const [pwd, setPwd] = reactExports.useState("");
  const [show, setShow] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const {
    data: adminWpp
  } = useQuery({
    queryKey: ["admin-whatsapp-public"],
    queryFn: getAdminWhatsapp
  });
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = await loginAdmin(user.trim(), pwd);
      if (!ok) {
        toast.error("Usuário ou senha incorretos.");
        return;
      }
      setAdminSession(user.trim());
      toast.success("Bem-vindo!");
      onDone();
    } catch (err) {
      toast.error(err?.message ?? "Erro ao entrar.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user", children: "Usuário" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "user", value: user, onChange: (e) => setUser(e.target.value), required: true, autoComplete: "username" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pwd", children: "Senha" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "pwd", type: show ? "text" : "password", value: pwd, onChange: (e) => setPwd(e.target.value), required: true, autoComplete: "current-password", className: "pr-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow((s) => !s), className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", "aria-label": "Mostrar/ocultar senha", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Entrar como admin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", className: "w-full gap-2 border-[#25D366]/40 text-[#1ebe5b] hover:bg-[#25D366]/10 hover:text-[#1ebe5b]", onClick: () => {
      const wpp = (adminWpp ?? "").replace(/\D/g, "");
      if (!wpp) {
        toast.error("WhatsApp do professor não configurado.");
        return;
      }
      const msg = encodeURIComponent("Olá! Estou com problema para acessar o painel admin.");
      window.open(`https://wa.me/${wpp}?text=${msg}`, "_blank");
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
      " Precisa de ajuda? Falar no WhatsApp"
    ] })
  ] });
}
function StudentLoginForm({
  onDone
}) {
  const [studentId, setStudentId] = reactExports.useState("");
  const [pwd, setPwd] = reactExports.useState("");
  const [show, setShow] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const {
    data: students = []
  } = useQuery({
    queryKey: ["alunos-public"],
    queryFn: listStudentsPublic
  });
  const {
    data: adminWpp
  } = useQuery({
    queryKey: ["admin-whatsapp-public"],
    queryFn: getAdminWhatsapp
  });
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const aluno = await loginStudent(studentId, pwd);
      if (!aluno) {
        toast.error("Aluno ou senha incorretos.");
        return;
      }
      setStudentSession(aluno.id, aluno.nome);
      toast.success(`Olá, ${aluno.nome}!`);
      onDone();
    } catch (err) {
      toast.error(err?.message ?? "Erro ao entrar.");
    } finally {
      setLoading(false);
    }
  }
  function forgot() {
    const wpp = adminWpp ?? "5585981521490";
    const msg = encodeURIComponent("Olá! Esqueci minha senha do app de treinos.");
    window.open(`https://wa.me/${wpp}?text=${msg}`, "_blank");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Seu nome" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: studentId, onValueChange: setStudentId, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecione seu nome" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: students.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 text-sm text-muted-foreground", children: "Nenhum aluno cadastrado." }) : students.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.id, children: s.nome }, s.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "spwd", children: "Senha (6 dígitos)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "spwd", type: show ? "text" : "password", value: pwd, onChange: (e) => setPwd(e.target.value), required: true, inputMode: "numeric", maxLength: 6, className: "pr-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow((s) => !s), className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", "aria-label": "Mostrar/ocultar senha", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: loading || !studentId, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Entrar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", onClick: forgot, className: "w-full gap-2 border-[#25D366]/40 text-[#1ebe5b] hover:bg-[#25D366]/10 hover:text-[#1ebe5b]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
      " Esqueci minha senha — falar com o professor"
    ] })
  ] });
}
export {
  LoginPage as component
};

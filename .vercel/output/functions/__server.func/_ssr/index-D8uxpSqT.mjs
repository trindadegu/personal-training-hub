import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-Ci2xTPzf.mjs";
import { T as ThemeToggle } from "./theme-toggle-t8P3na68.mjs";
import { W as WhatsappFab, g as getAdminWhatsapp } from "./whatsapp-fab-CLC2n_em.mjs";
import { g as getAdminSession, d as getStudentSession } from "./session-DWdtqcAN.mjs";
import { l as listPlanosPublic } from "./planos-C6Ei3CbB.mjs";
import { f as formatBRL } from "./config-BwxWJN3e.mjs";
import "../_libs/seroval.mjs";
import { D as Dumbbell, o as ArrowRight, p as Award, q as Clock, i as Users, r as Star, l as MapPin, s as ChartLine, b as Check, M as MessageCircle } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "./types-DN-33vrr.mjs";
import "./createSsrRpc-BaOR-_gw.mjs";
import "./server-DVxLX_uO.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Index() {
  const navigate = useNavigate();
  const [sessionTarget, setSessionTarget] = reactExports.useState(null);
  const {
    data: planos = []
  } = useQuery({
    queryKey: ["planos-public"],
    queryFn: listPlanosPublic
  });
  const [leadOpen, setLeadOpen] = reactExports.useState(false);
  const [planoSelecionado, setPlanoSelecionado] = reactExports.useState(null);
  const [leadNome, setLeadNome] = reactExports.useState("");
  const [leadTel, setLeadTel] = reactExports.useState("");
  const [leadEmail, setLeadEmail] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (getAdminSession()) setSessionTarget("/admin");
    else if (getStudentSession()) setSessionTarget("/aluno");
  }, []);
  function openLead(p) {
    setPlanoSelecionado(p);
    setLeadNome("");
    setLeadTel("");
    setLeadEmail("");
    setLeadOpen(true);
  }
  async function enviarLead() {
    const schema = objectType({
      nome: stringType().trim().min(2, "Informe seu nome").max(120),
      telefone: stringType().trim().min(8, "Telefone inválido").max(40),
      email: stringType().trim().email("E-mail inválido").max(160)
    });
    const parsed = schema.safeParse({
      nome: leadNome,
      telefone: leadTel,
      email: leadEmail
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }
    if (!planoSelecionado) return;
    setSending(true);
    try {
      const numero = (await getAdminWhatsapp()).replace(/\D/g, "");
      if (!numero) {
        toast.error("WhatsApp do professor não configurado.");
        return;
      }
      const msg = `Olá! Tenho interesse em contratar um plano.

Nome: ${parsed.data.nome}
Telefone: ${parsed.data.telefone}
E-mail: ${parsed.data.email}
Plano escolhido: ${planoSelecionado.nome}

Gostaria de mais informações e dar continuidade à contratação.

Obrigado!`;
      window.open(`https://wa.me/${numero}?text=${encodeURIComponent(msg)}`, "_blank");
      setLeadOpen(false);
      toast.success("Solicitação enviada! Em breve o professor entrará em contato.");
    } catch (err) {
      toast.error(err?.message ?? "Falha ao enviar.");
    } finally {
      setSending(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "container mx-auto flex items-center justify-between px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-display text-lg font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "h-4 w-4" }) }),
        "Atlântida"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
        sessionTarget ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => navigate({
          to: sessionTarget
        }), children: "Ir para meu painel" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Entrar" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-6 pb-20 pt-12 md:pt-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground", children: "Acessoria Atlântida" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl", children: [
          "Treinos que você acompanha do",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-[image:var(--gradient-primary)] bg-clip-text text-transparent", children: "bolso" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-muted-foreground md:text-xl", children: "Plano semanal personalizado, check-in na academia em um toque e o histórico do mês inteiro na palma da mão." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row", children: sessionTarget ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "group", onClick: () => navigate({
          to: sessionTarget
        }), children: [
          "Ir para meu painel",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", children: [
          "Acessar minha conta",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.section, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.15,
        duration: 0.6
      }, className: "mx-auto mt-28 max-w-5xl rounded-3xl bg-card p-6 shadow-[var(--shadow-lg)] md:p-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-8 md:flex-row md:gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-full border-4 border-primary/30 shadow-xl md:h-64 md:w-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/personal.jpg", alt: "Professor Italo Ruan", className: "h-full w-full object-cover", onError: (e) => {
          e.target.src = "https://placehold.co/400x400?text=Personal";
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center md:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold", children: "Italo Ruan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg text-primary", children: "Personal Trainer | Especialista em Treino Funcional" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap justify-center gap-4 md:justify-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "CREF 123456-F" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "+5 anos de experiência" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "+150 alunos atendidos" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Graduado em Educação Física, especialista em treinamento personalizado e reabilitação esportiva. Meu método une ciência e prática para resultados reais." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.2,
        duration: 0.6
      }, className: "mx-auto mt-20 max-w-6xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground", children: "Resultados reais" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-3xl font-bold md:text-4xl", children: "Transformações que inspiram" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-2xl text-muted-foreground", children: "Histórias reais de alunos que alcançaram seus objetivos com nossa metodologia." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: [{
          nome: "Carlos M.",
          resultado: "Perdeu 12kg em 3 meses",
          depoimento: "O treino mudou minha vida. Nunca me senti tão disposto!",
          avaliacao: 5,
          imagemAntes: "/antes1.jpg",
          imagemDepois: "/depois1.jpg"
        }, {
          nome: "Fernanda L.",
          resultado: "Ganhou massa muscular e definição",
          depoimento: "Acompanhamento incrível, sempre ajustando os treinos.",
          avaliacao: 5,
          imagemAntes: "/antes2.jpg",
          imagemDepois: "/depois2.jpg"
        }, {
          nome: "Rafael S.",
          resultado: "Corrigiu postura e eliminou dores nas costas",
          depoimento: "Profissional muito atencioso e competente.",
          avaliacao: 5,
          imagemAntes: "/antes3.jpg",
          imagemDepois: "/depois3.jpg"
        }].map((dep, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow-md)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 text-amber-500", children: Array.from({
              length: dep.avaliacao
            }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-amber-500" }, idx)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Antes/Depois" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: dep.imagemAntes, alt: "Antes", className: "rounded-lg object-cover w-full h-32" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: dep.imagemDepois, alt: "Depois", className: "rounded-lg object-cover w-full h-32" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 italic text-muted-foreground", children: [
            '"',
            dep.depoimento,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: dep.nome }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary", children: dep.resultado })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.2,
        duration: 0.6
      }, className: "mx-auto mt-20 grid max-w-5xl gap-4 md:grid-cols-3", children: [{
        icon: Dumbbell,
        title: "Treino do dia",
        desc: "Foco, exercícios, séries, vídeos e progresso em tempo real."
      }, {
        icon: MapPin,
        title: "Check-in com GPS",
        desc: "Confirme presença direto na academia mais próxima."
      }, {
        icon: ChartLine,
        title: "Histórico mensal",
        desc: "Calendário, sequência e estatísticas de adesão."
      }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow-md)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-lg font-semibold", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: f.desc })
      ] }, f.title)) }),
      planos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.section, { id: "planos", initial: {
        opacity: 0,
        y: 30
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.3,
        duration: 0.6
      }, className: "mx-auto mt-24 max-w-6xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground", children: "Planos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-3xl font-bold md:text-5xl", children: "Escolha como quer ser acompanhado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-2xl text-muted-foreground", children: "Do treino solo ao acompanhamento completo com nutrição." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-5 md:grid-cols-3", children: planos.map((p, i) => {
          const destaque = i === 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex flex-col rounded-3xl border p-6 shadow-[var(--shadow-sm)] transition ${destaque ? "border-primary/60 bg-card shadow-[var(--shadow-lg)]" : "border-border bg-card"}`, children: [
            destaque && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[image:var(--gradient-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground", children: "Mais popular" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold", children: p.nome }),
            p.descricao && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: p.descricao }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-baseline gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl font-bold", children: formatBRL(Number(p.preco_mensal)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/mês" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 flex-1 space-y-2 text-sm", children: (p.beneficios ?? []).map((b, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b })
            ] }, idx)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-6 w-full", variant: destaque ? "default" : "outline", onClick: () => openLead({
              id: p.id,
              nome: p.nome
            }), children: "Quero esse plano" })
          ] }, p.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: leadOpen, onOpenChange: setLeadOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display", children: [
          "Quero o ",
          planoSelecionado?.nome
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Preencha seus dados e abriremos o WhatsApp do professor com sua mensagem pronta." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lead-nome", children: "Nome completo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lead-nome", value: leadNome, onChange: (e) => setLeadNome(e.target.value), placeholder: "Seu nome" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lead-tel", children: "Telefone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lead-tel", value: leadTel, onChange: (e) => setLeadTel(e.target.value), placeholder: "(85) 99999-9999" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lead-email", children: "E-mail" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lead-email", type: "email", value: leadEmail, onChange: (e) => setLeadEmail(e.target.value), placeholder: "voce@email.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground", children: "Após confirmação, o professor criará seu acesso e enviará a senha." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setLeadOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: enviarLead, disabled: sending, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          " Continuar no WhatsApp"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsappFab, {})
  ] });
}
export {
  Index as component
};

import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as useQueryClient, b as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-DIV666p3.mjs";
import { u as uploadMyAvatar, a as updateMyProfile, g as getMyProfile, b as getMyPlano, c as getAvatarSignedUrl } from "./me-DNEQf0dF.mjs";
import { l as listMyPdfs } from "./pdfs-q1P_mHxX.mjs";
import { a as formatDateBR, f as formatBRL } from "./config-BwxWJN3e.mjs";
import "../_libs/seroval.mjs";
import { G as Camera, H as Save, I as FileText, J as Download } from "../_libs/lucide-react.mjs";
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
import "./createSsrRpc-BaOR-_gw.mjs";
import "./server-DVxLX_uO.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onerror = () => reject(r.error);
    r.onload = () => resolve(String(r.result));
    r.readAsDataURL(file);
  });
}
function PerfilPage() {
  const qc = useQueryClient();
  const {
    data: aluno
  } = useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile
  });
  const {
    data: plano
  } = useQuery({
    queryKey: ["my-plano"],
    queryFn: getMyPlano
  });
  const {
    data: pdfs = []
  } = useQuery({
    queryKey: ["my-pdfs"],
    queryFn: listMyPdfs
  });
  const {
    data: avatarUrl
  } = useQuery({
    queryKey: ["my-avatar", aluno?.id, aluno?.foto_url],
    queryFn: () => aluno ? getAvatarSignedUrl(aluno.id) : Promise.resolve(null),
    enabled: !!aluno?.foto_url
  });
  const [telefone, setTelefone] = reactExports.useState("");
  const [objetivo, setObjetivo] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (aluno) {
      setTelefone(aluno.telefone ?? "");
      setObjetivo(aluno.objetivo ?? "");
    }
  }, [aluno]);
  if (!aluno) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Carregando..." });
  async function save() {
    setSaving(true);
    try {
      await updateMyProfile({
        telefone: telefone || null,
        objetivo: objetivo || null
      });
      toast.success("Perfil atualizado");
      qc.invalidateQueries({
        queryKey: ["my-profile"]
      });
    } catch (e) {
      toast.error(e?.message ?? "Erro");
    } finally {
      setSaving(false);
    }
  }
  async function handlePhoto(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Imagem muito grande (máx 5 MB)");
      return;
    }
    try {
      const b64 = await fileToBase64(f);
      await uploadMyAvatar(b64, f.type);
      toast.success("Foto atualizada");
      qc.invalidateQueries({
        queryKey: ["my-profile"]
      });
      qc.invalidateQueries({
        queryKey: ["my-avatar"]
      });
    } catch (err) {
      toast.error(err?.message ?? "Falha no upload");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => fileRef.current?.click(), className: "relative grid h-20 w-20 place-items-center overflow-hidden rounded-full border-2 border-primary/30 bg-muted", children: [
        avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrl, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-muted-foreground", children: aluno.nome.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0 right-0 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/png,image/jpeg,image/webp", className: "hidden", onChange: handlePhoto }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold leading-tight", children: aluno.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Aluno desde ",
          formatDateBR(aluno.created_at.slice(0, 10))
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Dados pessoais" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Telefone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: telefone, onChange: (e) => setTelefone(e.target.value), placeholder: "(DDD) 9XXXX-XXXX" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Objetivo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: objetivo, onChange: (e) => setObjetivo(e.target.value), placeholder: "O que você quer alcançar com os treinos?", rows: 3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, disabled: saving, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " Salvar"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "Plano contratado" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-1", children: plano ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-bold", children: plano.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: plano.descricao }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm", children: [
          "Valor mensal:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatBRL(Number(plano.preco_mensal)) })
        ] }),
        aluno.dia_vencimento && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Vence todo dia ",
          aluno.dia_vencimento
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhum plano vinculado." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-base", children: "PDFs do treino" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: pdfs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-4 text-center text-sm text-muted-foreground", children: "Nenhum PDF anexado pelo professor." }) : pdfs.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-medium", children: p.nome }),
            p.descricao && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: p.descricao })
          ] })
        ] }),
        p.signed_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: p.signed_url, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          " Abrir"
        ] })
      ] }, p.id)) })
    ] })
  ] });
}
export {
  PerfilPage as component
};

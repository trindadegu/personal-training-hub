## Problema

Você substituiu os dois `SESSION_CONFIG` mas o do aluno ficou sem o campo `sameSite`, e ambos continuam com `secure: true` fixo — que era justamente a causa do bug de login em `http://` (localhost com IP da rede, `npm run dev` aberto em outro PC). Por isso aparecem erros de TypeScript e o login continua quebrado.

## Correção proposta

Tornar `secure` e `sameSite` dependentes do ambiente, em **dois arquivos**:

### 1. `src/lib/admin-auth.server.ts`
```ts
const isProd = process.env.NODE_ENV === "production";

const SESSION_CONFIG = {
  get password() { return sessionPassword(); },
  name: "atlantida_admin",
  maxAge: 60 * 60 * 24 * 7,
  cookie: {
    httpOnly: true,
    secure: isProd,                              // false em dev (http) → cookie salva
    sameSite: (isProd ? "none" : "lax") as "none" | "lax", // "none" em prod → funciona em iframe/preview
    path: "/",
  },
};
```

### 2. `src/lib/student-auth.server.ts`
Mesma mudança, mantendo `name: "atlantida_student"` e `maxAge` de 30 dias. **Recolocar `sameSite`** que você removeu.

## Por que isso resolve

- **Em produção** (`acessoriaatlantida.lovable.app`, HTTPS): `secure: true` + `sameSite: "none"` → cookie é aceito mesmo dentro do preview do Lovable e em iframes.
- **Em desenvolvimento** (`npm run dev`, HTTP via IP da rede): `secure: false` + `sameSite: "lax"` → navegador salva o cookie em conexões `http://`, então o outro PC consegue logar.
- O `as "none" | "lax"` resolve o erro de TypeScript do tipo do `sameSite`.

## Verificação após aplicar

1. Em produção, abrir `https://acessoriaatlantida.lovable.app/login` e logar como admin e como aluno.
2. Em dev, rodar `npm run dev` e pedir para o outro PC abrir pelo IP da rede e logar.
3. Confirmar que nenhum erro de TypeScript aparece nos dois arquivos.

Posso aplicar?

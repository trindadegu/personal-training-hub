export type DiaSemana =
  | "segunda"
  | "terca"
  | "quarta"
  | "quinta"
  | "sexta"
  | "sabado"
  | "domingo";

export const DIAS: DiaSemana[] = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo",
];

export const DIA_LABEL: Record<DiaSemana, string> = {
  segunda: "Segunda",
  terca: "Terça",
  quarta: "Quarta",
  quinta: "Quinta",
  sexta: "Sexta",
  sabado: "Sábado",
  domingo: "Domingo",
};

export const DIA_SHORT: Record<DiaSemana, string> = {
  segunda: "Seg",
  terca: "Ter",
  quarta: "Qua",
  quinta: "Qui",
  sexta: "Sex",
  sabado: "Sáb",
  domingo: "Dom",
};

export interface Exercicio {
  name: string;
  series: string;
  reps: string;
  video?: string;
}

export interface DiaTreino {
  focus: string;
  exercises: Exercicio[];
}

export type TreinoSemana = Record<DiaSemana, DiaTreino>;

export interface Aluno {
  id: string;
  nome: string;
  telefone?: string | null;
  created_at: string;
  valor_mensalidade?: number | null;
  dia_vencimento?: number | null;
  status?: string | null;
  objetivo?: string | null;
  observacoes?: string | null;
  data_inicio?: string | null;
  plano_id?: string | null;
  meta_frequencia_semanal?: number | null;
  meta_frequencia_mensal?: number | null;
  stripe_customer_id?: string | null;
  foto_url?: string | null;
}

export interface TreinoPdf {
  id: string;
  aluno_id: string;
  nome: string;
  descricao: string | null;
  storage_path: string;
  tamanho_bytes: number;
  created_at: string;
  signed_url?: string;
}

export interface Plano {
  id: string;
  nome: string;
  descricao: string | null;
  preco_mensal: number;
  beneficios: string[];
  ordem: number;
  ativo: boolean;
  stripe_price_id?: string | null;
}

export interface Academia {
  id: string;
  nome: string;
  endereco: string | null;
  lat: number;
  lng: number;
  raio_metros: number;
  ativo: boolean;
}

export interface Checkin {
  id: string;
  aluno_id: string;
  aluno_nome: string;
  gym_name: string;
  gym_address: string | null;
  distance_m: number | null;
  lat_aluno: number | null;
  lng_aluno: number | null;
  lat_gym: number | null;
  lng_gym: number | null;
  created_at: string;
}

export interface HistoricoEntry {
  id: string;
  aluno_id: string;
  data: string;
  dia_semana: string;
  foco: string | null;
  exercicios_feitos: Array<{ name: string; series?: string; reps?: string }>;
  total_exercicios: number;
  checkin_id: string | null;
  created_at: string;
}

export type Progresso = Partial<Record<DiaSemana, number[]>>;

export function emptyTraining(): TreinoSemana {
  return DIAS.reduce((acc, d) => {
    acc[d] = { focus: "", exercises: [] };
    return acc;
  }, {} as TreinoSemana);
}

export const ADMIN_SESSION_KEY = "atlantida_admin_session";
export const STUDENT_SESSION_KEY = "atlantida_student_session";
export const THEME_KEY = "atlantida_theme";

export interface AdminSession {
  username: string;
  expiresAt: number;
}

export interface StudentSession {
  id: string;
  name: string;
  expiresAt: number;
}
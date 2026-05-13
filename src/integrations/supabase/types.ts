export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_credentials: {
        Row: {
          id: number
          password: string
          updated_at: string
          username: string
          whatsapp: string | null
        }
        Insert: {
          id: number
          password: string
          updated_at?: string
          username: string
          whatsapp?: string | null
        }
        Update: {
          id?: number
          password?: string
          updated_at?: string
          username?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      alunos: {
        Row: {
          created_at: string
          id: string
          nome: string
          telefone: string | null
        }
        Insert: {
          created_at?: string
          id: string
          nome: string
          telefone?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      checkins: {
        Row: {
          aluno_id: string
          aluno_nome: string
          created_at: string
          distance_m: number | null
          gym_address: string | null
          gym_name: string
          id: string
          lat_aluno: number | null
          lat_gym: number | null
          lng_aluno: number | null
          lng_gym: number | null
        }
        Insert: {
          aluno_id: string
          aluno_nome: string
          created_at?: string
          distance_m?: number | null
          gym_address?: string | null
          gym_name: string
          id?: string
          lat_aluno?: number | null
          lat_gym?: number | null
          lng_aluno?: number | null
          lng_gym?: number | null
        }
        Update: {
          aluno_id?: string
          aluno_nome?: string
          created_at?: string
          distance_m?: number | null
          gym_address?: string | null
          gym_name?: string
          id?: string
          lat_aluno?: number | null
          lat_gym?: number | null
          lng_aluno?: number | null
          lng_gym?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "checkins_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
        ]
      }
      progresso: {
        Row: {
          aluno_id: string
          progresso: Json
          updated_at: string
        }
        Insert: {
          aluno_id: string
          progresso?: Json
          updated_at?: string
        }
        Update: {
          aluno_id?: string
          progresso?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "progresso_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: true
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
        ]
      }
      treino_historico: {
        Row: {
          aluno_id: string
          checkin_id: string | null
          created_at: string
          data: string
          dia_semana: string
          exercicios_feitos: Json
          foco: string | null
          id: string
          total_exercicios: number
        }
        Insert: {
          aluno_id: string
          checkin_id?: string | null
          created_at?: string
          data: string
          dia_semana: string
          exercicios_feitos?: Json
          foco?: string | null
          id?: string
          total_exercicios?: number
        }
        Update: {
          aluno_id?: string
          checkin_id?: string | null
          created_at?: string
          data?: string
          dia_semana?: string
          exercicios_feitos?: Json
          foco?: string | null
          id?: string
          total_exercicios?: number
        }
        Relationships: [
          {
            foreignKeyName: "treino_historico_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treino_historico_checkin_id_fkey"
            columns: ["checkin_id"]
            isOneToOne: false
            referencedRelation: "checkins"
            referencedColumns: ["id"]
          },
        ]
      }
      treinos: {
        Row: {
          aluno_id: string
          treino: Json
          updated_at: string
        }
        Insert: {
          aluno_id: string
          treino?: Json
          updated_at?: string
        }
        Update: {
          aluno_id?: string
          treino?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "treinos_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: true
            referencedRelation: "alunos"
            referencedColumns: ["id"]
          },
        ]
      }
      treinos_padroes: {
        Row: {
          id: number
          treino: Json
          updated_at: string
        }
        Insert: {
          id: number
          treino?: Json
          updated_at?: string
        }
        Update: {
          id?: number
          treino?: Json
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

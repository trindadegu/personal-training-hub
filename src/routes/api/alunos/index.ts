import { createAPIFileRoute } from '@tanstack/react-start/api'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { requireAdminSession } from '@/lib/admin-auth.server'
import { z } from 'zod'

export const APIRoute = createAPIFileRoute('/api/alunos')({
  GET: async ({ request }) => {
    try {
      await requireAdminSession()
      const { data, error } = await supabaseAdmin.from('alunos').select('*').order('nome')
      if (error) throw error
      return new Response(JSON.stringify(data ?? []), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
        status: error.status || 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
  POST: async ({ request }) => {
    try {
      await requireAdminSession()
      const body = await request.json()
      const schema = z.object({
        nome: z.string().min(1).max(200),
        telefone: z.string().max(40).nullable().optional(),
        valor_mensalidade: z.number().min(0).optional(),
        dia_vencimento: z.number().int().min(1).max(28).optional(),
      })
      
      const validated = schema.parse(body)
      const id = 'aluno_' + Date.now()
      
      const { data, error } = await supabaseAdmin
        .from('alunos')
        .insert({
          id,
          nome: validated.nome,
          telefone: validated.telefone ?? null,
          valor_mensalidade: validated.valor_mensalidade ?? 0,
          dia_vencimento: validated.dia_vencimento ?? 5,
        })
        .select()
        .single()
        
      if (error) throw error
      
      // Criar treino inicial
      await supabaseAdmin.from('treinos').insert({ aluno_id: id, treino: {} })
      
      return new Response(JSON.stringify(data), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
        status: error.status || 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
})

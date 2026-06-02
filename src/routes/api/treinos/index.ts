import { createAPIFileRoute } from '@tanstack/react-start/api'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { requireAdminSession } from '@/lib/admin-auth.server'
import { getStudentSession } from '@/lib/student-auth.server'

export const APIRoute = createAPIFileRoute('/api/treinos')({
  GET: async ({ request }) => {
    try {
      const url = new URL(request.url)
      const alunoId = url.searchParams.get('alunoId')
      if (!alunoId) return new Response(JSON.stringify({ error: 'Missing alunoId' }), { status: 400 })

      // Permitir se for admin OU se for o próprio aluno
      const adminSession = await requireAdminSession().catch(() => null)
      const studentSession = await getStudentSession()
      
      if (!adminSession && studentSession.data?.alunoId !== alunoId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
      }

      const { data, error } = await supabaseAdmin
        .from('treinos')
        .select('*')
        .eq('aluno_id', alunoId)
        .maybeSingle()
        
      if (error) throw error
      return new Response(JSON.stringify(data), {
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
  PUT: async ({ request }) => {
    try {
      const body = await request.json()
      const { aluno_id, treino } = body
      
      // Apenas admin pode editar treinos
      await requireAdminSession()
      
      const { data, error } = await supabaseAdmin
        .from('treinos')
        .upsert({ aluno_id, treino, updated_at: new Date().toISOString() })
        .select()
        .single()
        
      if (error) throw error
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
        status: error.status || 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
})

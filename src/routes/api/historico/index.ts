import { createAPIFileRoute } from '@tanstack/react-start/api'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { requireAdminSession } from '@/lib/admin-auth.server'
import { getStudentSession } from '@/lib/student-auth.server'

export const APIRoute = createAPIFileRoute('/api/historico')({
  GET: async ({ request }) => {
    try {
      const url = new URL(request.url)
      const alunoId = url.searchParams.get('alunoId')
      
      const adminSession = await requireAdminSession().catch(() => null)
      const studentSession = await getStudentSession()
      
      if (!adminSession && (!alunoId || studentSession.data?.alunoId !== alunoId)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
      }

      let query = supabaseAdmin.from('treino_historico').select('*')
      if (alunoId) query = query.eq('aluno_id', alunoId)
      
      const { data, error } = await query.order('data', { ascending: false }).limit(500)
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
})

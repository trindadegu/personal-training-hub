import { createAPIFileRoute } from '@tanstack/react-start/api'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { requireAdminSession } from '@/lib/admin-auth.server'

export const APIRoute = createAPIFileRoute('/api/checkins')({
  GET: async ({ request }) => {
    try {
      await requireAdminSession()
      const url = new URL(request.url)
      const alunoId = url.searchParams.get('alunoId')
      
      let query = supabaseAdmin.from('checkins').select('*')
      if (alunoId) query = query.eq('aluno_id', alunoId)
      
      const { data, error } = await query.order('created_at', { ascending: false })
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

import { createAPIFileRoute } from '@tanstack/react-start/api'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { requireAdminSession } from '@/lib/admin-auth.server'

export const APIRoute = createAPIFileRoute('/api/financeiro')({
  GET: async ({ request }) => {
    try {
      await requireAdminSession()
      const url = new URL(request.url)
      const mes = url.searchParams.get('mes')
      
      let query = supabaseAdmin.from('financeiro_lancamentos').select('*')
      if (mes) {
        // Exemplo simples de filtro por mês (YYYY-MM)
        query = query.gte('data', `${mes}-01`).lte('data', `${mes}-31`)
      }
      
      const { data, error } = await query.order('data', { ascending: false })
      if (error) throw error
      
      return new Response(JSON.stringify(data ?? []), {
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

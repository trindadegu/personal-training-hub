import { createAPIFileRoute } from '@tanstack/react-start/api'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { requireAdminSession } from '@/lib/admin-auth.server'

export const APIRoute = createAPIFileRoute('/api/pagamentos')({
  GET: async ({ request }) => {
    try {
      await requireAdminSession()
      const url = new URL(request.url)
      const alunoId = url.searchParams.get('alunoId')
      const mes = url.searchParams.get('mes')
      
      let query = supabaseAdmin.from('pagamentos').select('*')
      if (alunoId) query = query.eq('aluno_id', alunoId)
      if (mes) query = query.eq('mes_referencia', mes)
      
      const { data, error } = await query.order('mes_referencia', { ascending: false })
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
      const { data, error } = await supabaseAdmin
        .from('pagamentos')
        .upsert(body, { onConflict: 'aluno_id,mes_referencia' })
        .select()
        .single()
      if (error) throw error
      return new Response(JSON.stringify(data), {
        status: 200,
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

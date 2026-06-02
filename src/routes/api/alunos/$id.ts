import { createAPIFileRoute } from '@tanstack/react-start/api'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { requireAdminSession } from '@/lib/admin-auth.server'
import { z } from 'zod'

export const APIRoute = createAPIFileRoute('/api/alunos/$id')({
  GET: async ({ params }) => {
    try {
      await requireAdminSession()
      const { id } = params
      const { data, error } = await supabaseAdmin
        .from('alunos')
        .select('*')
        .eq('id', id)
        .maybeSingle()
      if (error) throw error
      if (!data) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })
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
  PUT: async ({ params, request }) => {
    try {
      await requireAdminSession()
      const { id } = params
      const body = await request.json()
      const { data, error } = await supabaseAdmin
        .from('alunos')
        .update(body)
        .eq('id', id)
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
  DELETE: async ({ params }) => {
    try {
      await requireAdminSession()
      const { id } = params
      const { error } = await supabaseAdmin.from('alunos').delete().eq('id', id)
      if (error) throw error
      return new Response(null, { status: 204 })
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
        status: error.status || 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
})

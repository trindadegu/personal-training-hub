import { createAPIFileRoute } from '@tanstack/react-start/api'
import { supabaseAdmin } from '@/integrations/supabase/client.server'
import { getAdminSession } from '@/lib/admin-auth.server'
import { getStudentSession } from '@/lib/student-auth.server'
import { z } from 'zod'

export const APIRoute = createAPIFileRoute('/api/auth')({
  GET: async () => {
    const adminSession = await getAdminSession()
    const studentSession = await getStudentSession()
    
    return new Response(JSON.stringify({
      admin: adminSession.data?.username || null,
      student: studentSession.data?.alunoId ? {
        id: studentSession.data.alunoId,
        nome: studentSession.data.nome
      } : null
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  },
  POST: async ({ request }) => {
    try {
      const body = await request.json()
      const { type, username, password, id } = body
      
      if (type === 'admin') {
        const { data: ok, error } = await supabaseAdmin.rpc("verify_admin_login", {
          _username: username,
          _password: password,
        });
        if (error || !ok) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 })
        
        const session = await getAdminSession()
        await session.update({ username, loggedInAt: Date.now() })
        return new Response(JSON.stringify({ ok: true, role: 'admin' }), { status: 200 })
      } 
      
      if (type === 'student') {
        const expected = id.slice(-6)
        if (password !== expected) return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 })
        
        const { data: aluno, error } = await supabaseAdmin
          .from("alunos")
          .select("id, nome")
          .eq("id", id)
          .maybeSingle()
          
        if (error || !aluno) return new Response(JSON.stringify({ error: 'Student not found' }), { status: 404 })
        
        const session = await getStudentSession()
        await session.update({
          alunoId: aluno.id,
          nome: aluno.nome,
          loggedInAt: Date.now(),
        })
        return new Response(JSON.stringify({ ok: true, role: 'student', user: aluno }), { status: 200 })
      }
      
      return new Response(JSON.stringify({ error: 'Invalid login type' }), { status: 400 })
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 })
    }
  },
  DELETE: async ({ request }) => {
    const url = new URL(request.url)
    const type = url.searchParams.get('type')
    
    if (type === 'admin') {
      const session = await getAdminSession()
      await session.clear()
    } else {
      const session = await getStudentSession()
      await session.clear()
    }
    
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  }
})

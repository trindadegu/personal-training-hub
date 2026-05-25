UPDATE public.admin_credentials
SET password = extensions.crypt('HF8E86mdnzi0tc0bvA', extensions.gen_salt('bf')),
    updated_at = now()
WHERE id = 1;
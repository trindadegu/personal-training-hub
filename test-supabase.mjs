import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  'https://ohnlwhprxzajmsrwisvg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9obmx3aHByeHpham1zcndpc3ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NTU5ODYsImV4cCI6MjA5NTAzMTk4Nn0.M_je5z7YulJbUNukEZw4t9-5UBEHP898JsKJ6c4YQLE'
);

const { data, error } = await supabaseAdmin.from('planos').select('*');
console.log('data:', data);
console.log('error:', error);
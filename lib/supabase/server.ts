import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { Database } from '../types';

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {/* handled by Next/Vercel */},
        remove() {/* handled by Next/Vercel */},
      },
    }
  );
  return supabase;
}

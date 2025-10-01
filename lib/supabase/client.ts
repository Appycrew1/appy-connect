'use client';
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '../types';

export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient<Database>(url, anon);
}

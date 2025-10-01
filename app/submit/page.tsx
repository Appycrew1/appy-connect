'use client';
import { useState } from 'react';
import { z } from 'zod';
import { createSupabaseBrowserClient } from "../../lib/supabase/client";

const schema = z.object({
  company_name: z.string().min(2),
  website: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  discount: z.string().optional(),
  category_id: z.string().optional(),
});

export default function SubmitListing() {
  const supabase = createSupabaseBrowserClient();
  const [state, setState] = useState({ company_name: '', website: '', description: '', discount: '', category_id: '' });
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOk(null); setErr(null);
    const parse = schema.safeParse(state);
    if (!parse.success) { setErr(parse.error.errors[0].message); return; }
    const { error } = await supabase.from('listing_submissions').insert([parse.data]);
    if (error) setErr(error.message); else setOk('Thanks! We received your submission.');
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Submit a Listing</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input className="w-full rounded-2xl border p-3" placeholder="Company name" value={state.company_name} onChange={e=>setState({...state, company_name: e.target.value})}/>
        <input className="w-full rounded-2xl border p-3" placeholder="Website (https://...)" value={state.website} onChange={e=>setState({...state, website: e.target.value})}/>
        <textarea className="w-full rounded-2xl border p-3" placeholder="Description" rows={5} value={state.description} onChange={e=>setState({...state, description: e.target.value})}/>
        <input className="w-full rounded-2xl border p-3" placeholder="Discount details" value={state.discount} onChange={e=>setState({...state, discount: e.target.value})}/>
        <button className="rounded-2xl bg-black text-white px-4 py-2 font-semibold">Submit</button>
      </form>
      {ok && <p className="mt-4 text-green-700">{ok}</p>}
      {err && <p className="mt-4 text-red-700">{err}</p>}
    </main>
  );
}

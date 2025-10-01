'use client';
import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function Contact() {
  const supabase = createSupabaseBrowserClient();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOk(null); setErr(null);
    const { error } = await supabase.from('contact_messages').insert([{ name, email, message }]);
    if (error) setErr(error.message); else setOk('Thanks! We\'ll get back to you.');
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input className="w-full rounded-2xl border p-3" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full rounded-2xl border p-3" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <textarea className="w-full rounded-2xl border p-3" placeholder="Message" rows={6} value={message} onChange={e=>setMessage(e.target.value)} />
        <button className="rounded-2xl bg-black text-white px-4 py-2 font-semibold">Send</button>
      </form>
      {ok && <p className="mt-4 text-green-700">{ok}</p>}
      {err && <p className="mt-4 text-red-700">{err}</p>}
    </main>
  );
}

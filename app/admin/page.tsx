'use client';
import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type Provider = {
  id: string; name: string; is_active: boolean; is_featured: boolean;
};

export default function Admin() {
  const supabase = createSupabaseBrowserClient();
  const [role, setRole] = useState<string | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      setRole(data?.role ?? null);
      const { data: prov } = await supabase.from('providers').select('id,name,is_active,is_featured').order('created_at', { ascending: false });
      setProviders(prov ?? []);
    };
    init();
  }, []);

  if (!role) {
    return (
      <main className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="mt-3">Sign in to manage data.</p>
        <AuthUI />
      </main>
    );
  }

  if (role !== 'admin') return <main className="mx-auto max-w-xl p-6"><p>You are signed in but not an admin.</p></main>;

  async function toggleActive(id: string, is_active: boolean) {
    await supabase.from('providers').update({ is_active }).eq('id', id);
    setProviders(prev => prev.map(p => p.id === id ? { ...p, is_active } : p));
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <section className="mt-6">
        <h2 className="font-semibold">Providers</h2>
        <ul className="mt-3 space-y-2">
          {providers.map(p => (
            <li key={p.id} className="flex items-center justify-between rounded-xl border p-3">
              <span>{p.name}</span>
              <div className="space-x-2 text-sm">
                <button onClick={()=>toggleActive(p.id, !p.is_active)} className="rounded-lg border px-3 py-1">{p.is_active ? 'Deactivate' : 'Activate'}</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function AuthUI() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    await supabase.auth.signInWithPassword({ email, password });
    window.location.reload();
  }

  return (
    <form onSubmit={signIn} className="mt-4 space-y-3">
      <input className="w-full rounded-2xl border p-3" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full rounded-2xl border p-3" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="rounded-2xl bg-black text-white px-4 py-2 font-semibold">Sign in</button>
    </form>
  );
}

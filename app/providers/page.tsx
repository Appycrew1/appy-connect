import Link from 'next/link';
import { createSupabaseServerClient } from 'lib/supabase/server';

export const revalidate = 30;

export default async function Providers() {
  const supabase = createSupabaseServerClient();
  const { data: providers } = await supabase
    .from('providers')
    .select('id,name,category_id,website,summary,discount_label,logo,is_featured,is_active,tier')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('name');

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold">Providers</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(providers ?? []).map((p) => (
          <article key={p.id} className="rounded-2xl border p-4 bg-white shadow">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{p.name}</h2>
                {p.summary && <p className="text-sm text-gray-600 mt-1">{p.summary}</p>}
                {p.website && <Link href={p.website} className="text-sm underline mt-2 inline-block">Visit website →</Link>}
              </div>
              {p.logo ? <img src={p.logo} alt="" className="size-10 rounded" /> : <img src="/favicon.ico" alt="" className="size-10 rounded" />}
            </div>
            {p.discount_label && <p className="mt-3 text-sm font-medium">🎉 {p.discount_label}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}

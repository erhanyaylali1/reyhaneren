import Link from "next/link";
import { DeleteSubscriberButton } from "@/components/admin/delete-subscriber-button";
import { requireAdmin } from "@/lib/auth/dal";
import { formatDate, formatNumber } from "@/lib/blog/text";
import { listAll, type SubscriberStatus } from "@/lib/newsletter/store";

export const metadata = { title: "Bülten" };

const STATUS: Record<SubscriberStatus, { label: string; badge: string }> = {
  confirmed: { label: "Onaylı", badge: "bg-sage-100 text-sage-800" },
  pending: { label: "Onay bekliyor", badge: "bg-sand-100 text-sand-700" },
  unsubscribed: { label: "Ayrıldı", badge: "bg-line text-ink-muted" },
};

const FILTERS = [
  { key: "tumu", label: "Tümü" },
  { key: "confirmed", label: "Onaylı" },
  { key: "pending", label: "Onay bekleyen" },
  { key: "unsubscribed", label: "Ayrılan" },
] as const;

export default async function AdminNewsletterPage({ searchParams }: PageProps<"/admin/bulten">) {
  await requireAdmin();
  const all = await listAll();
  const durum = (await searchParams).durum;
  const filter = FILTERS.find((f) => f.key === durum)?.key ?? "tumu";
  const shown = filter === "tumu" ? all : all.filter((s) => s.status === filter);

  const count = (status: SubscriberStatus) => all.filter((s) => s.status === status).length;
  const stats = [
    { label: "Onaylı abone", value: count("confirmed"), hint: "Yeni yazılar bu kişilere gider" },
    { label: "Onay bekleyen", value: count("pending"), hint: "E-postadaki bağlantıya henüz tıklamadı" },
    { label: "Ayrılan", value: count("unsubscribed"), hint: "Artık e-posta gönderilmiyor" },
  ];

  return (
    <>
      <div>
        <h1 className="font-serif text-[2.25rem] leading-tight tracking-[-0.01em] text-ink">Bülten</h1>
        <p className="mt-1 text-ink-muted">
          Blog bültenine abone olanlar. Yeni bir yazıyı ilk kez yayınladığınızda onaylı abonelere otomatik e-posta gider.
        </p>
      </div>

      <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface px-5 py-4">
            <dt className="text-sm text-ink-muted">{s.label}</dt>
            <dd className="mt-1 font-serif text-[1.75rem] tabular-nums text-ink">{formatNumber(s.value)}</dd>
            <dd className="mt-0.5 text-xs text-ink-muted">{s.hint}</dd>
          </div>
        ))}
      </dl>

      <nav aria-label="Duruma göre filtrele" className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = f.key === filter;
          const n = f.key === "tumu" ? all.length : count(f.key);
          return (
            <Link
              key={f.key}
              href={f.key === "tumu" ? "/admin/bulten" : `/admin/bulten?durum=${f.key}`}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[0.9375rem] transition-colors duration-150 ${
                active
                  ? "border-sage-700 bg-sage-700 text-canvas"
                  : "border-line-strong text-ink-muted hover:border-ink-muted hover:text-ink"
              }`}
            >
              {f.label}
              <span className={`tabular-nums text-sm ${active ? "text-canvas/80" : "text-ink-muted"}`}>{n}</span>
            </Link>
          );
        })}
      </nav>

      {shown.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="font-serif text-xl text-ink">
            {all.length === 0 ? "Henüz abone yok" : "Bu filtrede abone yok"}
          </p>
          <p className="mt-1 text-ink-muted">
            {all.length === 0
              ? "Ziyaretçiler blog sayfasındaki formdan abone olduğunda burada görünecek."
              : "Başka bir filtre seçin."}
          </p>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {shown.map((s) => (
            <li key={s.email} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
              <span
                aria-hidden="true"
                className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-sage-50 font-serif text-lg uppercase text-sage-700 sm:flex"
              >
                {s.email.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <a
                  href={`mailto:${s.email}`}
                  className="block truncate font-medium text-ink decoration-line-strong underline-offset-4 hover:underline"
                >
                  {s.email}
                </a>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS[s.status].badge}`}>
                    {STATUS[s.status].label}
                  </span>
                  <span>Kayıt: {formatDate(s.createdAt)}</span>
                  {s.status === "confirmed" && s.confirmedAt && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Onay: {formatDate(s.confirmedAt)}</span>
                    </>
                  )}
                  {s.status === "unsubscribed" && s.unsubscribedAt && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Ayrılma: {formatDate(s.unsubscribedAt)}</span>
                    </>
                  )}
                </p>
              </div>
              <DeleteSubscriberButton email={s.email} />
            </li>
          ))}
        </ul>
      )}

      <p className="mt-6 text-sm leading-relaxed text-ink-muted">
        Silme işlemi adresi tamamen ve geri alınamaz şekilde kaldırır; KVKK kapsamında silme
        talebi gelirse kullanın. Yalnızca bülten almak istemeyen birini listeden çıkarmak için
        silmeniz gerekmez: kişi e-postadaki “Abonelikten çık” bağlantısını kullanabilir.
      </p>
    </>
  );
}

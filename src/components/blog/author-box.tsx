import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/page-ui";
import { credentials } from "@/lib/content";
import { site } from "@/lib/site";

// "About the author" — an E-E-A-T signal: who wrote this, what qualifies them,
// and a clear path to the full profile page.
export function AuthorBox() {
  return (
    <section
      aria-labelledby="yazar-hakkinda"
      className="rounded-3xl border border-line bg-surface p-7 sm:p-9"
    >
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">Yazar hakkında</p>
      <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-start">
        <Image
          src="/reyhan-eren-avatar-portre.jpg"
          width={256}
          height={256}
          alt="Aile Danışmanı Reyhan Eren"
          sizes="88px"
          className="size-22 shrink-0 rounded-full bg-sand-100 object-cover"
        />
        <div className="min-w-0">
          <h2 id="yazar-hakkinda" className="font-serif text-[1.75rem] leading-tight text-ink">
            <Link
              href="/hakkimda"
              className="decoration-line-strong underline-offset-4 hover:underline relative after:absolute after:-inset-x-1 after:-inset-y-2 after:content-['']"
            >
              {site.person}
            </Link>
          </h2>
          <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-sage-700">
            Aile Danışmanı &amp; Sosyolog
          </p>
          <p className="mt-4 leading-relaxed text-ink-muted text-pretty">
            Akdeniz Üniversitesi Sosyoloji bölümünden yüksek onur derecesiyle mezun oldu,
            Marmara Üniversitesi’nde Aile Danışmanlığı eğitimini tamamladı. İlişkileri
            sistemik ve sosyolojik bir bakışla ele alıyor; İzmir Bayraklı’da yüz yüze ve
            Türkiye genelinde online aile danışmanlığı ile çift terapisi sunuyor.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {credentials.map((c) => (
              <li
                key={c.year}
                className="rounded-full border border-line bg-canvas px-3 py-1.5 text-sm text-ink"
              >
                {c.institution} · {c.title}
              </li>
            ))}
          </ul>
          <Link
            href="/hakkimda"
            className="group mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-sage-700 underline decoration-sage-100 underline-offset-4 transition-colors duration-150 hover:decoration-sage-700"
          >
            Reyhan Eren’in yaklaşımı ve eğitimi hakkında
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

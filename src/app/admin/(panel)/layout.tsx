import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/app/admin/actions";
import { Icon } from "@/components/admin/icons";
import { requireAdmin } from "@/lib/auth/dal";

async function Guard({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return children;
}

const navItem =
  "inline-flex min-h-10 items-center rounded-full px-3.5 text-[0.9375rem] text-ink-muted transition-colors duration-150 hover:bg-sage-50 hover:text-ink";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-canvas">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6">
          <Link href="/admin/blog" className="mr-3 flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-lg bg-sage-700 font-serif text-lg text-canvas"
            >
              R
            </span>
            <span className="hidden font-serif text-lg text-ink sm:inline">Yönetim</span>
          </Link>
          <nav aria-label="Yönetim menüsü" className="flex items-center gap-1">
            <Link href="/admin/blog" className={navItem}>
              Yazılar
            </Link>
            <Link href="/admin/ayarlar" className={navItem}>
              Ayarlar
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <Link href="/blog" target="_blank" className={`${navItem} gap-1.5`}>
              <span className="hidden sm:inline">Siteyi gör</span>
              <Icon name="external" className="size-4" />
            </Link>
            <form action={logout}>
              <button type="submit" className={`${navItem} gap-1.5`} title="Çıkış yap">
                <span className="hidden sm:inline">Çıkış</span>
                <Icon name="logout" className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 md:py-12">
        <Suspense fallback={<p className="text-ink-muted">Yükleniyor…</p>}>
          <Guard>{children}</Guard>
        </Suspense>
      </main>
    </>
  );
}

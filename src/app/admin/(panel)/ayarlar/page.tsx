import { ChangePinForm } from "@/components/admin/change-pin-form";
import { requireAdmin } from "@/lib/auth/dal";

export const metadata = { title: "Ayarlar" };

export default async function SettingsPage() {
  await requireAdmin();
  return (
    <>
      <h1 className="font-serif text-[2.25rem] leading-tight tracking-[-0.01em] text-ink">Ayarlar</h1>
      <section className="mt-8 max-w-xl rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-serif text-xl text-ink">Giriş PIN’i</h2>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          Yönetim paneline girişte kullanılan 4 haneli PIN. Değiştirdiğinizde diğer
          cihazlardaki oturumlar kapanır.
        </p>
        <div className="mt-6">
          <ChangePinForm />
        </div>
      </section>
    </>
  );
}

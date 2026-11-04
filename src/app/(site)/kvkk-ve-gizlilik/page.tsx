import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-ui";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

// ⚠ Legal text drafted from how this website actually handles data
// (EmailJS → Gmail for the form, Netlify hosting, Supabase for the blog,
// Google Analytics only after consent via the cookie banner, no ad cookies). Have it reviewed by a lawyer before relying on it,
// and update it whenever a new service (analytics, booking tool…) is added.

export const metadata: Metadata = pageMetadata({
  title: "KVKK Aydınlatma Metni ve Gizlilik Politikası | Reyhan Eren",
  description:
    "Reyhan Eren Aile Danışmanlığı kişisel verilerin korunması (6698 sayılı KVKK) aydınlatma metni ve gizlilik politikası: hangi veriler, hangi amaçla işlenir, haklarınız nelerdir.",
  path: "/kvkk-ve-gizlilik",
});

const LAST_UPDATED = "4 Kasım 2026";

const sections = [
  { id: "veri-sorumlusu", title: "Veri sorumlusu" },
  { id: "islenen-veriler", title: "İşlenen kişisel veriler" },
  { id: "amaclar", title: "İşleme amaçları" },
  { id: "hukuki-sebepler", title: "Hukuki sebepler" },
  { id: "aktarim", title: "Aktarım ve yurt dışı" },
  { id: "saklama", title: "Saklama ve güvenlik" },
  { id: "haklariniz", title: "Haklarınız" },
  { id: "basvuru", title: "Başvuru yolu" },
  { id: "cerezler", title: "Çerezler" },
];

export default function KvkkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "KVKK ve Gizlilik", href: "/kvkk-ve-gizlilik" }]}
        kicker="Kişisel verilerin korunması"
        title="KVKK aydınlatma metni ve gizlilik politikası"
        lead={
          <p>
            Danışmanlık, güven üzerine kurulur. Bu metin, {site.name} olarak
            kişisel verilerinizi 6698 sayılı Kişisel Verilerin Korunması Kanunu
            (“KVKK”) kapsamında nasıl işlediğimizi ve haklarınızı açıklar.
          </p>
        }
      >
        <p className="mt-6 text-sm text-ink-muted">Son güncelleme: {LAST_UPDATED}</p>
      </PageHero>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="İçindekiler" className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">İçindekiler</h2>
              <ol className="mt-4 border-l border-line">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px flex min-h-11 items-center gap-3 border-l border-transparent pl-4 text-[0.9375rem] text-ink-muted transition-colors duration-150 hover:border-sage-700 hover:text-ink"
                    >
                      <span className="w-5 font-serif text-sage-700 tabular-nums">{i + 1}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="prose-blog min-w-0 lg:col-span-8 [&_h2]:scroll-mt-28">
            <h2 id="veri-sorumlusu">1. Veri sorumlusu</h2>
            <p>
              KVKK kapsamında veri sorumlusu, {site.address.locality}, {site.address.region}{" "}
              adresinde aile danışmanlığı hizmeti veren <strong>{site.person}</strong>’dir
              (“Danışman”). Bu metin; {site.url.replace("https://", "")} web sitesini ziyaret
              edenleri, randevu talebinde bulunanları ve danışmanlık hizmeti alanları kapsar.
            </p>
            <p>
              İletişim: <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
              <a href={site.phone.href}>{site.phone.display}</a>
            </p>

            <h2 id="islenen-veriler">2. İşlenen kişisel veriler</h2>
            <ul>
              <li>
                <strong>Kimlik ve iletişim bilgileri:</strong> ad soyad, telefon numarası,
                e-posta adresi.
              </li>
              <li>
                <strong>Randevu bilgileri:</strong> ilgilendiğiniz hizmet, tercih ettiğiniz
                görüşme şekli (yüz yüze/online), randevu formuna veya mesajlara yazdığınız notlar.
              </li>
              <li>
                <strong>Danışmanlık sürecine ait bilgiler:</strong> görüşmelerde paylaştığınız
                aile, ilişki ve yaşam durumunuza dair bilgiler ile görüşme notları. Bu bilgiler,
                KVKK’nın 6. maddesinde sayılan sağlık ve cinsel hayata ilişkin veriler gibi{" "}
                <em>özel nitelikli kişisel veriler</em> içerebilir.
              </li>
              <li>
                <strong>İşlem güvenliği bilgileri:</strong> web sitesine erişim sırasında
                barındırma altyapısı tarafından tutulan IP adresi, tarayıcı ve erişim zamanı
                gibi teknik kayıtlar.
              </li>
              <li>
                <strong>Ziyaret istatistikleri (yalnızca izin verirseniz):</strong> çerez
                tercihlerinde “Kabul et”i seçmeniz hâlinde Google Analytics aracılığıyla
                görüntülediğiniz sayfalar, siteye nereden geldiğiniz, ziyaret süresi, randevu
                formunu gönderme ve telefon, WhatsApp veya e-posta bağlantısına tıklama gibi site
                içi işlemler, yaklaşık konum (şehir/ülke), cihaz, işletim sistemi ve tarayıcı
                bilgileri ile çevrim içi tanımlayıcılar (çerez kimliği). Bu işlemlerin yalnızca
                gerçekleştiği bilgisi kaydedilir; formda yazdığınız ad, telefon, e-posta, seçtiğiniz
                hizmet ve mesaj içeriği Google Analytics’e gönderilmez.
              </li>
            </ul>

            <h2 id="amaclar">3. Kişisel verilerin işlenme amaçları</h2>
            <ul>
              <li>Randevu taleplerinizi almak, sizinle iletişime geçmek ve randevu planlamak,</li>
              <li>Aile danışmanlığı, çift terapisi ve online danışmanlık hizmetini yürütmek,</li>
              <li>Hizmetin kalitesini ve sürekliliğini sağlamak, sorularınızı yanıtlamak,</li>
              <li>Mevzuattan doğan yükümlülükleri (ör. faturalandırma, yetkili mercilerin talepleri) yerine getirmek,</li>
              <li>Web sitesinin güvenliğini sağlamak ve kötüye kullanımı önlemek,</li>
              <li>
                İzin vermeniz hâlinde, sitenin nasıl kullanıldığını ve hangi sayfaların randevu
                talebine yol açtığını toplu istatistiklerle anlamak, içeriği ve kullanım
                kolaylığını geliştirmek.
              </li>
            </ul>
            <p>
              Kişisel verileriniz reklam, pazarlama veya profil oluşturma amacıyla kullanılmaz ve
              satılmaz.
            </p>

            <h2 id="hukuki-sebepler">4. Toplama yöntemi ve hukuki sebepler</h2>
            <p>
              Kişisel verileriniz; web sitesindeki randevu formu, telefon, WhatsApp, e-posta ve yüz
              yüze veya online görüşmeler aracılığıyla, kısmen otomatik ve otomatik olmayan
              yollarla toplanır. Verileriniz KVKK’nın 5. maddesindeki şu hukuki sebeplere
              dayanılarak işlenir:
            </p>
            <ul>
              <li>Bir sözleşmenin kurulması veya ifası için gerekli olması (randevu ve danışmanlık hizmeti),</li>
              <li>Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi,</li>
              <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla meşru menfaat (ör. site güvenliği),</li>
              <li>
                Gerekli hâllerde açık rızanız; Google Analytics çerezleri ve bunlar aracılığıyla
                yapılan ziyaret istatistiği işlemesi yalnızca çerez tercihlerinde verdiğiniz{" "}
                <strong>açık rızaya</strong> dayanır.
              </li>
            </ul>
            <p>
              Özel nitelikli kişisel verileriniz, KVKK’nın 6. maddesi uyarınca{" "}
              <strong>açık rızanıza</strong> dayanılarak ve gerekli idari ve teknik tedbirler
              alınarak işlenir.
            </p>

            <h2 id="aktarim">5. Kişisel verilerin aktarılması</h2>
            <p>
              Danışmanlık görüşmelerinde paylaştıklarınız, yasal zorunluluklar dışında onayınız
              olmadan hiçbir üçüncü kişiyle paylaşılmaz. Kişisel verileriniz yalnızca aşağıdaki
              durumlarda ve amaçla sınırlı olarak aktarılabilir:
            </p>
            <ul>
              <li>
                <strong>Yetkili kamu kurum ve kuruluşları:</strong> kanunen yetkili mercilerin
                talebi hâlinde ve mevzuatın gerektirdiği ölçüde.
              </li>
              <li>
                <strong>Hizmet sağlayıcılar:</strong> randevu formunun iletilmesi için e-posta
                altyapısı sağlayıcıları (EmailJS ve Google/Gmail) ile web sitesinin barındırma ve
                altyapı hizmeti sağlayıcıları (Netlify, Supabase).
              </li>
              <li>
                <strong>Ziyaret istatistikleri sağlayıcısı:</strong> izin vermeniz hâlinde,
                ziyaret istatistiklerinin oluşturulması için Google Analytics hizmetini sunan
                Google LLC / Google Ireland Limited.
              </li>
            </ul>
            <p>
              Bu hizmet sağlayıcıların sunucuları yurt dışında bulunabilir. Randevu formunu
              göndermeniz hâlinde form içeriği, talebinizin Danışmana iletilmesi amacıyla bu
              sağlayıcılar üzerinden yurt dışına aktarılır; bu aktarım KVKK’nın 9. maddesi
              kapsamında formdaki onay kutusuyla verdiğiniz <strong>açık rızanıza</strong>{" "}
              dayanır. Google Analytics verileri de yalnızca çerez tercihlerinde “Kabul et”i
              seçmeniz hâlinde, verdiğiniz açık rızaya dayanılarak Google’ın yurt dışındaki
              sunucularına aktarılır; “Reddet”i seçerseniz bu aktarım yapılmaz. Formu kullanmak istemezseniz bize telefonla ulaşabilirsiniz. WhatsApp
              üzerinden yazmayı tercih ederseniz, yazışmalarınız WhatsApp’ın kendi gizlilik
              koşullarına tabi olur.
            </p>

            <h2 id="saklama">6. Saklama süresi ve güvenlik</h2>
            <p>
              Kişisel verileriniz, işlenme amacının gerektirdiği süre ve ilgili mevzuatta
              öngörülen saklama süreleri boyunca saklanır. Bu sürelerin sonunda resen veya
              talebiniz üzerine silinir, yok edilir ya da anonim hâle getirilir.
            </p>
            <p>
              Verilerinizin hukuka aykırı olarak işlenmesini ve erişilmesini önlemek için uygun
              güvenlik düzeyini sağlamaya yönelik gerekli teknik ve idari tedbirler alınır.
              Web sitesiyle kurulan bağlantılar şifrelidir (HTTPS).
            </p>

            <h2 id="haklariniz">7. KVKK kapsamındaki haklarınız</h2>
            <p>KVKK’nın 11. maddesi uyarınca veri sorumlusuna başvurarak:</p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
              <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
              <li>KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
              <li>Düzeltme, silme ve yok etme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
              <li>Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>
            <p>haklarına sahipsiniz. Verdiğiniz açık rızayı dilediğiniz zaman geri alabilirsiniz.</p>

            <h2 id="basvuru">8. Başvuru yolu</h2>
            <p>
              Haklarınıza ilişkin taleplerinizi; Veri Sorumlusuna Başvuru Usul ve Esasları
              Hakkında Tebliğ’e uygun olarak, kimliğinizi tespit edici bilgilerle birlikte{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> adresine, sistemlerimizde kayıtlı
              e-posta adresinizden, kayıtlı elektronik posta (KEP), güvenli elektronik imza veya
              mobil imza ile ya da yazılı olarak iletebilirsiniz. Başvurunuz, niteliğine göre en
              kısa sürede ve en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.
            </p>

            <h2 id="cerezler">9. Çerezler ve benzeri teknolojiler</h2>
            <p>
              Bu web sitesinde reklam veya pazarlama amaçlı çerez kullanılmaz. Ziyaret
              istatistikleri için kullanılan analitik çerezler ise <strong>yalnızca açık
              rızanızla</strong> çalışır: siteye ilk girişinizde çıkan bilgilendirmede
              “Kabul et”i seçmediğiniz sürece bu çerezler yüklenmez.
            </p>
            <ul>
              <li>
                <strong>Analitik çerezler (Google Analytics):</strong> <code>_ga</code> ve{" "}
                <code>_ga_*</code> çerezleri, ziyaretleri ayırt etmek ve sayfa görüntüleme
                istatistiklerini oluşturmak için kullanılır; en fazla 2 yıl saklanır. Google
                Analytics’in IP adreslerini kaydetmediği ve verileri toplu raporlar hâlinde
                sunduğu belirtilmektedir. Ayrıntılar için{" "}
                <a href="https://policies.google.com/privacy?hl=tr" target="_blank" rel="noopener noreferrer">
                  Google Gizlilik Politikası
                </a>
                ’na bakabilirsiniz.
              </li>
              <li>
                <strong>Tercih kaydı:</strong> çerez tercihinizin (kabul/ret) tekrar sorulmaması
                için tarayıcınızın yerel depolamasında (localStorage) kişisel veri içermeyen bir
                kayıt tutulur.
              </li>
              <li>
                Blog yazılarındaki görüntülenme sayısı, aynı ziyaretin tekrar sayılmaması için
                tarayıcınızın oturum depolamasında (sessionStorage) kişisel veri içermeyen bir
                işaret tutar; tarayıcıyı kapattığınızda silinir.
              </li>
              <li>
                Yönetim paneli yalnızca site yöneticisi için bir oturum çerezi kullanır; ziyaretçiler
                için çerez oluşturulmaz.
              </li>
              <li>
                Blog yazılarına gömülü YouTube videoları gizlilik odaklı modda
                (youtube-nocookie.com) yüklenir; videoyu oynattığınızda YouTube’un kendi
                koşulları geçerli olur. Harita bağlantıları Google Haritalar’da açılır.
              </li>
            </ul>
            <p>
              Tercihinizi dilediğiniz zaman sayfanın en altındaki <strong>“Çerez
              tercihleri”</strong> bağlantısından değiştirebilirsiniz. İzninizi geri
              aldığınızda Google Analytics durdurulur ve tarayıcınızdaki analitik çerezler
              silinir. Ayrıca tarayıcınızın ayarlarından çerezleri silebilir veya
              engelleyebilirsiniz.
            </p>

            <p className="!mt-12 border-t border-line pt-6 text-base text-ink-muted">
              Bu metin, mevzuattaki ve sitedeki değişikliklere bağlı olarak güncellenebilir.
              Sorularınız için{" "}
              <Link href="/iletisim">iletişim sayfasından</Link> bize ulaşabilirsiniz.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

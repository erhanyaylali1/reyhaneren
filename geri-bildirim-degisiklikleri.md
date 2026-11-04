# Geri bildirim değişiklikleri

**Tarih:** 4 Kasım 2026
**Kaynak:** `reyhaneren.com.tr feedback.pdf`

Her maddede şunlar var: önerilen değişiklik, seçilen versiyon ve değişen dosyalar. "Bizim versiyon" olan maddelerde neden farklı yazıldığı da açıklandı.

---

## 1. Ana sayfa: üst bölüm (hero)

### 1.1 Alt açıklama — *bizim versiyon*
| | Metin |
|---|---|
| Eski | Aile Danışmanı Reyhan Eren ile güvenli ve yargısız bir ortamda ilişkinizdeki düğümleri birlikte çözün. Sorunlar çözüme kavuşurken yeni bir bakış açısı ve farkındalık kazanın. |
| Önerilen | …tarafsız ve güvenli bir ortamda ilişkilerinizdeki döngülerin farkına varın. Kendinize ve ilişkinize dair yeni bir bakış açısı kazanırken çözümleri beraber düşünün. |
| **Yeni** | **Aile Danışmanı Reyhan Eren ile tarafsız ve güvenli bir ortamda ilişkilerinizdeki tekrar eden döngüleri fark edin. Kendinize ve ilişkinize yeni bir yerden bakarken çözümleri birlikte arayalım.** |

**Neden:** Önerinin fikri olduğu gibi korundu: döngüler, tarafsızlık, çözümü birlikte düşünmek. İki küçük değişiklik yapıldı. "Tekrar eden" kelimesi "döngü"yü somutlaştırıyor. Son cümle de okura verilen bir görev yerine ortak bir davet oluyor ("birlikte arayalım").

📄 `src/app/(site)/page.tsx`

### 1.2 Sağ taraftaki boşluk: yeşil çizgi — *bizim versiyon*
**Önerilen:** Kartvizitteki gibi yeşil, dolaşık çizgiler.

**Yeni:** Üst kısmı dolaşık bir düğüm olan, aşağıya doğru açılıp tek ve sakin bir çizgiye dönüşen yeşil bir çizim. Sayfa açılınca çizgi bir kez kendini çiziyor.

**Neden:** Çizim süs olmanın ötesinde yeni metnin anlamını da taşıyor: döngüleri fark et, çözüme doğru ilerle. Yazının okunmasını engellememesi için sadece geniş ekranlarda görünüyor, telefonda gizli. Hareket hassasiyeti ayarını açmış ziyaretçilerde animasyon çalışmıyor.

📄 `src/components/hero-line.tsx` (yeni), `src/app/globals.css`, `src/app/(site)/page.tsx`

### 1.3 Görüşme şekilleri satırı (bireysel vurgusu) — *bizim öneri*
Başlığın altındaki "Yüz yüze · Online" satırına üçüncü bir madde eklendi: **"Bireysel · Çift · Aile — İlişki odaklı seanslar"**.

**Neden:** Bireysel seanslar ilk ekranda görünür hâle geliyor (genel notlardaki "bireysel seansı az vurgulamışız" yorumu).

📄 `src/app/(site)/page.tsx`

---

## 2. Randevu bölümü

### 2.1 Form açıklaması — *önerilen versiyon (olduğu gibi)*
| | Metin |
|---|---|
| Eski | Formu doldurun, size uygun bir zaman planlamak için sizi arayalım. Hangi hizmetin size uygun olduğundan emin değilseniz, bunu da ilk görüşmede birlikte belirleriz. |
| **Yeni** | **Formu doldurun, danışmanlık hizmetleri ile ilgili size ulaşalım ve seanslarınızın uygun planlamasını beraber yapalım.** |

Hem ana sayfada hem İletişim sayfasında değişti.

📄 `src/app/(site)/page.tsx`, `src/app/(site)/iletisim/page.tsx`

### 2.2 "Formla uğraşmak istemiyor musunuz?" → WhatsApp — *bizim versiyon*
| | |
|---|---|
| Eski | "Formla uğraşmak istemiyor musunuz?" + telefon numarası (tıklayınca arama başlıyordu) |
| Önerilen | "Whatsapp İletişim: 0541 162 0827" |
| **Yeni** | **"Dilerseniz doğrudan WhatsApp'tan yazın"** + WhatsApp simgesi + 0541 162 08 27 |

Numaraya tıklanınca WhatsApp hazır bir selam mesajıyla açılıyor. Tıklamalar Google Analytics'te `whatsapp_click` olarak sayılıyor.

**Neden:** Formu "uğraş" gibi göstermek yerine ziyaretçiyi yazmaya davet eden, daha sıcak bir ifade.

📄 `src/app/(site)/page.tsx`

### 2.3 Formda "Yüz yüze" seçeneği kapatıldı — *bizim versiyon*
- "Yüz yüze" seçeneği görünüyor ama seçilemiyor: kesik çizgili ve soluk duruyor. Altında **"Şu an yeni yüz yüze randevu alamıyoruz"** yazıyor.
- **"Online" seçeneği hazır seçili geliyor.** Böylece kimse soluk bir seçenekte takılıp kalmıyor.
- Seçeneklerin altında bir not var: **"Yüz yüze seanslar geçici olarak kapalı; online seanslarımız tüm Türkiye'den devam ediyor."**

**Neden:** Önerilen cümle ("…kapasitemiz bulunmamaktadır") kurumsal ve biraz soğuk duruyordu.

**Yeniden açmak için:** `appointment-form.tsx` içinde `disabled: true` değerini `false` yapmak ve açıklamayı tekrar "Bayraklı, İzmir" olarak yazmak yeterli.

📄 `src/components/appointment-form.tsx`

---

## 3. "Ofis" ifadeleri: sitenin tamamında kaldırıldı — *bizim öneri (kapsam genişletildi)*
**Önerilen:** Sadece kapanış bandındaki "ofiste" kelimesinin çıkarılması.

**Yeni:** "Ofis" kelimesi bütün sitede kaldırıldı ve yerine "Bayraklı'da yüz yüze" ifadesi kullanıldı. Değişen yerler:
- Ana sayfadaki SSS ("danışmanlık ofisimizde")
- Süreç adımı 1
- Alt bilgi (footer)
- İletişim sayfası ("Yüz yüze seanslar için ofis" → "Yüz yüze seanslar İzmir Bayraklı'da")
- Blog yazılarının altındaki "Bu konuda destek almak ister misiniz?" kutusu
- Bireysel, çift ve aile hizmet sayfaları (açıklamalar ve SSS cevapları)
- Online danışmanlık sayfası ("Ofise gelmesi zor olan…" → "Yüz yüze seanslara gelmesi zor olan…")

**Neden:** Gerçekte bir ofis yok. Google da siteyi, adresi olmayan Google İşletme Profili ile karşılaştırıyor; bu tutarsızlık yerel sıralamaya zarar verir. Yerel arama için gerekli olan "Bayraklı / İzmir" ifadeleri korundu.

### 3.1 Kapanış bandı ("İlk adımı birlikte atalım") — *önerilen versiyon*
**Yeni:** "Bayraklı'da yüz yüze ya da Türkiye'nin her yerinden online görüşme için randevu oluşturabilirsiniz."

📄 `src/app/(site)/page.tsx`, `src/app/(site)/iletisim/page.tsx`, `src/components/site-footer.tsx`, `src/components/page-ui.tsx`, `src/components/blog/related-services.tsx`, `src/lib/content.ts`

---

## 4. "Ön görüşme" ifadeleri: sitenin tamamında kaldırıldı — *önerilen (kurumsal dahil)*
| Yer | Eski | Yeni |
|---|---|---|
| Süreç adımı 1 (ana sayfa ve hizmet sayfaları) | Ön Görüşme ve İhtiyaç Analizi | **İlk Seans ve İhtiyaç Analizi** |
| İletişim: telefon kartı | Arayın, kısa bir ön görüşme yapalım. | **Arayın ya da WhatsApp'tan yazın.** |
| İletişim: sayfa girişi | Kısa bir ön görüşmede başvuru konunuzu dinleyip… | **…başvuru konunuzu dinleyip seanslarınızın planlamasını birlikte yapalım.** |
| Ana sayfa SSS ("Randevu almak için ne yapmalıyım?") | Kısa bir ön görüşmede… | **Size ulaştığımızda başvuru konunuzu dinleyip seanslarınızın planlamasını birlikte yapıyoruz.** |
| Kurumsal: kapanış bandı | Kurumunuz için bir ön görüşme planlayalım | **Kurumunuz için bir çalışma planlayalım** |
| Kurumsal: adım 1 | Ön Görüşme | **İhtiyaçların Belirlenmesi** |
| Kurumsal: planlama paragrafı | …bir ön görüşmeyle başlar… | **Hedefler, katılımcı grubu ve uygun format kurumun yetkilileriyle birlikte belirlenir.** |

📄 `src/lib/content.ts`, `src/app/(site)/page.tsx`, `src/app/(site)/iletisim/page.tsx`

---

## 5. Bireysel seans vurgusu — *bizim öneri (genel nota karşılık)*
- Hizmetin adı **"Bireysel Danışmanlık" → "İlişki Odaklı Bireysel Danışmanlık"** oldu. Değişen yerler: hizmet kartı, menü/alt bilgi, randevu formundaki hizmet listesi ve hizmet sayfasının başlığı.
  - Sayfa adresi (`/hizmetler/bireysel-danismanlik`) ve arama motoru başlığı değişmedi, SEO etkilenmiyor.
- Ana sayfadaki görüşme şekilleri satırına eklendi (bkz. 1.3).
- Hizmetler giriş metnine eklendi (bkz. 6).

📄 `src/lib/site.ts`, `src/lib/content.ts`

---

## 6. Hizmetler giriş metni — *bizim versiyon*
| | Metin |
|---|---|
| Eski | Bireysel danışmanlıktan çift terapisine, aile danışmanlığından kurumsal çalışmalara kadar her süreci ihtiyacınıza göre şekillendiriyorum. Hangisinin size uygun olduğundan emin değilseniz, bunu ilk görüşmede birlikte belirleriz. |
| Önerilen | Bireysel görüşmelerden çift seanslarına her süreci ihtiyacınıza göre beraber şekillendiriyoruz. Neyin size uygun olduğundan emin değilseniz, randevu formunu doldurun, beraber planlayalım! |
| **Yeni** | **İlişki odaklı bireysel görüşmelerden çift ve aile seanslarına kadar her süreci ihtiyacınıza göre birlikte şekillendiriyoruz. Hangisinin size uygun olduğundan emin değilseniz randevu formunu doldurun, birlikte planlayalım.** |

**Neden:**
- "Aile" kelimesi geri eklendi. "Aile danışmanlığı" en önemli arama kelimelerinden biri, metinden çıkması SEO'ya zarar verirdi.
- "İlişki odaklı bireysel" eklendi (bkz. 5).
- Ünlem yerine nokta kullanıldı, sitenin sakin üslubuna daha uygun.

Hem ana sayfada hem /hizmetler sayfasında değişti.

📄 `src/app/(site)/page.tsx`, `src/app/(site)/hizmetler/page.tsx`

---

## 7. Hakkımda sayfası

### 7.1 Giriş metni — *bizim versiyon*
**Yeni:** "İzmir Bayraklı'da yüz yüze, Türkiye genelinde online olarak aile danışmanlığı ve çift terapisi seansları yürütüyorum. İnsanların yaşam boyu gelişimine ve ilişki süreçlerine duyduğum merak, beni kimya mühendisliğinden sosyolojiye, oradan da aile danışmanlığına yönlendirdi."

**Neden:**
- Önerilen metin "kimya mühendisliğinden aile danışmanlığı alanına" diyordu. Gerçek yol mühendislik → sosyoloji → aile danışmanlığı olduğu için sosyoloji adımı geri eklendi.
- "Yürütmekteyim" yerine daha doğal olan "yürütüyorum" kullanıldı.

### 7.2 Hikâye bölümü — *önerilen metin + 4 düzeltme*
Başlık: **"Mühendislikten insan ilişkilerine uzanan yolculuk"**. Sitedeki diğer başlıklarla uyumlu olsun diye sadece ilk harf büyük.

Önerilen metnin yapısı, iki maddesi ve kapanış paragrafı korundu. Sadece şu dört nokta düzeltildi:

| # | Önerilen | Yeni | Neden |
|---|---|---|---|
| 1 | Bu karar, … bırakmaya ve … başlamaya yönlendirdi | Bu karar, beni … bırakıp … başlamaya yöneltti | Dil bilgisi |
| 2 | Danışmanlık odama taşıdığım… | Seanslarıma taşıdığım… | "Oda" fiziksel bir ofis olduğunu ima ediyor |
| 3 | Mühendislikten aldığım disiplinle… | Mühendislik eğitimiyle başlayan analitik düşünme alışkanlığımla… | Tamamlanmamış bir bölüm için daha dürüst bir ifade |
| 4 | …doğru iletişim formüllerini… | …kendilerine uygun iletişim yollarını… | "Tek doğru formül" fikri, yargısız ve sistemik yaklaşımla çelişiyor |

Okumayı kolaylaştırmak için üniversite ve program adları kalın yazıldı. İki madde ("Analitik bakış açısı", "Geniş ve empatik perspektif") sol kenarda ince yeşil bir çizgiyle gruplandı.

### 7.3 Eğitim ve uzmanlık — *önerilen + bizim düzen*
En yeni eğitim en üstte:

| Yıl | Kurum · Program | Not |
|---|---|---|
| Devam Ediyor | Akdeniz Üniversitesi · Sosyoloji Yüksek Lisans | Tez: Ekonomik Prekaritenin Romantik Pratiklere Etkisi |
| 2025 | Marmara Üniversitesi · Aile Danışmanlığı Eğitimi | Aile Danışmanı unvanı |
| 2022 | Akdeniz Üniversitesi · Sosyoloji Lisans | Yüksek onur derecesi · Tez: **Dijital** Flört Kültürü |

Lisans tezinin adı PDF'teki gibi "Dijital Flört Kültürü" olarak güncellendi. Ana sayfadaki kısa biyografi de buna göre değişti.

Google'ın okuduğu yapısal veride Akdeniz Üniversitesi zaten "mezun olunan kurum" olarak kayıtlı. Yüksek lisans devam ettiği için ayrıca bir kayıt eklenmedi.

### 7.4 Yaklaşımım bölümü — *bizim versiyon*
| | |
|---|---|
| Eski başlık | Sistemik yaklaşım: sorunu ilişkinin içinde görmek |
| **Yeni başlık** | **Sistemik yaklaşım: ilişkiyi bir bütün olarak görmek** |
| Önerilen son cümle | Sosyoloji biliminden almış olduğum kültür bu tabloya … eklemeyi kolaylaştırmaktadır. |
| **Yeni son cümle** | **Sosyoloji birikimim de bu tabloya kuşaklar arası aktarılan alışkanlıkları, toplumsal beklentileri ve gündelik hayatın çeşitli baskılarını katmamı kolaylaştırıyor.** |

**Neden:**
- Yeni başlık olumlu ve "sistemik" kelimesinin gerçek anlamını veriyor.
- Son cümlede önerinin içeriği korundu. Sayfanın geri kalanı birinci tekil şahısla yazıldığı için "-maktadır" yerine "-yor" kullanıldı. "Kültür" kelimesi bu bağlamda tuhaf durduğu için "birikim" tercih edildi.

📄 `src/app/(site)/hakkimda/page.tsx`, `src/lib/content.ts`, `src/app/(site)/page.tsx`

---

## 8. "Haritada aç" bağlantıları kaldırıldı — *karar: Erhan*
Gerçek bir ofis olmadığı için Google Haritalar konumuna giden bağlantılar kaldırıldı:
- **Alt bilgi (footer):** "Bayraklı, İzmir · Haritada aç" → sadece **"Bayraklı, İzmir"** (bağlantısız).
- **İletişim sayfası, Konum kartı:** Kart artık tıklanmıyor, sadece bilgi veriyor. Açıklama "…— haritada açın." yerine **"Yüz yüze seanslar İzmir Bayraklı'da."**
- **Google'ın okuduğu yapısal veri:** Aynı harita konumu işletme bilgisinde de (`hasMap`) Google'a bildiriliyordu, o da kaldırıldı. Böylece site ile adresi gizli İşletme Profili birbiriyle çelişmiyor.

📄 `src/components/site-footer.tsx`, `src/app/(site)/iletisim/page.tsx`, `src/app/layout.tsx`, `src/lib/site.ts`

---

## Alınan kararlar
- **Yüz yüze vurgusu:** Hero, kapanış bandı ve diğer metinler yüz yüze seanslardan bahsetmeye devam ediyor. **Yüz yüze seansların şu an kapalı olduğu sadece randevu formunda yazıyor** (bkz. 2.3). Bu bilinçli bir tercih: yüz yüze hizmet sunuluyor ama şu an yeni randevu alınmıyor.

---

## 9. Profil fotoğrafı — *Reyhan'ın isteği*
**İstek:** Fotoğraf çok fazla kırpılmış ve yüz ortalanmamıştı. Orijinal fotoğraf gönderildi.

**Yeni:**
- **Ana portre** (ana sayfa, Hakkımda, sosyal medya paylaşım görseli): Sitenin kullandığı 4:5 oranında, yüzü yatayda ortalanmış ve çok daha geniş bir kadraj. Saç, omuzlar ve koltuk görünüyor; kenarlardaki lambalar az kırpıldı.
- **Blog yazar fotoğrafı (küçük yuvarlak):** Yüz ortalandı. Duvardaki priz kadraj dışında kalacak şekilde ayarlandı.
- Sağ kenarda duvardaki priz ve kablolar görünüyor. Bunlar orijinal fotoğrafta omza çok yakın olduğu için tamamen çıkarmak, fotoğrafı yeniden sıkı kırpmak anlamına geliyordu. Bu yüzden bırakıldı.
- Dosya adları değiştirildi (`…-portre.jpg`). Böylece tarayıcı ve CDN önbelleği eski fotoğrafı göstermiyor, yeni fotoğraf deploy'dan hemen sonra görünür.

📄 `public/reyhan-eren-aile-danismani-izmir-portre.jpg`, `public/reyhan-eren-avatar-portre.jpg`, ve bu dosyaları kullanan sayfalar

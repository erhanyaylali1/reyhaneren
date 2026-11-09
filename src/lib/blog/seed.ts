import type { PostInput } from "./types";

// Demo content so the blog isn't empty before a database exists.
// Delete this file once posts live in the DB.
export const seedPosts: (PostInput & { publishedAt: string; views: number })[] = [
  {
    title: "Çiftler Neden Hep Aynı Konuda Tartışır?",
    slug: "ciftler-neden-hep-ayni-konuda-tartisir",
    excerpt:
      "Bulaşık, para, telefon… Konu değişse de kavganın sonu hep aynıysa, asıl mesele konunun kendisi değil, o konunun ilişkide neyi temsil ettiğidir.",
    coverImage: null,
    coverAlt: "",
    status: "published",
    publishedAt: "2026-10-18T09:00:00.000Z",
    views: 412,
    contentHtml: `
<p>Danışan çiftlerden en sık duyduğum cümlelerden biri şu: <em>“Aslında çok saçma bir şey yüzünden tartıştık.”</em> Gerçekten de kavganın başladığı yer çoğu zaman sıradan bir konudur. Ama tartışma büyüdükçe ikisi de o konunun çoktan geride kaldığını hisseder.</p>
<h2>Konu değil, anlam</h2>
<p>Lavaboda bekleyen bulaşık bir kişi için yalnızca bulaşıktır; diğeri içinse <mark data-color="#fde68a" style="background-color: #fde68a">“benim yorgunluğum görülmüyor”</mark> demektir. Tartışma bulaşık üzerinden yürüdükçe asıl ihtiyaç — görülmek, takdir edilmek — hiç konuşulmaz.</p>
<blockquote><p>Tekrarlayan kavgalar, söylenemeyen bir ihtiyacın her seferinde başka bir kılıkta geri dönmesidir.</p></blockquote>
<h2>Döngüyü fark etmek</h2>
<p>Çoğu çiftte tartışmalar tanıdık bir koreografiyle ilerler. Biri üstüne gider, diğeri geri çekilir; geri çekilen ne kadar susarsa diğerinin sesi o kadar yükselir. Bu döngüde kimse kötü niyetli değildir, ikisi de kendini korumaya çalışır.</p>
<ul>
<li><strong>Takipçi taraf</strong> bağlantının koptuğunu hisseder ve onu geri kazanmak için ısrar eder.</li>
<li><strong>Geri çekilen taraf</strong> çatışmanın büyümesinden korkar ve ortamı sakinleştirmek için uzaklaşır.</li>
</ul>
<p>Döngüyü fark etmek, onu durdurmanın ilk adımıdır. “Yine o noktaya geldik” diyebilmek, suçlamayı kişiden alıp ikisinin ortak düşmanı olan döngüye yöneltir.</p>
<h2>Evde deneyebileceğiniz küçük bir adım</h2>
<p>Bir dahaki tartışmada konuya girmeden önce kendinize şunu sorun: <span style="color: #8a5239"><strong>Şu an bu konu bana ne hissettiriyor ve partnerimden aslında neye ihtiyacım var?</strong></span> Cümlenizi “sen hep…” ile değil, “ben … hissediyorum, çünkü …” ile kurmayı deneyin.</p>
<p>Bu küçük değişiklik tartışmayı tek başına çözmez; ama kavganın yönünü “kim haklı” sorusundan “birbirimizi nasıl duyarız” sorusuna çevirir. Döngü çok köklüyse çift terapisi, bu örüntüyü güvenli bir ortamda birlikte çözmenize yardımcı olabilir.</p>`,
  },
  {
    title: "Ergenlik Döneminde Çocuğunuzla Bağı Korumak",
    slug: "ergenlik-doneminde-cocugunuzla-bagi-korumak",
    excerpt:
      "Kapanan oda kapıları, tek kelimelik cevaplar… Ergenlikte uzaklaşma doğaldır; ebeveynin görevi bu mesafede köprüyü yıkmadan ayakta tutmaktır.",
    coverImage: null,
    coverAlt: "",
    status: "published",
    publishedAt: "2026-09-27T09:00:00.000Z",
    views: 287,
    contentHtml: `
<p>Dün akşam yemekte her şeyi anlatan çocuk, bugün “bilmiyorum” ve “öyle işte” dışında bir şey söylemiyor olabilir. Pek çok ebeveyn bu değişimi bir kayıp gibi yaşar. Oysa ergenlikte mesafe, sağlıklı bir bireyleşmenin parçasıdır.</p>
<h2>Uzaklaşma bir reddediliş değil</h2>
<p>Ergen, kim olduğunu anlamak için ailesinden biraz uzaklaşmaya ihtiyaç duyar. Bu dönemde ebeveynin en önemli görevi kontrolü artırmak değil, <mark data-color="#fed7aa" style="background-color: #fed7aa">ulaşılabilir kalmaktır</mark>.</p>
<h3>Bağı güçlendiren küçük alışkanlıklar</h3>
<ol>
<li><strong>Yan yana zaman:</strong> Arabada, yürürken ya da birlikte yemek yaparken konuşmak, karşılıklı oturup “konuşalım” demekten çok daha kolaydır.</li>
<li><strong>Merak, sorgu değil:</strong> “Neden geç kaldın?” yerine “Bugün nasıl geçti, en çok ne hoşuna gitti?”</li>
<li><strong>Onun dünyasına ilgi:</strong> Dinlediği müziği, oynadığı oyunu küçümsemeden sormak.</li>
<li><strong>Tamir etmek:</strong> Sert bir an yaşandığında ilk adımı ebeveynin atması.</li>
</ol>
<blockquote><p>Ergenler ebeveynlerini dinlemez gibi görünür; ama onları izlemeyi hiç bırakmazlar.</p></blockquote>
<h2>Sınırlar hâlâ önemli</h2>
<p>Yakınlık, sınırsızlık demek değildir. Net, tutarlı ve gerekçesi açıklanmış sınırlar ergene güven verir. Önemli olan, sınırın bir ceza aracı değil, onu korumanın bir yolu olarak sunulmasıdır.</p>
<p>Evdeki gerginlik uzun süredir devam ediyorsa ya da çocuğunuzda içe kapanma, okul reddi gibi belirgin değişiklikler görüyorsanız, aile danışmanlığı tüm aileye yeni bir iletişim dili kazandırabilir.</p>`,
  },
  {
    title: "Boşanma Sürecinde Çocuklara Nasıl Anlatılmalı?",
    slug: "bosanma-surecinde-cocuklara-nasil-anlatilmali",
    excerpt:
      "Boşanma kararı çocuklar için de büyük bir değişim. Ne söylediğiniz kadar nasıl söylediğiniz de onların bu süreci nasıl taşıyacağını belirler.",
    coverImage: null,
    coverAlt: "",
    status: "published",
    publishedAt: "2026-09-05T09:00:00.000Z",
    views: 538,
    contentHtml: `
<p>Boşanma, yetişkinler için olduğu kadar çocuklar için de hayatın zeminini değiştiren bir deneyimdir. Çocuğun bu süreci nasıl yaşayacağını belirleyen en önemli etken, <strong>boşanmanın kendisinden çok ebeveynlerin bu süreci nasıl yönettiğidir</strong>.</p>
<h2>Birlikte ve sakin bir anda konuşun</h2>
<p>Mümkünse haberi iki ebeveyn birlikte vermelidir. Bu, çocuğa “ayrılsak da sizin için hâlâ bir ekibiz” mesajını verir. Konuşmayı bir tartışmanın hemen ardından değil, sakin ve zamanın bol olduğu bir anda yapın.</p>
<h2>Yaşına uygun, dürüst ve kısa</h2>
<ul>
<li>Okul öncesi çocuklar için basit ve somut cümleler kullanın: “Annen ve babam artık ayrı evlerde yaşayacak.”</li>
<li>Okul çağındaki çocuklar günlük hayatın nasıl değişeceğini merak eder: Okul, odası, arkadaşları.</li>
<li>Ergenler daha fazla açıklama isteyebilir; ama yetişkin sorunlarının ayrıntıları onların yükü değildir.</li>
</ul>
<blockquote><p>“Bu senin suçun değil” cümlesini bir kez söylemek yetmez; çocuklar bunu defalarca duymaya ihtiyaç duyar.</p></blockquote>
<h2>Kaçınılması gerekenler</h2>
<p><span style="color: #8a5239"><strong>Çocuğu bir taraf seçmeye zorlamak</strong></span>, diğer ebeveyn hakkında olumsuz konuşmak ya da çocuğu mesaj taşıyıcısı olarak kullanmak, boşanmanın kendisinden çok daha yaralayıcı olabilir.</p>
<p>Süreç boyunca çocuğunuzun duygularını düzeltmeye çalışmak yerine onlara alan açın. Üzüntü, öfke ya da kafa karışıklığı bu değişime verilen doğal tepkilerdir. Desteğe ihtiyaç duyduğunuzu hissederseniz, aile danışmanlığı hem sizin hem çocuklarınız için güvenli bir alan sağlayabilir.</p>`,
  },
];

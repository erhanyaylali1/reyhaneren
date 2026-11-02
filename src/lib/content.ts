import type { Faq } from "@/components/page-ui";
import type { ServiceSlug } from "./site";

// Copy shared by several pages. Facts here (education, dates, session length)
// are the single source — update them once and every page follows.

export const credentials = [
  {
    year: "2025",
    title: "Aile Danışmanlığı Eğitimi",
    institution: "Marmara Üniversitesi",
    note: "Aile Danışmanı unvanı",
  },
  {
    year: "2022",
    title: "Sosyoloji Lisans",
    institution: "Akdeniz Üniversitesi",
    note: "Yüksek onur derecesi · Tez: Flört Kültürü",
  },
];

export const steps = [
  {
    title: "Ön Görüşme ve İhtiyaç Analizi",
    body: "İlk seansta İzmir Bayraklı ofisimizde yüz yüze veya online ortamda bir araya gelerek sizi danışmanlığa getiren temel konuları, beklentilerinizi ve ilişki dinamiklerinizi yargısız bir çerçevede dinliyoruz.",
  },
  {
    title: "Ortak Danışmanlık Hedeflerinin Belirlenmesi",
    body: "İlişkinizde veya bireysel yaşamınızda tekrarlayan iletişim düğümlerini tespit ederek, her iki tarafın da duygusal ihtiyaçlarını gözeten şeffaf ve yapılandırılmış bir yol haritası oluşturuyoruz.",
  },
  {
    title: "Güvenli İletişim ve Yeniden Yapılandırma",
    body: "Seanslar ilerledikçe sağlıklı sınır koyma, empatik dinleme ve çatışma çözme becerilerini günlük yaşamınıza aktararak kalıcı ve huzurlu bir ilişki zemini inşa ediyoruz.",
  },
];

export const SESSION_LENGTH = "50–60 dakika";

// ─── Service pages ──────────────────────────────────────────────────────────

export type ServiceContent = {
  slug: ServiceSlug;
  metaTitle: string;
  metaDescription: string;
  serviceType: string;
  kicker: string;
  title: string;
  accent: string;
  lead: string;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  topicsHeading: string;
  topics: string[];
  faqs: Faq[];
};

export const serviceContent: Record<ServiceSlug, ServiceContent> = {
  "cift-terapisi": {
    slug: "cift-terapisi",
    metaTitle: "İzmir Çift Terapisi — Bayraklı’da Yüz Yüze ve Online",
    metaDescription:
      "İzmir Bayraklı’da yüz yüze ve online çift terapisi. İletişim sorunları, güven, tekrarlayan tartışmalar ve evlilik krizlerinde Aile Danışmanı Reyhan Eren ile güvenli bir alan.",
    serviceType: "Çift terapisi",
    kicker: "Hizmetler · Çift terapisi",
    title: "İzmir çift terapisi",
    accent: "birbirinizi yeniden duymak için",
    lead: "İletişimin koptuğu, aynı tartışmaların döndüğü ya da güvenin sarsıldığı dönemlerde çift terapisi, iki tarafın da kendini güvende hissederek konuşabileceği yapılandırılmış bir alan sunar. Seanslar İzmir Bayraklı’daki ofiste yüz yüze ya da online olarak yapılır.",
    sections: [
      {
        heading: "Çift terapisi nedir?",
        paragraphs: [
          "Çift terapisi, ilişkideki sorunları tek bir kişinin “hatası” olarak değil, iki kişi arasında kurulan etkileşim döngüsü olarak ele alan bir danışmanlık sürecidir. Amaç kimin haklı olduğunu bulmak değil; tartışmaların altında yatan ihtiyaçları, kırgınlıkları ve beklentileri görünür kılmaktır.",
          "Sistemik yaklaşımla yürüttüğüm görüşmelerde, ilişkinizin geçmişini, aileden getirdiğiniz alışkanlıkları ve gündelik hayatın baskılarını birlikte değerlendiriyor; birbirinize nasıl yaklaştığınızı fark etmenize ve yeni bir iletişim dili kurmanıza destek oluyorum.",
        ],
      },
      {
        heading: "Bayraklı’da yüz yüze ya da online seanslar",
        paragraphs: [
          "Yüz yüze seanslar İzmir Bayraklı’daki danışmanlık ofisinde, gizliliğin korunduğu sakin bir ortamda yapılır. Farklı şehirlerde yaşayan, yoğun çalışan ya da ofise gelmesi zor olan çiftler için aynı süreç güvenli görüntülü görüşmeyle online olarak da yürütülebilir.",
          "Partnerinizin henüz hazır olmadığı durumlarda sürece bireysel görüşmelerle başlamak da mümkündür; uygun olduğunda ortak seanslara geçilir.",
        ],
      },
    ],
    topicsHeading: "Çift terapisinde sık çalıştığımız konular",
    topics: [
      "İletişim kopukluğu ve sürekli tekrarlayan tartışmalar",
      "Güven sorunları ve aldatılma sonrası süreç",
      "Evlilik öncesi değerlendirme ve beklentilerin netleşmesi",
      "Çocuk sahibi olduktan sonra değişen ilişki dengesi",
      "Geniş aile ile sınırlar ve sadakat çatışmaları",
      "Duygusal uzaklaşma, yalnızlık hissi ve yakınlık sorunları",
      "Ayrılık ya da boşanma kararı öncesinde netleşme",
    ],
    faqs: [
      {
        q: "Çift terapisine ikimizin birlikte gelmesi şart mı?",
        a: "Hayır. Partneriniz henüz hazır değilse ya da katılmak istemiyorsa süreç bireysel görüşmelerle başlayabilir. İlişkideki kendi payınızı ve ihtiyaçlarınızı ele almak çoğu zaman ilişkinin tamamına olumlu yansır; uygun olduğunda ortak seanslara geçilir.",
      },
      {
        q: "Çift terapisi seansları ne kadar sürer?",
        a: `Bir seans genellikle ${SESSION_LENGTH} sürer. Toplam seans sayısı, başvuru konusuna ve belirlediğimiz hedeflere göre değişir; ilk görüşmenin ardından size uygun bir yol haritası birlikte oluşturulur.`,
      },
      {
        q: "Online çift terapisi yüz yüze kadar etkili olur mu?",
        a: "Online seanslar, sessiz ve kesintisiz bir ortam sağlandığında yüz yüze görüşmelerle aynı yapıda yürütülür. Farklı şehirlerde yaşayan ya da zaman kısıtı olan çiftler için sürecin düzenli devam etmesini kolaylaştırır.",
      },
    ],
  },

  "aile-danismanligi": {
    slug: "aile-danismanligi",
    metaTitle: "Bayraklı Aile Danışmanlığı ve Aile Terapisi — İzmir",
    metaDescription:
      "İzmir Bayraklı’da aile danışmanlığı ve aile terapisi: ebeveyn–çocuk ilişkileri, ergenlik dönemi, boşanma süreci ve aile içi iletişim için yüz yüze ve online destek.",
    serviceType: "Aile danışmanlığı",
    kicker: "Hizmetler · Aile danışmanlığı",
    title: "Bayraklı aile danışmanlığı",
    accent: "evde daha sakin bir iletişim için",
    lead: "Aile, üyelerinden birinde yaşanan zorluğun herkese yansıdığı bir sistemdir. Aile danışmanlığında bu sistemi bütün olarak ele alıyor; bireysel görüşmeler, ebeveyn seansları ya da tüm aileyle yapılan çalışmalarla evdeki iletişimi daha dengeli bir zemine taşıyoruz.",
    sections: [
      {
        heading: "Sistemik bakışla aile danışmanlığı",
        paragraphs: [
          "Sistemik aile danışmanlığında bir çocuğun içe kapanması, ergenin öfkesi ya da ebeveynler arasındaki gerginlik, tek başına bir “sorun” olarak değil, aile içindeki ilişkilerin bir yansıması olarak değerlendirilir. Bu bakış, suçlayıcı olmayan ve herkesin sesinin duyulduğu bir süreç sağlar.",
          "Sosyoloji eğitimimin kazandırdığı bakış açısıyla, ailenin içinde bulunduğu sosyal koşulları, kuşaklar arası aktarılan alışkanlıkları ve değişen rolleri de görüşmelerin parçası hâline getiriyorum.",
        ],
      },
      {
        heading: "Bireysel, ebeveyn ve aile seansları",
        paragraphs: [
          "Her aile için aynı format uygun olmayabilir. Kimi zaman süreç bir ebeveynin bireysel görüşmeleriyle başlar, kimi zaman anne ve babanın birlikte katıldığı ebeveyn seanslarıyla ilerler, gerektiğinde çocukların ya da diğer aile üyelerinin katıldığı ortak görüşmeler planlanır.",
          "Seanslar İzmir Bayraklı’daki ofiste yüz yüze ya da online olarak yapılabilir.",
        ],
      },
    ],
    topicsHeading: "Aile danışmanlığında sık çalıştığımız konular",
    topics: [
      "Ebeveyn–çocuk iletişimi ve tutarlı sınırlar",
      "Ergenlik dönemindeki çatışmalar ve uzaklaşma",
      "Boşanma sürecinin çocuklara anlatılması ve ortak ebeveynlik",
      "Kardeş kıskançlığı ve aile içindeki roller",
      "Yeni kurulan aileler ve geniş aileyle ilişkiler",
      "Kayıp, taşınma, iş değişikliği gibi zorlayıcı yaşam olayları",
      "Bireysel olarak aile ve ilişki içindeki zorlanmalar",
    ],
    faqs: [
      {
        q: "Aile danışmanlığına tüm ailenin katılması gerekir mi?",
        a: "Gerekmez. Süreç çoğu zaman bir ya da iki ebeveynle başlar. İlk görüşmede hangi formatın ailenize uygun olduğunu birlikte değerlendirir, gerekirse diğer aile üyelerinin katılacağı görüşmeleri sonradan planlarız.",
      },
      {
        q: "Çocuğum için mi, kendim için mi başvurmalıyım?",
        a: "Çocuklarla ilgili kaygıların büyük bölümünde ebeveynlerle çalışmak en etkili başlangıçtır; çünkü evdeki iletişim değiştiğinde çocuğun davranışı da değişir. İlk görüşmede durumu dinleyip size en uygun yolu birlikte belirleriz.",
      },
      {
        q: "Aile danışmanlığı seansları nerede yapılıyor?",
        a: "Yüz yüze seanslar İzmir Bayraklı’daki danışmanlık ofisinde yapılır. Şehir dışında yaşayan aileler için online görüşme seçeneği de vardır.",
      },
    ],
  },

  "online-danismanlik": {
    slug: "online-danismanlik",
    metaTitle: "Online Aile Danışmanlığı ve Online Çift Terapisi",
    metaDescription:
      "Türkiye’nin ve dünyanın her yerinden online aile danışmanlığı ve online çift terapisi. Aile Danışmanı Reyhan Eren ile güvenli görüntülü görüşme, esnek randevu saatleri.",
    serviceType: "Online aile danışmanlığı ve çift terapisi",
    kicker: "Hizmetler · Online danışmanlık",
    title: "Online aile danışmanlığı",
    accent: "nerede olursanız olun",
    lead: "İzmir dışında yaşıyorsanız, yoğun bir iş temponuz varsa ya da kendi alanınızda konuşmak size daha iyi geliyorsa, aile danışmanlığı ve çift terapisi seanslarına güvenli görüntülü görüşmeyle online olarak katılabilirsiniz.",
    sections: [
      {
        heading: "Online seanslar nasıl işler?",
        paragraphs: [
          `Online görüşmeler, yüz yüze seanslarla aynı yapı ve özenle yürütülür. Randevu saatinde size iletilen bağlantı üzerinden görüntülü olarak bir araya geliriz; bir seans genellikle ${SESSION_LENGTH} sürer.`,
          "Çiftler aynı odadan birlikte ya da gerekirse farklı yerlerden katılabilir. Yurt dışında yaşayan danışanlar için saat farkını gözeten bir planlama yapılır.",
        ],
        list: [
          "Kimsenin duymayacağı, sessiz ve kapalı bir oda",
          "Kesintisiz bir internet bağlantısı",
          "Kamera ve mikrofonu olan bir bilgisayar, tablet ya da telefon",
          "Mümkünse kulaklık — hem ses kalitesi hem mahremiyet için",
        ],
      },
      {
        heading: "Gizlilik ve güven",
        paragraphs: [
          "Online seanslarda da paylaşılan her bilgi mesleki etik ilkeleri çerçevesinde gizli tutulur. Görüşmeler kayıt altına alınmaz ve sizin onayınız olmadan üçüncü kişilerle paylaşılmaz.",
        ],
      },
    ],
    topicsHeading: "Online olarak destek alabileceğiniz konular",
    topics: [
      "Online çift terapisi ve ilişki danışmanlığı",
      "Bireysel aile ve ilişki danışmanlığı",
      "Ebeveyn danışmanlığı ve çocuk–ergen ile iletişim",
      "Uzak mesafe ilişkileri",
      "Yurt dışında yaşayan aileler ve çiftler",
      "Ofise gelmesi zor olan, yoğun çalışan danışanlar",
    ],
    faqs: [
      {
        q: "Online danışmanlık için hangi programı kullanıyorsunuz?",
        a: "Randevu oluşturulduktan sonra görüntülü görüşme bağlantısı size iletilir. Görüşmeye telefon, tablet ya da bilgisayardan katılabilirsiniz.",
      },
      {
        q: "Yurt dışından online seans alabilir miyim?",
        a: "Evet. Türkiye dışında yaşayan danışanlarla da online görüşme yapılabilir; randevu saatleri saat farkı gözetilerek planlanır.",
      },
      {
        q: "Online ve yüz yüze seanslar arasında geçiş yapılabilir mi?",
        a: "Evet. İzmir’de olduğunuz dönemlerde Bayraklı’daki ofiste yüz yüze, diğer zamanlarda online devam edebilirsiniz; süreç kesintisiz sürer.",
      },
    ],
  },
};

import type { Faq } from "@/components/page-ui";
import type { ServicePageSlug } from "./site";

// Copy shared by several pages. Facts here (education, dates, session length)
// are the single source — update them once and every page follows.

export const credentials = [
  {
    year: "Devam Ediyor",
    title: "Sosyoloji Yüksek Lisans",
    institution: "Akdeniz Üniversitesi",
    note: "Tez: Ekonomik Prekaritenin Romantik Pratiklere Etkisi",
  },
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
    note: "Yüksek onur derecesi · Tez: Dijital Flört Kültürü",
  },
];

export const certificates = [
  { title: "Aile Danışmanlığı", institution: "Marmara Üniversitesi" },
  { title: "Kısa Süreli Çözüm Odaklı Terapi", institution: "Tal Akademi" },
  { title: "Pedagojik Formasyon", institution: "Dokuz Eylül Üniversitesi" },
  {
    title: "Proje Yönetimi",
    institution: "Ümmühan Elginkan Mesleki ve Teknik Eğitim Merkezi",
  },
  {
    title: "Sağlıklı Yaşam Yönetimi",
    institution: "Ümmühan Elginkan Mesleki ve Teknik Eğitim Merkezi",
  },
  {
    title: "Doğru ve Etkili Konuşmanın Temelleri",
    institution: "İstanbul İşletme Enstitüsü",
  },
  {
    title: "İnsan Kaynakları Eğitimi",
    institution: "İstanbul İşletme Enstitüsü",
  },
];

export const steps = [
  {
    title: "İlk Seans ve İhtiyaç Analizi",
    body: "İlk seansta yüz yüze veya online olarak bir araya gelerek sizi danışmanlığa getiren temel konuları, beklentilerinizi ve ilişki dinamiklerinizi yargısız bir çerçevede dinliyoruz.",
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
  slug: ServicePageSlug;
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
  /** Sidebar facts; defaults to session length + format. */
  facts?: { label: string; value: string }[];
  /** Process section; defaults to the shared counselling `steps`. */
  steps?: { title: string; body: string }[];
  /** Closing band copy; defaults to the generic appointment text. */
  cta?: { title: string; text: string };
};

export const serviceContent: Record<ServicePageSlug, ServiceContent> = {
  "bireysel-danismanlik": {
    slug: "bireysel-danismanlik",
    metaTitle: "Bireysel Danışmanlık İzmir — Yüz Yüze ve Online",
    metaDescription:
      "İzmir Bayraklı’da yüz yüze ve online bireysel danışmanlık: ilişki, aile ve yaşam geçişlerindeki zorlanmalarınızı Aile Danışmanı Reyhan Eren ile güvenli bir alanda ele alın.",
    serviceType: "Bireysel danışmanlık",
    kicker: "Hizmetler · Bireysel danışmanlık",
    title: "İlişki odaklı bireysel danışmanlık",
    accent: "ilişkilerinize kendinizden başlayarak",
    lead: "İlişkinizde, ailenizde ya da hayatınızın bir geçiş döneminde zorlandığınızda, her zaman diğer kişilerle birlikte başvurmanız gerekmez. Bireysel danışmanlıkta ihtiyaçlarınızı, ilişki kurma biçiminizi ve sınırlarınızı birlikte ele alıyoruz. Seanslar İzmir Bayraklı’da yüz yüze ya da online olarak yapılır.",
    sections: [
      {
        heading: "Birey odaklı aile danışmanlığı nedir?",
        paragraphs: [
          "Bireysel danışmanlık, aile ve ilişki yaşamınızda karşılaştığınız zorlukları sizinle birebir yapılan görüşmelerde ele alır. Odak yalnızca yaşadığınız sorunda değil; bu sorunun içinde bulunduğunuz ilişkilerle nasıl bağlantılı olduğundadır.",
          "Sistemik bakış açısıyla, ailenizden getirdiğiniz alışkanlıkları, tekrar eden ilişki örüntülerini ve gündelik hayatın baskılarını birlikte değerlendiriyoruz. Amaç, kendinizi ve ihtiyaçlarınızı daha net görmeniz ve ilişkilerinizde daha özgür seçimler yapabilmenizdir.",
        ],
      },
      {
        heading: "Kimler için uygun?",
        paragraphs: [
          "Partneriniz ya da aile üyeleriniz sürece katılmak istemediğinde, bir ilişki kararı öncesinde düşüncelerinizi netleştirmek istediğinizde ya da yalnızca kendinize ayrılmış bir alana ihtiyaç duyduğunuzda bireysel görüşmeler iyi bir başlangıçtır.",
          "Gerektiğinde süreç, uygun olduğu noktada çift ya da aile görüşmeleriyle devam edebilir.",
        ],
      },
    ],
    topicsHeading: "Bireysel danışmanlıkta sık çalıştığımız konular",
    topics: [
      "İlişkide kararsızlık ve tekrar eden ilişki örüntüleri",
      "Partneriniz katılmak istemediğinde ilişki sorunları",
      "Ailenizle ve geniş aileyle sınır koyma",
      "Ayrılık ya da boşanma sonrasına uyum",
      "Ebeveynlikte zorlanma ve tükenmişlik hissi",
      "Taşınma, evlilik, iş değişikliği gibi yaşam geçişleri",
    ],
    faqs: [
      {
        q: "Bireysel danışmanlığa ilişki sorunları için tek başıma gelebilir miyim?",
        a: "Evet. İlişkideki kendi payınızı, ihtiyaçlarınızı ve iletişim biçiminizi ele almak çoğu zaman ilişkinin tamamına olumlu yansır. Uygun olduğunda partnerinizin de katılımıyla ortak seanslara geçilebilir.",
      },
      {
        q: "Bireysel danışmanlık seansları ne kadar sürer?",
        a: `Bir seans genellikle ${SESSION_LENGTH} sürer. Seans sayısı başvuru konunuza ve birlikte belirlediğimiz hedeflere göre değişir; ilerlemeyi düzenli olarak birlikte gözden geçiririz.`,
      },
      {
        q: "Bireysel seanslar online yapılabilir mi?",
        a: "Evet. Bireysel danışmanlık, Bayraklı’da yüz yüze olduğu gibi Türkiye’nin ve dünyanın her yerinden güvenli görüntülü görüşmeyle online olarak da yürütülebilir.",
      },
    ],
  },
  "cift-terapisi": {
    slug: "cift-terapisi",
    metaTitle: "İzmir Çift Terapisi — Bayraklı’da Yüz Yüze ve Online",
    metaDescription:
      "İzmir Bayraklı’da yüz yüze ve online çift terapisi. İletişim sorunları, güven, tekrarlayan tartışmalar ve evlilik krizlerinde Aile Danışmanı Reyhan Eren ile güvenli bir alan.",
    serviceType: "Çift terapisi",
    kicker: "Hizmetler · Çift terapisi",
    title: "İzmir çift terapisi",
    accent: "birbirinizi yeniden duymak için",
    lead: "İletişimin koptuğu, aynı tartışmaların döndüğü ya da güvenin sarsıldığı dönemlerde çift terapisi, iki tarafın da kendini güvende hissederek konuşabileceği yapılandırılmış bir alan sunar. Seanslar İzmir Bayraklı’da yüz yüze ya da online olarak yapılır.",
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
          "Yüz yüze seanslar İzmir Bayraklı’da, gizliliğin korunduğu sakin bir ortamda yapılır. Farklı şehirlerde yaşayan, yoğun çalışan ya da yüz yüze seanslara gelmesi zor olan çiftler için aynı süreç güvenli görüntülü görüşmeyle online olarak da yürütülebilir.",
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
      "İzmir Bayraklı’da aile danışmanlığı: ebeveyn–çocuk ilişkileri, ergenlik dönemi, boşanma süreci ve aile içi iletişim için yüz yüze ve online destek.",
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
          "Seanslar İzmir Bayraklı’da yüz yüze ya da online olarak yapılabilir.",
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
        a: "Yüz yüze seanslar İzmir Bayraklı’da yapılır. Şehir dışında yaşayan aileler için online görüşme seçeneği de vardır.",
      },
    ],
  },

  "online-danismanlik": {
    slug: "online-danismanlik",
    metaTitle: "Online Aile Danışmanlığı ve Online Çift Terapisi",
    metaDescription:
      "Türkiye’nin ve dünyanın her yerinden online aile danışmanlığı ve online çift terapisi. Aile Danışmanı Reyhan Eren ile güvenli görüntülü görüşme, esnek randevu saatleri.",
    serviceType: "Online aile danışmanlığı ve çift terapisi",
    kicker: "Görüşme şekli · Online",
    title: "Online aile danışmanlığı",
    accent: "nerede olursanız olun",
    lead: "Bireysel danışmanlık, çift terapisi, aile danışmanlığı ve kurumsal çalışmaların tamamı online olarak da yapılabilir. İzmir dışında yaşıyorsanız, yoğun bir iş temponuz varsa ya da kendi alanınızda konuşmak size daha iyi geliyorsa, seanslara güvenli görüntülü görüşmeyle katılabilirsiniz.",
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
    topicsHeading: "Online olarak alabileceğiniz hizmetler",
    topics: [
      "Online bireysel danışmanlık",
      "Online çift terapisi",
      "Online aile ve ebeveyn danışmanlığı",
      "Online kurumsal çalışmalar",
      "Uzak mesafe ilişkileri",
      "Yurt dışında yaşayan aileler ve çiftler",
      "Yüz yüze seanslara gelmesi zor olan, yoğun çalışan danışanlar",
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
        a: "Evet. İzmir’de olduğunuz dönemlerde Bayraklı’da yüz yüze, diğer zamanlarda online devam edebilirsiniz; süreç kesintisiz sürer.",
      },
    ],
  },
  "kurumsal-danismanlik": {
    slug: "kurumsal-danismanlik",
    metaTitle: "Kurumsal Danışmanlık — Ekip İletişimi ve İş–Aile Dengesi",
    metaDescription:
      "İzmir ve online kurumsal danışmanlık: ekip içi iletişim, çatışma yönetimi ve iş–aile dengesi üzerine kuruma özel seminer, atölye ve danışmanlık çalışmaları.",
    serviceType: "Kurumsal danışmanlık",
    kicker: "Hizmetler · Kurumsal danışmanlık",
    title: "Kurumsal danışmanlık",
    accent: "iş yerinde daha sağlıklı ilişkiler için",
    lead: "Çalışanların iş yerindeki ilişkileri ve aile yaşamları birbirinden bağımsız değildir. Kurumlara yönelik çalışmalarla ekip içi iletişimi güçlendirmeyi, çatışmaları daha yapıcı yönetmeyi ve iş–aile dengesini gözeten daha tatmin edici bir çalışma deneyimini desteklemeyi amaçlıyorum.",
    sections: [
      {
        heading: "Neden kurumsal danışmanlık?",
        paragraphs: [
          "Bir ekipteki iletişim sorunları, tıpkı ailelerde olduğu gibi çoğu zaman tek bir kişiden değil, kişiler arasında yerleşmiş alışkanlıklardan ve tekrar eden döngülerden kaynaklanır. Sistemik bakış, bu döngüleri suçlayıcı olmadan görünür kılmaya yardım eder.",
          "Evde yaşanan zorlanmalar işe, iş yerindeki baskılar da eve taşınır. Bu nedenle çalışmalarda yalnızca ekip ilişkilerini değil, çalışanların iş ve aile yaşamı arasındaki dengeyi de ele alıyorum.",
        ],
      },
      {
        heading: "Kuruma özel planlama",
        paragraphs: [
          "Her kurumun ihtiyacı farklıdır. Hedefler, katılımcı grubu ve uygun format kurumun yetkilileriyle birlikte belirlenir. Çalışmalar İzmir’de kurumunuzda yüz yüze ya da online olarak planlanabilir.",
        ],
        list: [
          "Seminer ve bilgilendirme sunumları",
          "Küçük gruplarla interaktif atölyeler",
          "Yöneticilere yönelik iletişim odaklı görüşmeler",
          "Çalışanlara yönelik aile ve ilişki danışmanlığı yönlendirmesi",
        ],
      },
    ],
    topicsHeading: "Kurumsal çalışmalarda ele alınan konular",
    topics: [
      "Ekip içi iletişim ve geri bildirim kültürü",
      "Çatışma yönetimi ve yapıcı tartışma becerileri",
      "İş–aile dengesi ve sınır koyma",
      "Ebeveyn çalışanlar ve aile yaşamındaki geçiş dönemleri",
      "Stresli dönemlerde ekip içi destek",
      "Yöneticiler için empatik ve açık iletişim",
    ],
    cta: {
      title: "Kurumunuz için bir çalışma planlayalım",
      text: "İhtiyaçlarınızı dinlemek ve size özel bir çalışma önermek için arayın, WhatsApp’tan yazın ya da formu doldurun.",
    },
    facts: [
      { label: "Çalışma şekli", value: "Kuruma özel" },
      { label: "Yer", value: "Kurumunuzda · Online" },
    ],
    steps: [
      {
        title: "İhtiyaçların Belirlenmesi",
        body: "Ekibin ihtiyaçlarını, beklentileri ve öncelikli konuları kurum yetkilileriyle birlikte belirliyoruz.",
      },
      {
        title: "Kuruma Özel Program",
        body: "Hedeflere, katılımcı grubuna ve takviminize uygun format ve içerikte bir çalışma planı hazırlıyoruz.",
      },
      {
        title: "Uygulama ve Değerlendirme",
        body: "Çalışmaları yüz yüze ya da online olarak yürütüyor, sonunda kurumla birlikte genel bir değerlendirme yapıyoruz.",
      },
    ],
    faqs: [
      {
        q: "Kurumsal danışmanlık hangi kurumlar için uygun?",
        a: "Ekip içi iletişimini güçlendirmek, çalışanlarının iş–aile dengesini desteklemek ya da belirli bir zorlu dönemi birlikte yönetmek isteyen her ölçekteki kurum için kuruma özel bir çalışma planlanabilir.",
      },
      {
        q: "Çalışmalar kurumda mı, online mı yapılıyor?",
        a: "Her ikisi de mümkündür. İzmir’deki kurumlarda yüz yüze, diğer şehirlerdeki ya da dağıtık çalışan ekiplerle online olarak planlanabilir.",
      },
      {
        q: "Çalışanların paylaştıkları yönetimle paylaşılır mı?",
        a: "Hayır. Çalışanların kişisel olarak paylaştıkları gizli tutulur. Kurumla yalnızca kimseyi tanımlamayan, genel bir değerlendirme paylaşılır.",
      },
    ],
  },
};

// Contact events for Google Analytics. These are the site's "key events"
// (Analytics → Yönetici → Önemli etkinlikler): generate_lead, phone_click,
// whatsapp_click. email_click is recorded but not a key event.
//
// No-op unless the visitor accepted cookies: window.gtag only exists once
// <GoogleAnalytics> has loaded (see components/cookie-consent.tsx).
// Never send personal data (name, phone, email, message, chosen service).

type GtagFn = (command: "event", name: string, params?: Record<string, string>) => void;

export function trackEvent(name: string, params?: Record<string, string>) {
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}

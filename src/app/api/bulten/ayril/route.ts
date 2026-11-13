import { isToken, unsubscribe } from "@/lib/newsletter/store";

// RFC 8058 one-click unsubscribe. Gmail/Outlook POST here when the reader
// presses the mail client's own "Abonelikten çık" button. (Opening links in
// the e-mail goes to the /bulten/ayril page instead, which asks to confirm.)
export async function POST(request: Request) {
  const t = new URL(request.url).searchParams.get("t");
  if (!isToken(t)) return new Response(null, { status: 400 });
  try {
    await unsubscribe(t);
    return new Response(null, { status: 200 });
  } catch (err) {
    console.error("[bülten] tek tıkla çıkış hatası", err);
    return new Response(null, { status: 500 });
  }
}

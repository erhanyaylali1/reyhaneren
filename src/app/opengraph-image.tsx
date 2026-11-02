import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Social preview (WhatsApp, X, LinkedIn, Facebook…) for every page that
// doesn't define its own. Rendered once at build time.

export const alt = "Reyhan Eren — İzmir Aile Danışmanlığı ve Çift Terapisi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fonts are subsets containing only the characters used below (OFL licensed).
const dir = join(process.cwd(), "src/app/_og");
const [serif, serifItalic, sans, portrait] = await Promise.all([
  readFile(join(dir, "newsreader-a.ttf")),
  readFile(join(dir, "newsreader-b.ttf")),
  readFile(join(dir, "figtree-500.ttf")),
  readFile(join(process.cwd(), "public/reyhan-eren-aile-danismani-izmir.jpg"), "base64"),
]);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f6f2ec", color: "#1f2a25" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "72px 64px 64px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Figtree", fontSize: 26, color: "#55605a" }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#3f5b4c" }} />
            Bayraklı, İzmir · Online tüm Türkiye
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Newsreader", fontSize: 76, lineHeight: 1.05, letterSpacing: -1.5 }}>
            <span>İzmir Aile Danışmanlığı</span>
            <span style={{ fontStyle: "italic", color: "#3f5b4c" }}>ve Çift Terapisi</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: 16, background: "#3f5b4c", color: "#f6f2ec", fontFamily: "Newsreader", fontSize: 40 }}>
              R
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Newsreader", fontSize: 34 }}>{site.person}</span>
              <span style={{ fontFamily: "Figtree", fontSize: 22, color: "#55605a" }}>reyhaneren.com.tr</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", padding: "40px 40px 40px 0" }}>
          <img
            src={`data:image/jpeg;base64,${portrait}`}
            alt=""
            width={400}
            height={550}
            style={{ width: 400, height: 550, objectFit: "cover", objectPosition: "top", borderRadius: 28 }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: serif, style: "normal", weight: 500 },
        { name: "Newsreader", data: serifItalic, style: "italic", weight: 500 },
        { name: "Figtree", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}

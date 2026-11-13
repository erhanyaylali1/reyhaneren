import "server-only";
import sanitizeHtml from "sanitize-html";

// The editor only produces this subset; anything else is dropped on save so a
// pasted <script> or onerror= can never reach a public page.
const COLOR = [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s.,%]+\)$/i, /^var\(--[a-z0-9-]+\)$/i];

export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s",
      "a", "ul", "ol", "li", "blockquote", "code", "pre", "hr",
      "mark", "span", "img", "div", "iframe",
      "table", "colgroup", "col", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: [
        "src", "alt", "title", "loading", "decoding", "style",
        { name: "data-width", multiple: false, values: Array.from({ length: 86 }, (_, i) => String(i + 15)) },
        { name: "data-align", multiple: false, values: ["left", "right"] },
      ],
      mark: ["data-color", "style"],
      span: ["style"],
      p: ["style"],
      h2: ["style"],
      h3: ["style"],
      h4: ["style"],
      div: ["data-youtube-video", "class"],
      table: ["style"],
      col: ["style"],
      th: ["colspan", "rowspan", "data-colwidth"],
      td: ["colspan", "rowspan", "data-colwidth"],
      iframe: ["src", "width", "height", "allowfullscreen", "allow", "title", "frameborder"],
    },
    // Tables are wrapped in <div class="tableWrapper"> so wide ones scroll
    // sideways on phones instead of breaking the layout.
    allowedClasses: { div: ["tableWrapper"] },
    allowedStyles: {
      img: { width: [/^(1[5-9]|[2-9]\d)%$/] },
      table: { "min-width": [/^\d{1,4}px$/], width: [/^\d{1,4}px$/] },
      col: { "min-width": [/^\d{1,4}px$/], width: [/^\d{1,4}px$/] },
      "*": {
        color: COLOR,
        "background-color": COLOR,
        "text-align": [/^(left|right|center|justify)$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https", "data"] },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const out: Record<string, string> = { href };
        if (/^https?:\/\//.test(href)) {
          out.target = "_blank";
          out.rel = "noopener noreferrer nofollow";
        }
        return { tagName, attribs: out };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: "lazy", decoding: "async" },
      }),
    },
  });
}

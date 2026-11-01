"use client";

import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extensions";
import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { uploadImageFile } from "@/lib/image";
import { Icon, type IconName } from "./icons";
import { ResizableImage } from "./resizable-image";

// ─── Palettes ───────────────────────────────────────────────────────────────

const TEXT_COLORS = [
  { name: "Adaçayı", value: "#3f5b4c" },
  { name: "Kil", value: "#8a5239" },
  { name: "Gece mavisi", value: "#3e5a68" },
  { name: "Kırmızı", value: "#b42318" },
  { name: "Turuncu", value: "#c2410c" },
  { name: "Mor", value: "#6b4c9a" },
  { name: "Gri", value: "#55605a" },
];

const HIGHLIGHTS = [
  { name: "Sarı", value: "#fde68a" },
  { name: "Turuncu", value: "#fed7aa" },
  { name: "Yeşil", value: "#d4e8c9" },
  { name: "Pembe", value: "#fbcfe8" },
  { name: "Mavi", value: "#cfe3f0" },
];

// ─── Editor ─────────────────────────────────────────────────────────────────

export function RichTextEditor({
  initialHtml,
  onChange,
}: {
  initialHtml: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false, // avoid SSR hydration mismatch
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      ResizableImage,
      Youtube.configure({ nocookie: true, width: 640, height: 360 }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Yazmaya başlayın…" }),
    ],
    content: initialHtml,
    editorProps: {
      attributes: {
        class: "prose-blog min-h-[28rem] px-5 py-8 sm:px-10 focus:outline-none",
        "aria-label": "Yazı içeriği",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div className="rounded-2xl border border-line bg-surface">
      {editor ? <Toolbar editor={editor} /> : <div className="h-14 border-b border-line" />}
      <EditorContent editor={editor} />
    </div>
  );
}

// ─── Toolbar ────────────────────────────────────────────────────────────────

function Toolbar({ editor }: { editor: Editor }) {
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      block: e.isActive("heading", { level: 2 })
        ? "h2"
        : e.isActive("heading", { level: 3 })
          ? "h3"
          : e.isActive("heading", { level: 4 })
            ? "h4"
            : "p",
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      link: e.isActive("link"),
      linkHref: (e.getAttributes("link").href as string | undefined) ?? "",
      color: (e.getAttributes("textStyle").color as string | undefined) ?? null,
      highlight: e.isActive("highlight"),
      bulletList: e.isActive("bulletList"),
      orderedList: e.isActive("orderedList"),
      blockquote: e.isActive("blockquote"),
      align: e.isActive({ textAlign: "center" })
        ? "center"
        : e.isActive({ textAlign: "right" })
          ? "right"
          : "left",
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  const chain = () => editor.chain().focus();

  return (
    <div
      role="toolbar"
      aria-label="Biçimlendirme"
      className="sticky top-16 z-10 flex flex-wrap items-center gap-0.5 rounded-t-2xl border-b border-line bg-surface px-2 py-2"
    >
      <Btn label="Geri al" icon="undo" disabled={!s.canUndo} onClick={() => chain().undo().run()} />
      <Btn label="Yinele" icon="redo" disabled={!s.canRedo} onClick={() => chain().redo().run()} />
      <Sep />

      <label className="sr-only" htmlFor="block-type">
        Paragraf biçimi
      </label>
      <select
        id="block-type"
        value={s.block}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "p") chain().setParagraph().run();
          else chain().toggleHeading({ level: Number(v[1]) as 2 | 3 | 4 }).run();
        }}
        className="h-8 rounded-lg border border-transparent bg-transparent pl-2 pr-7 text-sm text-ink transition-colors duration-150 hover:bg-sage-50 focus-visible:border-line-strong"
      >
        <option value="p">Paragraf</option>
        <option value="h2">Başlık</option>
        <option value="h3">Alt başlık</option>
        <option value="h4">Küçük başlık</option>
      </select>
      <Sep />

      <Btn label="Kalın (⌘B)" active={s.bold} onClick={() => chain().toggleBold().run()}>
        <span className="font-sans text-[15px] font-bold">B</span>
      </Btn>
      <Btn label="İtalik (⌘I)" active={s.italic} onClick={() => chain().toggleItalic().run()}>
        <span className="font-serif text-[17px] italic">I</span>
      </Btn>
      <Btn label="Altı çizili (⌘U)" active={s.underline} onClick={() => chain().toggleUnderline().run()}>
        <span className="text-[15px] underline underline-offset-2">U</span>
      </Btn>
      <Btn label="Üstü çizili" active={s.strike} onClick={() => chain().toggleStrike().run()}>
        <span className="text-[15px] line-through">S</span>
      </Btn>

      <Popover
        label="Yazı rengi"
        trigger={
          <span className="flex flex-col items-center leading-none">
            <span className="text-[15px] font-medium">A</span>
            <span
              className="mt-0.5 h-[3px] w-4 rounded-full"
              style={{ backgroundColor: s.color ?? "var(--color-ink)" }}
            />
          </span>
        }
      >
        {(close) => (
          <Swatches
            items={TEXT_COLORS}
            current={s.color}
            kind="text"
            onPick={(v) => {
              chain().setColor(v).run();
              close();
            }}
            onClear={() => {
              chain().unsetColor().run();
              close();
            }}
            clearLabel="Varsayılan renk"
          />
        )}
      </Popover>

      <Popover label="Vurgula" active={s.highlight} trigger={<Icon name="highlight" />}>
        {(close) => (
          <Swatches
            items={HIGHLIGHTS}
            current={null}
            kind="highlight"
            onPick={(v) => {
              chain().setHighlight({ color: v }).run();
              close();
            }}
            onClear={() => {
              chain().unsetHighlight().run();
              close();
            }}
            clearLabel="Vurguyu kaldır"
          />
        )}
      </Popover>
      <Sep />

      <Popover label="Bağlantı" active={s.link} trigger={<Icon name="link" />}>
        {(close) => <LinkForm editor={editor} initial={s.linkHref} close={close} />}
      </Popover>
      <Popover label="Görsel ekle" trigger={<Icon name="image" />}>
        {(close) => <ImageForm editor={editor} close={close} />}
      </Popover>
      <Popover label="Video ekle (YouTube)" trigger={<Icon name="video" />}>
        {(close) => <VideoForm editor={editor} close={close} />}
      </Popover>
      <Sep />

      <Btn label="Madde işaretli liste" icon="bulletList" active={s.bulletList} onClick={() => chain().toggleBulletList().run()} />
      <Btn label="Numaralı liste" icon="orderedList" active={s.orderedList} onClick={() => chain().toggleOrderedList().run()} />
      <Btn label="Alıntı" icon="quote" active={s.blockquote} onClick={() => chain().toggleBlockquote().run()} />
      <Btn label="Ayırıcı çizgi" icon="rule" onClick={() => chain().setHorizontalRule().run()} />
      <Sep />

      <Btn label="Sola hizala" icon="alignLeft" active={s.align === "left"} onClick={() => chain().setTextAlign("left").run()} />
      <Btn label="Ortala" icon="alignCenter" active={s.align === "center"} onClick={() => chain().setTextAlign("center").run()} />
      <Btn label="Sağa hizala" icon="alignRight" active={s.align === "right"} onClick={() => chain().setTextAlign("right").run()} />
      <Sep />

      <Btn
        label="Biçimlendirmeyi temizle"
        icon="clear"
        onClick={() => chain().unsetAllMarks().clearNodes().run()}
      />
    </div>
  );
}

// ─── Toolbar primitives ─────────────────────────────────────────────────────

const btnClass = (active?: boolean) =>
  `inline-flex size-8 items-center justify-center rounded-lg transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-35 ${
    active ? "bg-sage-100 text-sage-800" : "text-ink-muted hover:bg-sage-50 hover:text-ink"
  }`;

function Btn({
  label,
  icon,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  icon?: IconName;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} // keep the editor selection
      onClick={onClick}
      className={btnClass(active)}
    >
      {icon ? <Icon name={icon} /> : children}
    </button>
  );
}

function Sep() {
  return <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-line" />;
}

function Popover({
  label,
  trigger,
  active,
  children,
}: {
  label: string;
  trigger: ReactNode;
  active?: boolean;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        title={label}
        aria-label={label}
        aria-expanded={open}
        aria-controls={id}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((v) => !v)}
        className={btnClass(active || open)}
      >
        {trigger}
      </button>
      {open && (
        <div
          id={id}
          role="dialog"
          aria-label={label}
          className="absolute left-0 top-full z-20 mt-2 w-72 rounded-xl border border-line bg-surface p-3 shadow-[0_8px_24px_-8px_rgb(31_42_37/0.18)]"
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

function Swatches({
  items,
  current,
  kind,
  onPick,
  onClear,
  clearLabel,
}: {
  items: { name: string; value: string }[];
  current: string | null;
  kind: "text" | "highlight";
  onPick: (v: string) => void;
  onClear: () => void;
  clearLabel: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {items.map((c) => (
          <button
            key={c.value}
            type="button"
            title={c.name}
            aria-label={c.name}
            aria-pressed={current?.toLowerCase() === c.value}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onPick(c.value)}
            className="flex size-9 items-center justify-center rounded-lg border border-line transition-colors duration-150 hover:border-ink aria-pressed:border-ink"
            style={kind === "highlight" ? { backgroundColor: c.value } : undefined}
          >
            {kind === "text" ? (
              <span className="text-base font-semibold" style={{ color: c.value }}>
                A
              </span>
            ) : (
              <span className="text-sm text-ink">ab</span>
            )}
          </button>
        ))}
      </div>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClear}
        className="mt-3 w-full rounded-lg px-2 py-2 text-left text-sm text-ink-muted transition-colors duration-150 hover:bg-sage-50 hover:text-ink"
      >
        {clearLabel}
      </button>
    </div>
  );
}

// ─── Insert forms ───────────────────────────────────────────────────────────

const inputClass =
  "h-10 w-full rounded-lg border border-line-strong bg-canvas px-3 text-sm text-ink placeholder:text-ink-muted/70 focus-visible:border-sage-700";
const smallPrimary =
  "inline-flex h-9 items-center rounded-lg bg-sage-700 px-3.5 text-sm font-medium text-canvas transition-colors duration-150 hover:bg-sage-800 disabled:opacity-50";
const smallGhost =
  "inline-flex h-9 items-center rounded-lg px-3 text-sm text-ink-muted transition-colors duration-150 hover:bg-sage-50 hover:text-ink";

// These panels live inside the post <form>, so they can't be <form>s
// themselves; Enter in a text field applies instead of submitting the post.
const onEnter = (fn: () => void) => (e: ReactKeyboardEvent) => {
  if (e.key === "Enter" && e.target instanceof HTMLInputElement && e.target.type !== "file") {
    e.preventDefault();
    fn();
  }
};

function LinkForm({ editor, initial, close }: { editor: Editor; initial: string; close: () => void }) {
  const [href, setHref] = useState(initial);
  const apply = () => {
    const url = href.trim();
    const chain = editor.chain().focus().extendMarkRange("link");
    if (!url) chain.unsetLink().run();
    else chain.setLink({ href: /^(https?:|mailto:|tel:|\/|#)/.test(url) ? url : `https://${url}` }).run();
    close();
  };
  return (
    <div onKeyDown={onEnter(apply)}>
      <label className="text-xs font-medium text-ink-muted" htmlFor="link-url">
        Bağlantı adresi
      </label>
      <input
        id="link-url"
        autoFocus
        className={`${inputClass} mt-1.5`}
        value={href}
        onChange={(e) => setHref(e.target.value)}
        placeholder="https://…"
        inputMode="url"
      />
      <p className="mt-1.5 text-xs text-ink-muted">Önce bağlantı vermek istediğiniz metni seçin.</p>
      <div className="mt-3 flex justify-end gap-1.5">
        {initial && (
          <button
            type="button"
            className={smallGhost}
            onClick={() => {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
              close();
            }}
          >
            Kaldır
          </button>
        )}
        <button type="button" onClick={apply} className={smallPrimary}>
          Uygula
        </button>
      </div>
    </div>
  );
}

function ImageForm({ editor, close }: { editor: Editor; close: () => void }) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insert = (src: string) => {
    editor.chain().focus().setImage({ src, alt: alt.trim() }).run();
    close();
  };

  return (
    <div>
      <label className="flex h-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-line-strong text-sm text-ink-muted transition-colors duration-150 hover:border-sage-700 hover:text-ink">
        <Icon name="upload" />
        {busy ? "Yükleniyor…" : "Bilgisayardan yükle"}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={busy}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setBusy(true);
            setError(null);
            try {
              insert(await uploadImageFile(file, 1400));
            } catch (err) {
              setError(err instanceof Error ? err.message : "Görsel yüklenemedi.");
            } finally {
              setBusy(false);
            }
          }}
        />
      </label>
      <p className="my-2.5 text-center text-xs text-ink-muted">ya da bağlantı ile</p>
      <div onKeyDown={onEnter(() => url.trim() && insert(url.trim()))} className="space-y-2">
        <input
          aria-label="Görsel adresi"
          className={inputClass}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…/gorsel.jpg"
          inputMode="url"
        />
        <input
          aria-label="Görsel açıklaması (alt metin)"
          className={inputClass}
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          placeholder="Görsel açıklaması (erişilebilirlik için)"
        />
        {error && <p className="text-xs text-[#b42318]">{error}</p>}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => insert(url.trim())}
            className={smallPrimary}
            disabled={!url.trim()}
          >
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

function VideoForm({ editor, close }: { editor: Editor; close: () => void }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const insert = () => {
    if (!url.trim()) return;
    const ok = editor.chain().focus().setYoutubeVideo({ src: url.trim() }).run();
    if (ok) close();
    else setError("Geçerli bir YouTube bağlantısı girin.");
  };
  return (
    <div onKeyDown={onEnter(insert)}>
      <label className="text-xs font-medium text-ink-muted" htmlFor="video-url">
        YouTube bağlantısı
      </label>
      <input
        id="video-url"
        autoFocus
        className={`${inputClass} mt-1.5`}
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          setError(null);
        }}
        placeholder="https://www.youtube.com/watch?v=…"
        inputMode="url"
      />
      {error && <p className="mt-1.5 text-xs text-[#b42318]">{error}</p>}
      <div className="mt-3 flex justify-end">
        <button type="button" onClick={insert} className={smallPrimary} disabled={!url.trim()}>
          Ekle
        </button>
      </div>
    </div>
  );
}

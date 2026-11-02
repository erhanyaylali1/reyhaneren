"use client";

/* eslint-disable @next/next/no-img-element -- editor preview of arbitrary URLs */

import Image from "@tiptap/extension-image";
import { NodeViewWrapper, ReactNodeViewRenderer, type ReactNodeViewProps } from "@tiptap/react";
import { useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Icon } from "./icons";

// Image width is stored as a PERCENTAGE of the text column (not pixels), so
// a half-width image is half-width on a laptop and on a phone alike.
//   HTML: <img src="…" data-width="50" data-align="left" style="width: 50%">

type Align = "left" | "center" | "right";
const MIN = 15;

const PRESETS = [
  { label: "Küçük", value: 33 },
  { label: "Orta", value: 50 },
  { label: "Geniş", value: 75 },
  { label: "Tam", value: 100 },
];

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null as number | null,
        parseHTML: (el: HTMLElement) => {
          const raw = el.getAttribute("data-width") ?? el.style.width.match(/^(\d+)%$/)?.[1];
          const n = Number(raw);
          return n >= MIN && n < 100 ? Math.round(n) : null;
        },
        renderHTML: (attrs: { width: number | null }) =>
          attrs.width ? { "data-width": attrs.width, style: `width: ${attrs.width}%` } : {},
      },
      // Pixel height would distort percentage widths — never store it.
      height: { default: null, parseHTML: () => null, renderHTML: () => ({}) },
      align: {
        default: "center" as Align,
        parseHTML: (el: HTMLElement) => {
          const a = el.getAttribute("data-align");
          return a === "left" || a === "right" ? a : "center";
        },
        renderHTML: (attrs: { align: Align }) =>
          attrs.align === "center" ? {} : { "data-align": attrs.align },
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },
}).configure({ allowBase64: true, resize: false });

function ImageView({ node, updateAttributes, selected, editor }: ReactNodeViewProps) {
  const { src, alt } = node.attrs as { src: string; alt: string | null };
  const width = (node.attrs.width as number | null) ?? 100;
  const align = (node.attrs.align as Align) ?? "center";

  const columnRef = useRef<HTMLDivElement>(null);
  const altId = useId();
  // Alt text is edited in a local draft and committed on blur/Enter, so typing
  // doesn't dispatch a transaction per keystroke (which could drop the node
  // selection and unmount the field mid-word).
  const [altOpen, setAltOpen] = useState(false);
  const [altDraft, setAltDraft] = useState("");
  const missingAlt = !alt?.trim();
  const commitAlt = () => {
    if (altDraft.trim() !== (alt ?? "")) updateAttributes({ alt: altDraft.trim() });
    setAltOpen(false);
  };
  const [dragWidth, setDragWidth] = useState<number | null>(null);
  const shown = dragWidth ?? width;
  const editable = editor.isEditable;

  const setWidth = (pct: number) => updateAttributes({ width: pct >= 100 ? null : pct });

  const startDrag = (e: ReactPointerEvent<HTMLSpanElement>, side: 1 | -1) => {
    e.preventDefault();
    e.stopPropagation();
    const column = columnRef.current?.getBoundingClientRect().width;
    if (!column) return;
    const handle = e.currentTarget;
    handle.setPointerCapture(e.pointerId);
    const startX = e.clientX;
    const startPct = shown;
    // A centered image grows on both sides, so each pixel dragged counts twice.
    const factor = align === "center" ? 2 : 1;
    let latest = startPct;

    const move = (ev: PointerEvent) => {
      const delta = ((ev.clientX - startX) / column) * 100 * side * factor;
      latest = Math.round(Math.min(100, Math.max(MIN, startPct + delta)));
      setDragWidth(latest);
    };
    const end = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", end);
      handle.removeEventListener("pointercancel", end);
      setDragWidth(null);
      setWidth(latest);
    };
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
  };

  const margin =
    align === "left" ? "mr-auto" : align === "right" ? "ml-auto" : "mx-auto";
  const showLeft = align !== "left";
  const showRight = align !== "right";

  return (
    <NodeViewWrapper className="rt-image my-[1.25em]" data-align={align}>
      <div ref={columnRef} className="w-full">
        <div
          className={`group/img relative ${margin}`}
          style={{ width: `${shown}%`, minWidth: "min(100%, 9rem)" }}
        >
          <img
            src={src}
            alt={alt ?? ""}
            draggable={false}
            className={`block w-full rounded-2xl bg-sand-100 ${selected ? "outline-2 outline-offset-3 outline-sage-700" : ""}`}
          />

          {editable && (
            <>
              {showLeft && (
                <Handle side="left" visible={selected} onPointerDown={(e) => startDrag(e, -1)} />
              )}
              {showRight && (
                <Handle side="right" visible={selected} onPointerDown={(e) => startDrag(e, 1)} />
              )}
            </>
          )}

          {editable && (selected || altOpen) && (
            <div
              contentEditable={false}
              className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 rounded-xl border border-line bg-surface py-1.5 pl-3 pr-1.5 font-sans shadow-[0_8px_24px_-8px_rgb(31_42_37/0.25)]"
            >
              <label htmlFor={altId} className="shrink-0 text-xs font-medium text-ink-muted">
                Alt metin
              </label>
              <input
                id={altId}
                value={altOpen ? altDraft : (alt ?? "")}
                onFocus={() => {
                  setAltDraft(alt ?? "");
                  setAltOpen(true);
                }}
                onChange={(e) => setAltDraft(e.target.value)}
                onBlur={commitAlt}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitAlt();
                    e.currentTarget.blur();
                  }
                }}
                placeholder="Görselde ne var? (zorunlu)"
                aria-invalid={missingAlt && !altDraft.trim()}
                className="h-8 min-w-0 flex-1 rounded-lg border border-line-strong bg-canvas px-2.5 text-sm text-ink placeholder:text-ink-muted/70 transition-colors duration-150 focus-visible:border-sage-700 focus-visible:outline-none aria-invalid:border-clay-700"
              />
            </div>
          )}

          {editable && missingAlt && !selected && !altOpen && (
            <span
              contentEditable={false}
              className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-clay-700 px-2.5 py-1 font-sans text-xs font-medium text-canvas"
            >
              Alt metin eksik
            </span>
          )}

          {editable && (selected || dragWidth !== null) && (
            <div
              contentEditable={false}
              className="absolute left-1/2 top-3 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-xl border border-line bg-surface p-1 font-sans text-sm shadow-[0_8px_24px_-8px_rgb(31_42_37/0.25)]"
            >
              {PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setWidth(p.value)}
                  aria-pressed={shown === p.value}
                  className="h-8 rounded-lg px-2.5 whitespace-nowrap text-ink-muted transition-colors duration-150 hover:bg-sage-50 hover:text-ink aria-pressed:bg-sage-100 aria-pressed:text-sage-800"
                >
                  {p.label}
                </button>
              ))}
              <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-line" />
              {(["left", "center", "right"] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  title={a === "left" ? "Sola yasla" : a === "right" ? "Sağa yasla" : "Ortala"}
                  aria-label={a === "left" ? "Sola yasla" : a === "right" ? "Sağa yasla" : "Ortala"}
                  aria-pressed={align === a}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => updateAttributes({ align: a })}
                  className="inline-flex size-8 items-center justify-center rounded-lg text-ink-muted transition-colors duration-150 hover:bg-sage-50 hover:text-ink aria-pressed:bg-sage-100 aria-pressed:text-sage-800"
                >
                  <Icon
                    name={a === "left" ? "alignLeft" : a === "right" ? "alignRight" : "alignCenter"}
                    className="size-4"
                  />
                </button>
              ))}
              <span className="min-w-11 px-1.5 text-center tabular-nums text-ink-muted">
                %{shown}
              </span>
            </div>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
}

function Handle({
  side,
  visible,
  onPointerDown,
}: {
  side: "left" | "right";
  visible: boolean;
  onPointerDown: (e: ReactPointerEvent<HTMLSpanElement>) => void;
}) {
  return (
    <span
      aria-hidden="true"
      onPointerDown={onPointerDown}
      className={`absolute top-1/2 z-10 flex h-14 w-4 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center transition-opacity duration-150 ${
        side === "left" ? "-left-2" : "-right-2"
      } ${visible ? "opacity-100" : "opacity-0 group-hover/img:opacity-100"}`}
    >
      <span className="h-12 w-1.5 rounded-full border border-surface bg-sage-700" />
    </span>
  );
}

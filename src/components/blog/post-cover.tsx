import Image from "next/image";
import { canOptimizeImage } from "@/lib/image-hosts";

const TILES = [
  "bg-sage-100 text-sage-700",
  "bg-clay-100 text-clay-700",
  "bg-mist-100 text-mist-700",
  "bg-sand-100 text-sand-700",
];

function tileFor(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TILES[h % TILES.length];
}

type Props = {
  src: string | null;
  alt: string;
  title: string;
  /** Sizing/shape classes for the frame, e.g. "aspect-[3/2] w-full rounded-2xl". */
  className?: string;
  /** Rendered width hint for responsive srcset. */
  sizes: string;
  /** The page's LCP image: load immediately with high priority. */
  eager?: boolean;
};

export function PostCover({ src, alt, title, className = "", sizes, eager }: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-sand-100 ${className}`}>
        <Image
          src={src}
          // Posts saved before alt text became mandatory fall back to the title.
          alt={alt || title}
          fill
          sizes={sizes}
          // Hosts outside image-hosts.ts are shown as-is rather than proxied.
          unoptimized={!canOptimizeImage(src)}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className="object-cover"
        />
      </div>
    );
  }
  // No cover: a calm typographic tile in one of the brand tints.
  return (
    <div
      aria-hidden="true"
      className={`flex items-end overflow-hidden p-6 ${tileFor(title)} ${className}`}
    >
      <span className="font-serif text-[5.5rem] leading-[0.8] italic opacity-80 select-none">
        {title.trim().charAt(0)}
      </span>
    </div>
  );
}

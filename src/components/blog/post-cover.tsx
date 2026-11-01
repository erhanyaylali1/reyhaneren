/* eslint-disable @next/next/no-img-element --
   Covers can be any URL (and data: URLs in the demo). Switch to next/image
   with remotePatterns once images live in a known storage bucket. */

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
  className?: string;
  priority?: boolean;
};

export function PostCover({ src, alt, title, className = "", priority }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={`bg-sand-100 object-cover ${className}`}
      />
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

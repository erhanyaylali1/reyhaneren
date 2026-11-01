import { formatDate } from "@/lib/blog/text";

export function PostMeta({
  publishedAt,
  readingMinutes,
  children,
}: {
  publishedAt: string | null;
  readingMinutes: number;
  children?: React.ReactNode;
}) {
  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-ink-muted">
      {publishedAt && <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>}
      {publishedAt && <span aria-hidden="true">·</span>}
      <span>{readingMinutes} dk okuma</span>
      {children}
    </p>
  );
}

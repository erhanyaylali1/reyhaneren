import { NotFoundView } from "@/components/not-found-view";

// notFound() inside the site (e.g. a deleted blog post): the (site) layout
// already provides header and footer.
export default function SiteNotFound() {
  return <NotFoundView />;
}

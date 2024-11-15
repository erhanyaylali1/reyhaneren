import Link from "next/link";

const DesktopHeader = () => {
  return (
    <div>
      <Link href="hizmetler">Hizmetler</Link>
      <Link href="blog">Blog</Link>
      <Link href="hakkimda">Hakkımda</Link>
      <Link href="randevu-al">Randevu Al</Link>
    </div>
  );
};

export default DesktopHeader;

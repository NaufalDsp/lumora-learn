import Link from "next/link";

export function BrandLogo() {
  return (
    <Link className="brand-logo" href="/" aria-label="Lumora Learn beranda">
      <span className="brand-logo__mark">L</span>
      <span>
        <strong>Lumora</strong>
        <small>Learn</small>
      </span>
    </Link>
  );
}

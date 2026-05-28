import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { BrandLogo } from "@/src/components/ui/BrandLogo";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div>
        <BrandLogo />
        <p>{siteConfig.description}</p>
      </div>
      <div className="public-footer__links">
        <Link href="/courses">Katalog</Link>
        <Link href="/about">About Me</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/forgot-password">Reset password</Link>
      </div>
    </footer>
  );
}

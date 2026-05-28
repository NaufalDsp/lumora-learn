import Link from "next/link";
import { LogIn, Menu } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { BrandLogo } from "@/src/components/ui/BrandLogo";
import { ButtonLink } from "@/src/components/ui/ButtonLink";

export function PublicHeader() {
  return (
    <header className="public-header">
      <BrandLogo />
      <nav className="public-header__nav" aria-label="Navigasi publik">
        {siteConfig.navigation.slice(0, 2).map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="public-header__actions">
        <ButtonLink href="/login" variant="ghost">
          <LogIn size={17} />
          Masuk
        </ButtonLink>
        <ButtonLink href="/register" variant="primary">
          Daftar
        </ButtonLink>
      </div>
      <button className="icon-button public-header__menu" aria-label="Buka menu">
        <Menu size={20} />
      </button>
    </header>
  );
}

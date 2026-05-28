import Link from "next/link";
import { LogIn, Menu, X } from "lucide-react";
import { siteConfig } from "@/src/config/site";
import { BrandLogo } from "@/src/components/ui/BrandLogo";
import { ButtonLink } from "@/src/components/ui/ButtonLink";

export function PublicHeader() {
  const mainNavigation = siteConfig.navigation.filter(
    (item) => item.href !== "/login" && item.href !== "/register"
  );

  return (
    <header className="public-header">
      <BrandLogo />
      <nav className="public-header__nav" aria-label="Navigasi publik">
        {mainNavigation.map((item) => (
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
      <details className="public-header__mobile-menu">
        <summary className="icon-button" aria-label="Buka menu">
          <Menu className="menu-open-icon" size={20} />
          <X className="menu-close-icon" size={20} />
        </summary>
        <div className="public-header__mobile-panel">
          {siteConfig.navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </details>
    </header>
  );
}

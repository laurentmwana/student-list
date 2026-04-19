import { ButtonLink } from "./ui/button-link";
import React from "react";
import { ThemeToggle } from "./themes/theme-toggle";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { AppLogo } from "./app-logo";
import { usePathname } from "next/navigation";
import { UserButton } from "./user-button";
import { UserModel } from "@/app/generated/prisma/models/User";

type Props = { user: UserModel | null };

export const NavMenu = ({ user }: Props) => {
  const pathname = usePathname();
  const navbar = React.useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isMenuActive = (l: string) => {
    return pathname.startsWith(l);
  };

  const links = [
    { url: "/", label: "Accueil" },
    { url: "/about", label: "A propos" },
    { url: "/features", label: "Fonctionnalités" },
    { url: "/contact", label: "Contact" },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navbar}
      className={cn(
        "shadow-b fixed top-0 z-50 min-h-[var(--header-height)] w-full bg-background/70 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container flex max-w-screen-xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          onClick={handleLinkClick}
        >
          <AppLogo className="text-primary" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 font-sans text-sm font-medium tracking-wide md:flex">
          {links.map((l) => {
            const isActive = isMenuActive(l.url);
            return (
              <Link
                key={l.label}
                href={l.url}
                className={cn(
                  "transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Actions (Desktop) */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          {user ? (
            <UserButton user={user} />
          ) : (
            <ButtonLink href="/login" size="sm" className="inline-flex">
              Se connecter
            </ButtonLink>
          )}
        </div>

        {/* Mobile Menu Button with Sheet */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="group flex w-7 flex-col gap-1.5 md:hidden"
                aria-label="Open menu"
              >
                <span className="h-px w-full bg-foreground transition-colors group-hover:bg-primary"></span>
                <span className="h-px w-4 bg-foreground transition-colors group-hover:bg-primary"></span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <SheetHeader className="border-b border-border px-6 py-4">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <AppLogo className="size-6 text-primary" />
                  <span className="font-serif text-lg font-light">Menu</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-3 py-4">
                {links.map((l) => {
                  const isActive = isMenuActive(l.url);
                  return (
                    <Link
                      key={l.label}
                      href={l.url}
                      onClick={handleLinkClick}
                      className={cn(
                        "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                      )}
                    >
                      {l.label}
                    </Link>
                  );
                })}

                <div className="mt-4 border-t border-border pt-4">
                  {user ? (
                    <div className="flex items-center justify-between rounded-md bg-muted/50 p-3">
                      <span className="text-sm font-medium text-foreground">
                        {user.name}
                      </span>
                      <UserButton user={user} />
                    </div>
                  ) : (
                    <ButtonLink
                      href="/login"
                      className="w-full justify-center"
                      onClick={handleLinkClick}
                    >
                      Se connecter
                    </ButtonLink>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

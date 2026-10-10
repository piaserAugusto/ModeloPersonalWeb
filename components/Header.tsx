"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/lib/content";

/**
 * Header fijo con navegacion por anclas (#inicio, #servicios, ...).
 * El scroll suave y el offset sticky se resuelven en CSS:
 * ver `html { scroll-behavior: smooth; scroll-padding-top }` en app/globals.css.
 */
export default function Header() {
  const [activeId, setActiveId] = useState<string>(navLinks[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  /** Resalta la seccion que ocupa la parte superior de la ventana. */
  useEffect(() => {
    const updateActive = () => {
      frameRef.current = null;
      const offset = (headerRef.current?.offsetHeight ?? 0) + 120;
      const scrollY = window.scrollY + offset;

      const sections = navLinks
        .map((link) => document.getElementById(link.id))
        .filter((el): el is HTMLElement => el !== null);

      if (sections.length === 0) return;

      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top + window.scrollY <= scrollY) {
          current = section.id;
        }
      }

      // Al llegar al final de la pagina siempre queda activa la ultima seccion.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;

      setActiveId(current);
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  /** Bloquea el scroll del body y cierra con Escape mientras el menu esta abierto. */
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-brand"
    >
      <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <a
          href="#inicio"
          onClick={closeMenu}
          className="justify-self-start"
          aria-label={`${brand.fullName}, ir al inicio`}
        >
          <span className="text-base font-semibold uppercase tracking-[0.25em] text-white sm:text-lg">
            {brand.fullName}
          </span>
        </a>

        <nav
          aria-label="Navegacion principal"
          className="hidden justify-self-center lg:block"
        >
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                      isActive ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-white transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          <a
            href="#contacto"
            onClick={closeMenu}
            className="hidden rounded-sm border border-white px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-brand lg:inline-block"
          >
            Agenda tu consulta
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/20 text-white transition-colors duration-200 hover:bg-white/10 lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Panel / drawer de navegacion en mobile */}
      <div
        id="menu-mobile"
        hidden={!isMenuOpen}
        className="border-t border-white/10 bg-brand lg:hidden"
      >
        <nav aria-label="Navegacion mobile" className="px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeId === link.id;
              return (
                <li key={link.id} className="border-b border-white/10 last:border-0">
                  <a
                    href={`#${link.id}`}
                    onClick={closeMenu}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center gap-3 py-4 text-base font-medium transition-colors duration-200 ${
                      isActive ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contacto"
            onClick={closeMenu}
            className="mt-5 block rounded-sm border border-white px-6 py-3.5 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-brand"
          >
            Agenda tu consulta
          </a>
        </nav>
      </div>
    </header>
  );
}
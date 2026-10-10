import { brand, contact, mapsHref } from "@/lib/content";

/** Footer simple: datos de contacto, copyright y credits. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-line border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">{brand.fullName}</p>
            <p className="mt-1 text-sm text-ink-500">{brand.role}</p>
          </div>

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-500 transition-colors duration-200 hover:text-brand md:text-center"
          >
            {contact.address}
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-ink-500 transition-colors duration-200 hover:text-brand md:text-right"
          >
            {contact.email}
          </a>
        </div>

        <div className="border-line mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-300">
            &copy; {year} {brand.fullName}. Todos los derechos reservados.
          </p>

          <p className="text-xs text-ink-500">Desarrollado por Augusto Piaser</p>
        </div>
      </div>
    </footer>
  );
}

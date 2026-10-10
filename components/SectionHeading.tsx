import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Texto pequeno sobre el titulo. */
  eyebrow: string;
  title: string;
  description?: string;
  /** Contenido opcional a la derecha del titulo (desktop). */
  aside?: ReactNode;
};

/** Encabezado reutilizable para las secciones de la landing (fondo blanco). */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-medium tracking-[0.25em] text-brand uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 text-base leading-relaxed text-ink-500">
            {description}
          </p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
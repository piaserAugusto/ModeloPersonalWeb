import Image from "next/image";
import { about, stats } from "@/lib/content";

/** Seccion #sobre-mi: foto, biografia y tres datos destacados. */
export default function SobreMi() {
  return (
    <section
      id="sobre-mi"
      aria-label={about.eyebrow}
      className="scroll-mt-24 border-line border-t bg-ink/[0.02] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-sm lg:aspect-auto lg:h-full">
            <Image
              src={about.photo}
              alt={about.photoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <Image
              src={about.photoHover}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>

          <div>
            {/* Mismo formato que el titulo de la seccion #servicios */}
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {about.eyebrow}
            </h2>
            <p className="mt-4 text-xl font-semibold leading-snug text-ink-700 sm:text-2xl">
              {about.title}
            </p>

            <div className="mt-6 space-y-4">
              {about.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-ink-500"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <a
              href="#contacto"
              className="mt-9 inline-flex items-center gap-2 rounded-sm bg-brand px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-600"
            >
              Agenda tu consulta
            </a>
          </div>
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse bg-white px-8 py-9 text-center"
            >
              <dt className="text-sm text-ink-500">{stat.label}</dt>
              <dd className="text-3xl font-bold tracking-tight text-brand lg:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

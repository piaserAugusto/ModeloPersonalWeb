import Image from "next/image";
import { ArrowRight } from "lucide-react";
import TypedName from "@/components/TypedName";
import { brand } from "@/lib/content";

/**
 * Seccion #inicio. Video de fondo a pantalla completa con overlay oscuro para
 * garantizar contraste del texto, dos columnas en desktop: texto a la izquierda
 * (centrado vertical) y foto recortada alineada al borde inferior.
 */
export default function Hero() {
  return (
    <section id="inicio" className="on-dark relative isolate overflow-hidden bg-brand">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={brand.poster || undefined}
        aria-hidden="true"
        tabIndex={-1}
      >
        {brand.videoWebm ? (
          <source src={brand.videoWebm} type="video/webm" />
        ) : null}
        <source src={brand.video} type="video/mp4" />
      </video>

      {/* Overlay: oscuro a la izquierda para el texto, mas claro a la
          derecha para que se vea el video. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-brand via-brand/70 to-brand/30"
      />
      {/* Vineta inferior para asentar el texto contra el borde */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand/85 via-transparent to-transparent"
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="flex flex-col justify-center pt-14 pb-10 lg:pt-16 lg:pb-20">
          <h1 className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            <TypedName firstName={brand.firstName} lastName={brand.lastName} />
          </h1>

          <div className="mt-6 space-y-1 border-l border-white/20 pl-4">
            <p className="text-sm font-normal text-white/70">{brand.role}</p>
            <p className="text-sm font-normal text-white/70">{brand.matricula}</p>
          </div>

          <p className="mt-8 max-w-xl text-lg font-semibold text-white sm:text-xl">
            {brand.tagline}
          </p>

          <p className="mt-4 max-w-xl text-base font-normal leading-relaxed text-white/70">
            {brand.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-sm border border-white bg-white px-7 py-3.5 text-sm font-medium text-brand transition-colors duration-200 hover:bg-transparent hover:text-white"
            >
              Agenda tu consulta
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#sobre-mi"
              className="inline-flex items-center gap-2 rounded-sm border border-white bg-transparent px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-brand"
            >
              Leer mas
            </a>
          </div>
        </div>

        <div className="relative flex items-end justify-center lg:justify-end">
          {/* Halo suave para separar la figura del video de fondo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 bottom-0 top-8 bg-[radial-gradient(ellipse_at_center_bottom,rgba(0,0,0,0.85),transparent_72%)]"
          />
          <Image
            src={brand.photo}
            alt={`Fotografia de ${brand.fullName}, abogado`}
            width={768}
            height={768}
            priority
            className="relative h-auto w-full max-w-[340px] select-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:max-w-[430px] lg:max-w-[600px]"
          />
        </div>
      </div>
    </section>
  );
}
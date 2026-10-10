import { services, servicesSection } from "@/lib/content";
import SectionHeading from "@/components/SectionHeading";

/** Seccion #servicios: grilla de areas de practica. */
export default function Servicios() {
  return (
    <section
      id="servicios"
      aria-label={servicesSection.title}
      className="scroll-mt-24 border-line border-t bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={servicesSection.eyebrow}
          title={servicesSection.title}
          description={servicesSection.description}
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.id}>
                <article className="group h-full rounded-sm border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-ink/5">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm bg-brand/5 transition-colors duration-300 group-hover:bg-brand">
                    <Icon
                      className="h-5 w-5 text-brand transition-colors duration-300 group-hover:text-white"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>

                  <h3 className="mt-6 text-lg font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">
                    {service.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
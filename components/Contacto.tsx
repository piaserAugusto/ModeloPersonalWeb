import {
  contact,
  contactSection,
  contactDetails,
  whatsappHref,
  socials,
} from "@/lib/content";
import InstagramIcon from "@/components/InstagramIcon";

/**
 * Seccion #contacto: solo contacto directo por WhatsApp, sin formulario.
 */
export default function Contacto() {
  return (
    <section
      id="contacto"
      aria-label={contactSection.title}
      className="scroll-mt-24 border-line border-t bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.25em] text-brand uppercase">
            {contactSection.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {contactSection.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-500">
            {contactSection.description}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <ul className="grid gap-px self-start overflow-hidden rounded-sm border border-line bg-line">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <li
                  key={detail.id}
                  className="flex items-start gap-4 bg-white px-6 py-5"
                >
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-brand/5">
                    <Icon
                      className="h-4 w-4 text-brand"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                  <span>
                    <span className="block text-xs font-medium tracking-wider text-ink-300 uppercase">
                      {detail.label}
                    </span>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        target={detail.external ? "_blank" : undefined}
                        rel={
                          detail.external ? "noopener noreferrer" : undefined
                        }
                        className="mt-1 block text-sm text-ink underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-brand hover:decoration-brand"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span className="mt-1 block text-sm text-ink">
                        {detail.value}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col justify-center gap-6 rounded-sm border border-line bg-ink/[0.02] p-8">
            <div className="rounded-sm border border-brand/20 bg-white px-6 py-5 text-center">
              <p className="text-xs font-medium tracking-[0.2em] text-ink-300 uppercase">
                Valor de la consulta
              </p>
              <p className="mt-2 text-3xl font-bold text-brand">
                {contact.consultationPrice}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-ink">
                Escribime directo
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-500">
                Atiendo de {contact.hours.toLowerCase()}. Te respondo dentro de
                las 24 horas hábiles.
              </p>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-whatsapp px-7 py-4 text-sm font-semibold text-ink transition-transform duration-200 hover:scale-[1.02]"
            >
              Escribime por WhatsApp
            </a>

            {socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-brand hover:text-brand"
              >
                <InstagramIcon className="h-4 w-4" />
                {social.label}: {social.handle}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

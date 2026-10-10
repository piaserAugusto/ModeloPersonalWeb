import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building,
  Clock,
  Flower2,
  Gavel,
  HardHat,
  HeartHandshake,
  House,
  Mail,
  MapPin,
  Phone,
  Scale,
  User,
} from "lucide-react";

/**
 * ---------------------------------------------------------------------------
 * CONTENIDO CENTRALIZADO
 * ---------------------------------------------------------------------------
 * Todos los textos de la landing se editan desde este archivo.
 * Buscá y reemplazá los textos entre corchetes: [ACA].
 */

export const brand = {
  /** Nombre y apellido por separado: se usan en el H1 del Hero (2 lineas). */
  firstName: "Guillermo",
  lastName: "Roca",
  /** Nombre completo, para metadata SEO y textos secundarios. */
  fullName: "Guillermo Roca",
  /** Rol que se muestra debajo del nombre, ej: "Abogado - Derecho Civil y Familia". */
  role: "Abogado - Derecho Comercial",
  /** Matricula, ej: "Mat. N° 12345 - Colegio de Abogados de Bahia Blanca". */
  matricula: "Mat. N° 12345 - Colegio de Abogados de Bahía Blanca",
  /** Frase corta en negrita. */
  tagline: "¡Defendemos tus derechos con compromiso y claridad!",
  /** Parrafo descriptivo de una o dos lineas. */
  description:
    "Ofrezco asesoramiento legal claro y cercano en cada etapa de tu caso, con atencion personalizada y una defensa orientada a obtener el mejor resultado para vos.",
  /** Archivos de imagen dentro de /public. */
  logo: "/logo.png",
  /**
   * Ilustracion del abogado, PNG con fondo transparente (900x1250).
   * Regenerar con: python scripts/make-person.py
   * Reemplazar por la foto real recortada (misma proporcion, con fondo transparente).
   */
  photo: "/abogado.png",
  /**
   * Video de fondo del Hero. Poner el archivo en /public/hero-video.mp4
   * (o cambiar esta ruta por una URL .mp4).
   * Fuente actual: Pexels, video 7841709 "Close Up of Books Collection"
   * (lomos de libros, sin personas). Licencia Pexels: uso libre, sin atribucion.
   *
   * Alternativas ya descargadas y verificadas (respaldo en media-backup/):
   * - Mesa de oficina en plano cenital, sin personas (5,3 MB):
   *   https://videos.pexels.com/video-files/6177796/6177796-hd_1920_1080_25fps.mp4
   * - Hombro sobre el escritorio, plano cenital (3,3 MB):
   *   https://videos.pexels.com/video-files/6177797/6177797-hd_1920_1080_25fps.mp4
   */
  video: "/hero-video.mp4",
  /** Opcional. Si queda vacio no se renderiza el <source> (evita un 404). */
  videoWebm: "",
  /** Opcional. Si queda vacio no se renderiza el poster. */
  poster: "",
} as const;

export const site = {
  title: "Guillermo Roca - Abogado en Bahía Blanca",
  description:
    "Estudio juridico en Bahía Blanca. Asesoramiento legal en Derecho Civil, Familia, Laboral, Penal, Sucesiones y Comercial. Agenda tu consulta.",
  /** URL publica del sitio, usada por los metadatos de Open Graph. */
  url: "https://www.estudioroca.com.ar",
  locale: "es_AR",
} as const;

/** Numero de WhatsApp con codigo de pais, sin signos. Ej: "5491123456789" */
export const whatsappNumber = "5492914270789";

/** Mensaje precargado del boton de WhatsApp. */
export const whatsappMessage =
  "Hola Guillermo, te escribo desde tu pagina web. Queria consultar por un tema legal.";

export const contact = {
  address: "Undiano 118, Bahía Blanca, Buenos Aires",
  phone: "+54 9 2914 27-7089",
  email: "contacto@estudioroca.com.ar",
  hours: "Lunes a viernes de 9 a 19 hs",
  /** Valor de la consulta, se muestra destacado en la seccion de contacto. */
  consultationPrice: "$49.550",
} as const;

/** Link de Google Maps con la direccion del estudio (no requiere API key). */
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contact.address,
)}`;

/** Link de telefono para hacer llamadas desde el celu. */
export const phoneHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

export type Social = {
  id: string;
  label: string;
  handle: string;
  href: string;
};

/** Redes sociales del estudio. Para sumar mas, alcanza con agregar un objeto. */
export const socials: Social[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@tomijou",
    href: "https://www.instagram.com/tomijou",
  },
];

export type NavLink = {
  id: string;
  label: string;
  icon: LucideIcon;
};

/** Links del header. El `id` debe coincidir con el `id` de cada <section>. */
export const navLinks: NavLink[] = [
  { id: "inicio", label: "Inicio", icon: House },
  { id: "servicios", label: "Servicios", icon: Briefcase },
  { id: "sobre-mi", label: "Sobre mi", icon: User },
  { id: "contacto", label: "Contacto", icon: Phone },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "civil",
    title: "Derecho Civil",
    description:
      "Reclamos, contratos, danos y conflictos patrimoniales, con defensa firme y estrategia clara.",
    icon: Scale,
  },
  {
    id: "familia",
    title: "Derecho de Familia",
    description:
      "Divorcios, guardas, alimentacion y regimenes de comunicacion, con sensibilidad y reserva.",
    icon: HeartHandshake,
  },
  {
    id: "laboral",
    title: "Derecho Laboral",
    description:
      "Despidos, conflictos laborales y reclamos. Asesoramiento honesto en cada etapa del proceso.",
    icon: HardHat,
  },
  {
    id: "penal",
    title: "Derecho Penal",
    description:
      "Defensa penal y audiencias. Respetamos la presuncion de inocencia y tu derecho a defensa plena.",
    icon: Gavel,
  },
  {
    id: "sucesiones",
    title: "Sucesiones",
    description:
      "Sucesiones, testamentos y particiones. Te acompaño en todo el proceso con plazos bajo control.",
    icon: Flower2,
  },
  {
    id: "comercial",
    title: "Derecho Comercial",
    description:
      "Sociedades, contratos mercantiles y operativas de negocio, con acompanamiento permanente.",
    icon: Building,
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "20+", label: "Años de ejercicio profesional" },
  { value: "2.500+", label: "Casos atendidos" },
  { value: "+1500", label: "Recomendaciones" },
];

export const about = {
  eyebrow: "Sobre mi",
  title: "Un abogado que acompaña, no solo defiende",
  paragraphs: [
    "Soy Guillermo Roca, abogado con mas de 20 años de ejercicio profesional. Me gradue de la Facultad de Derecho de la Universidad Nacional del Sur y desde entonces me dedico al ejercicio libre de la profesion.",
    "Mi trabajo se apoya en tres pilares: cercanía, transparencia y resultado. Explico cada etapa de tu caso en lenguaje claro, sin vueltas, para que sepas siempre donde estas y cual es el camino.",
    "Atiendo las areas de Derecho Civil, Familia, Laboral, Penal, Sucesiones y Comercial, con un equipo reducido y especializado que acompaña a cada cliente de forma personalizada.",
  ],
  /** Foto de la seccion "Sobre mi" (cuadrada). */
  photo: "/escritorio.png",
  /** Foto que aparece al pasar el mouse: mismo encuadre y tamano que `photo`. */
  photoHover: "/auto.jpg",
  photoAlt: "Escritorio del estudio juridico",
} as const;

export const servicesSection = {
  eyebrow: "Areas de practica",
  title: "Servicios",
  description:
    "Asesoramiento y defensa en las principales areas del derecho civil y comercial.",
} as const;

export const contactSection = {
  eyebrow: "Contacto",
  title: "Agenda tu consulta",
  description:
    "Escribime por WhatsApp contame tu caso y coordinamos una cita. Atiendo de lunes a viernes y te respondo dentro de las 24 horas habiles.",
} as const;

export const contactDetails = [
  {
    id: "direccion",
    label: "Direccion",
    value: contact.address,
    icon: MapPin,
    href: mapsHref,
    external: true,
  },
  {
    id: "telefono",
    label: "Telefono",
    value: contact.phone,
    icon: Phone,
    href: phoneHref,
    external: false,
  },
  {
    id: "email",
    label: "Email",
    value: contact.email,
    icon: Mail,
    href: `mailto:${contact.email}`,
    external: false,
  },
  {
    id: "horarios",
    label: "Horarios",
    value: contact.hours,
    icon: Clock,
    href: undefined,
    external: false,
  },
] as const;

/** Link completo de WhatsApp, generado a partir del numero y el mensaje. */
export const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;
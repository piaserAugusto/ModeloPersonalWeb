import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import SobreMi from "@/components/SobreMi";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-sm focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Saltar al contenido
      </a>

      <Header />

      <main id="contenido" className="flex-1">
        <Hero />
        <Servicios />
        <SobreMi />
        <Contacto />
      </main>

      <Footer />

      <WhatsAppButton />
    </>
  );
}
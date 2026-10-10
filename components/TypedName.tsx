"use client";

import { useEffect, useState } from "react";

type TypedNameProps = {
  firstName: string;
  lastName: string;
};

/**
 * Nombre del Hero escrito letra a letra al cargar la pagina.
 * Mantiene el salto de linea entre nombre y apellido, respeta
 * prefers-reduced-motion (muestra el nombre completo) y el texto real
 * siempre esta disponible para lectores de pantalla.
 */
export default function TypedName({ firstName, lastName }: TypedNameProps) {
  const fullName = `${firstName} ${lastName}`;
  const spaceIndex = fullName.indexOf(" ");
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timeoutId = 0;

    const showFullName = () => {
      setText(fullName);
      setDone(true);
    };

    const type = () => {
      if (index >= fullName.length) {
        setDone(true);
        return;
      }

      setText(fullName.slice(0, index + 1));
      index += 1;

      const char = fullName[index - 1];
      const delay = char === " " ? 240 : 70 + Math.random() * 90;
      timeoutId = window.setTimeout(type, delay);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    timeoutId = prefersReducedMotion
      ? window.setTimeout(showFullName, 0)
      : window.setTimeout(type, 450);

    return () => window.clearTimeout(timeoutId);
  }, [fullName]);

  const isTypingFirstName = text.length <= spaceIndex;
  const head = isTypingFirstName ? text : fullName.slice(0, spaceIndex);
  const tail = isTypingFirstName ? "" : text.slice(spaceIndex + 1);

  const cursor = (
    <span
      aria-hidden="true"
      className={`ml-1 inline-block h-[0.78em] w-[3px] translate-y-[0.06em] bg-white align-baseline ${
        done ? "opacity-0" : "animate-[blink_1s_step-end_infinite]"
      }`}
    />
  );

  return (
    <>
      <span className="sr-only">{fullName}</span>
      <span aria-hidden="true" className="block whitespace-nowrap">
        {head || "\u00a0"}
        {isTypingFirstName ? cursor : null}
      </span>
      <span aria-hidden="true" className="block whitespace-nowrap">
        {tail || "\u00a0"}
        {isTypingFirstName ? null : cursor}
      </span>
    </>
  );
}

"use client";

import { useState } from "react";
import { MapTrifold } from "@phosphor-icons/react";
import { fotos } from "@/lib/fotos";
import { site } from "@/lib/site";
import { Foto } from "./Foto";

/**
 * O mapa só carrega quando a pessoa pede. Antes disso, a fachada da clínica
 * ocupa o lugar: é o prédio que ela vai procurar na rua.
 */
export function MapaEmbutido() {
  const [carregado, setCarregado] = useState(false);

  return (
    <figure>
      <div className="fotograma relative aspect-[4/3]">
        {carregado ? (
          <iframe
            title={`Mapa: ${site.nome}`}
            src={site.mapa.embed}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <>
            <Foto foto={fotos["fachada"]} sizes="(min-width: 1024px) 700px, 100vw" preencher posicao="center 60%" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center bg-[linear-gradient(to_top,rgb(13_59_85/0.55),transparent)] p-5 sm:justify-end">
              <button
                type="button"
                onClick={() => setCarregado(true)}
                className="inline-flex h-12 items-center gap-2.5 rounded-[var(--radius-controle)] bg-branco px-5 text-[0.9375rem] font-semibold text-petroleo shadow-controle transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-azul-claro-2 active:translate-y-px motion-reduce:transition-none"
              >
                <MapTrifold size={20} weight="regular" aria-hidden="true" />
                Ver no mapa
              </button>
            </div>
          </>
        )}
      </div>
      <figcaption className="codigo mt-4 flex items-baseline gap-3 text-suave">
        <span className="text-petroleo">07</span>
        {carregado ? "Mapa do Google" : `Fachada, ${site.endereco.rua}`}
      </figcaption>
    </figure>
  );
}

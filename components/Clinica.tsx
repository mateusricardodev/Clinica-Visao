import { fotos } from "@/lib/fotos";
import { Foto } from "./Foto";
import { Revelar } from "./Revelar";

const pontos = [
  { titulo: "Atendimento atencioso", texto: "Tempo para ouvir, examinar e explicar, da recepção à consulta." },
  { titulo: "Equipe qualificada", texto: "Médico e equipe preparados para cada etapa do atendimento." },
  { titulo: "Ambiente confortável", texto: "Sala de espera tranquila, bem iluminada e acolhedora." },
  { titulo: "Estrutura moderna", texto: "Salas de exame equipadas dentro da própria clínica." },
];

export function Clinica() {
  return (
    <section id="clinica" className="scroll-mt-[72px] py-20 sm:py-28" aria-labelledby="titulo-clinica">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Revelar>
            <h2 id="titulo-clinica" className="display-2">
              Uma clínica feita para cuidar de você
            </h2>
            <p className="medida mt-5 text-suave">
              Uma equipe atenciosa, um ambiente pensado para esperar sem pressa e salas de exame com
              equipamentos modernos, tudo no mesmo endereço, na Vila Adyana.
            </p>
          </Revelar>
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {pontos.map((p, i) => (
              <Revelar as="li" key={p.titulo} ordem={i} className="border-t border-linha pt-4">
                <h3 className="text-[1.0625rem] font-semibold text-petroleo">{p.titulo}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-suave">{p.texto}</p>
              </Revelar>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <Revelar as="figure" direcao="direita">
            <div className="relative mb-8">
            <div className="fotograma ml-auto w-[88%] sm:w-[84%]">
              <Foto
                foto={fotos["recepcao-2"]}
                sizes="(min-width: 1024px) 620px, 84vw"
                aspecto="4 / 3"
                posicao="center 45%"
              />
            </div>
            {/* Segunda foto sobreposta, como uma cópia impressa colocada por cima. */}
            <div className="fotograma absolute -bottom-8 left-0 w-[42%] border-[6px] border-branco shadow-quadro-alto sm:w-[38%]">
              <Foto foto={fotos["poltronas"]} sizes="(min-width: 1024px) 280px, 40vw" aspecto="3 / 4" />
            </div>
            </div>
            <figcaption className="codigo mt-8 flex items-baseline gap-3 text-suave">
              <span className="text-petroleo">04</span>
              Recepção e sala de espera
            </figcaption>
          </Revelar>
        </div>
      </div>
    </section>
  );
}

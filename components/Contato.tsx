import { Clock, MapPin, NavigationArrow, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { linkWhatsApp, site } from "@/lib/site";
import { Botao } from "./Botao";
import { HorarioStatus } from "./HorarioStatus";
import { MapaEmbutido } from "./MapaEmbutido";
import { Revelar } from "./Revelar";

export function Contato() {
  const { endereco, telefone } = site;
  return (
    <section id="contato" className="scroll-mt-[72px] py-20 sm:py-28" aria-labelledby="titulo-contato">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Revelar className="lg:col-span-5">
          <h2 id="titulo-contato" className="display-2">
            Onde estamos
          </h2>

          <dl className="mt-8 divide-y divide-linha">
            <div className="flex gap-4 py-5">
              <dt className="sr-only">Endereço</dt>
              <MapPin size={24} weight="regular" aria-hidden="true" className="mt-0.5 shrink-0 text-petroleo" />
              <dd className="text-tinta">
                <span className="block font-semibold text-petroleo">
                  {endereco.rua}, {endereco.bairro}
                </span>
                <span className="block text-suave">
                  {endereco.cidade} - {endereco.uf}, {endereco.cep}
                </span>
              </dd>
            </div>
            <div className="flex gap-4 py-5">
              <dt className="sr-only">Telefone</dt>
              <Phone size={24} weight="regular" aria-hidden="true" className="mt-0.5 shrink-0 text-petroleo" />
              <dd>
                <a
                  href={`tel:${telefone.tel}`}
                  className="tabular rounded-md font-semibold text-petroleo underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:decoration-agua"
                >
                  {telefone.exibicao}
                </a>
                <span className="block text-suave">Ligue para agendar ou tirar dúvidas</span>
              </dd>
            </div>
            <div className="flex gap-4 py-5">
              <dt className="sr-only">Horário</dt>
              <Clock size={24} weight="regular" aria-hidden="true" className="mt-0.5 shrink-0 text-petroleo" />
              <dd className="text-tinta">
                <HorarioStatus />
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Botao
              href={site.mapa.comoChegar}
              variante="secundario"
              icone={<NavigationArrow size={20} weight="regular" aria-hidden="true" />}
              target="_blank"
              rel="noopener"
            >
              Como chegar
            </Botao>
            <Botao
              href={linkWhatsApp()}
              icone={<WhatsappLogo size={22} weight="regular" aria-hidden="true" />}
              target="_blank"
              rel="noopener"
            >
              Agendar pelo WhatsApp
            </Botao>
          </div>
        </Revelar>

        <Revelar direcao="direita" className="lg:col-span-7">
          <MapaEmbutido />
        </Revelar>
      </div>
    </section>
  );
}

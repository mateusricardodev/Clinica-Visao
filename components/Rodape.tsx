import { Fragment } from "react";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { enderecoLinha, site } from "@/lib/site";
import { Logo } from "./Logo";

// Crédito no rodapé: cada nome abre o LinkedIn da pessoa.
const desenvolvedores = [
  { nome: "Mateus Ricardo", url: "https://www.linkedin.com/in/mateus-ricardo" },
  { nome: "Miguel Quintanilha", url: "https://www.linkedin.com/in/miguel-quintanilha" },
];

export function Rodape() {
  return (
    <footer className="bg-petroleo pb-20 text-azul-claro lg:pb-0">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo claro />
            <p className="mt-5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-azul-claro/85">
              {site.descricao}
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-[0.9375rem] font-semibold text-branco">Endereço e contato</h2>
            <address className="mt-4 space-y-2 text-[0.9375rem] not-italic leading-relaxed">
              <p>{enderecoLinha}</p>
              <p>
                <a
                  href={`tel:${site.telefone.tel}`}
                  className="tabular rounded-md text-branco underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:decoration-agua-luz"
                >
                  {site.telefone.exibicao}
                </a>
              </p>
              <p className="pt-2">
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Instagram do ${site.medico} (${site.instagram.usuario})`}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-branco/25 text-branco transition-colors hover:border-branco hover:bg-branco hover:text-petroleo"
                >
                  <InstagramLogo size={22} weight="regular" aria-hidden="true" />
                </a>
              </p>
            </address>
          </div>

          <nav className="md:col-span-3" aria-label="Links rápidos">
            <h2 className="text-[0.9375rem] font-semibold text-branco">Links rápidos</h2>
            <ul className="mt-4 space-y-2 text-[0.9375rem]">
              {site.menu.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-md underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:text-branco hover:decoration-agua-luz"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/#agendar"
                  className="rounded-md underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:text-branco hover:decoration-agua-luz"
                >
                  Agendar consulta
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-branco/15 pt-6 text-[0.875rem] text-azul-claro/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.nome}. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por:{" "}
            {desenvolvedores.map((d, i) => (
              <Fragment key={d.url}>
                {i > 0 && " e "}
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener"
                  className="rounded-md font-semibold text-branco underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:text-agua-luz hover:decoration-agua-luz"
                >
                  {d.nome}
                </a>
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

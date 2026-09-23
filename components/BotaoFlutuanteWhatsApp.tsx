import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { linkWhatsApp } from "@/lib/site";

/**
 * Botão fixo de WhatsApp: fica sempre à vista no celular, sem precisar
 * rolar até uma seção. No desktop some, porque o cabeçalho já cobre o CTA.
 */
export function BotaoFlutuanteWhatsApp() {
  return (
    <a
      href={linkWhatsApp()}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed right-4 z-30 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-branco shadow-quadro-alto transition-[transform,box-shadow] duration-300 [transition-timing-function:var(--ease-saida)] hover:-translate-y-0.5 hover:bg-[#1fbd5a] active:translate-y-px active:scale-[0.97] motion-reduce:transition-none lg:hidden"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <WhatsappLogo size={28} weight="fill" aria-hidden="true" />
    </a>
  );
}

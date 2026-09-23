"use client";

import { useEffect, useState } from "react";
import { resumoSemana, statusEm, type Status } from "@/lib/horario";

const semana = resumoSemana();

/**
 * "Aberto · fecha às 18:00" calculado na hora, no fuso da clínica, e refeito a
 * cada 30 s. O status só aparece depois de montar (o HTML estático não sabe a
 * hora de quem abre a página); o horário da semana vem sempre.
 */
export function HorarioStatus() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const atualizar = () => setStatus(statusEm(new Date()));
    atualizar();
    const id = window.setInterval(atualizar, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <span className="block min-h-[1.6em]" aria-live="polite">
        {status && (
          <>
            <span className={`font-semibold ${status.aberto ? "text-agua-tinta" : "text-[#b3261e]"}`}>
              {status.rotulo}
            </span>
            {status.detalhe && <span className="text-suave"> · {status.detalhe}</span>}
          </>
        )}
      </span>
      <span className="mt-1 block text-[0.9375rem] text-suave">
        {semana.map((g) => (
          <span key={g.dias} className="block">
            <span className="tabular">{g.dias}:</span> {g.horas}
          </span>
        ))}
      </span>
    </>
  );
}

// Status de funcionamento calculado a partir de site.horario, no fuso da clínica.
// Funções puras: recebem a data e devolvem o texto, para dar para testar.

import { site } from "./site";

type Turno = readonly [string, string];
type Semana = readonly (readonly Turno[])[];

const nomesDias = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const abrevDias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export type Status = {
  aberto: boolean;
  /** "Aberto" ou "Fechado". */
  rotulo: string;
  /** Complemento: "fecha às 18:00", "abre amanhã às 08:00"... */
  detalhe: string;
};

const minutos = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Dia da semana (0 = domingo) e minutos desde a meia-noite, no fuso pedido. */
function agoraNoFuso(data: Date, fuso: string) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: fuso,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(data);
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? "";
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(valor("weekday"));
  return { dia, min: Number(valor("hour")) * 60 + Number(valor("minute")) };
}

export function statusEm(data: Date, semana: Semana = site.horario.semana, fuso: string = site.horario.fuso): Status {
  const { dia, min } = agoraNoFuso(data, fuso);
  const hoje = semana[dia];

  const atual = hoje.find(([abre, fecha]) => min >= minutos(abre) && min < minutos(fecha));
  if (atual) return { aberto: true, rotulo: "Aberto", detalhe: `fecha às ${atual[1]}` };

  const maisTarde = hoje.find(([abre]) => minutos(abre) > min);
  if (maisTarde) {
    const almoco = hoje.some(([, fecha]) => minutos(fecha) <= min);
    return {
      aberto: false,
      rotulo: almoco ? "Fechado para o almoço" : "Fechado",
      detalhe: `abre às ${maisTarde[0]}`,
    };
  }

  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7;
    const primeiro = semana[d][0];
    if (!primeiro) continue;
    const quando = i === 1 ? "amanhã" : nomesDias[d];
    return { aberto: false, rotulo: "Fechado", detalhe: `abre ${quando} às ${primeiro[0]}` };
  }
  return { aberto: false, rotulo: "Fechado", detalhe: "" };
}

/** "08:00" → "8h", "12:30" → "12h30". */
const curta = (hhmm: string) => {
  const [h, m] = hhmm.split(":");
  return `${Number(h)}h${m === "00" ? "" : m}`;
};

/**
 * Horário da semana agrupando dias seguidos iguais, começando na segunda:
 * [{ dias: "Seg a qui", horas: "8h–12h30 e 13h30–18h" }, ...]
 */
export function resumoSemana(semana: Semana = site.horario.semana) {
  const ordem = [1, 2, 3, 4, 5, 6, 0];
  const chave = (d: number) => JSON.stringify(semana[d]);
  const grupos: number[][] = [];
  for (const d of ordem) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && chave(ultimo[0]) === chave(d)) ultimo.push(d);
    else grupos.push([d]);
  }
  return grupos.map((g) => {
    const primeiro = abrevDias[g[0]];
    const ultimo = abrevDias[g[g.length - 1]].toLowerCase();
    const dias = g.length === 1 ? primeiro : `${primeiro} ${g.length === 2 ? "e" : "a"} ${ultimo}`;
    const turnos = semana[g[0]];
    const horas = turnos.length ? turnos.map(([a, f]) => `${curta(a)}–${curta(f)}`).join(" e ") : "fechado";
    return { dias, horas };
  });
}

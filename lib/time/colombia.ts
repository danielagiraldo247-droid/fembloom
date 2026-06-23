/**
 * Helpers para trabajar con la zona horaria de Colombia (UTC-5).
 *
 * Esto es necesario porque el servidor de Vercel corre en UTC,
 * pero las usuarias estan en Colombia. Sin estos helpers, los
 * mensajes como "Buenos dias/tardes/noches" salen desfasados 5 horas.
 */

const COLOMBIA_TIMEZONE = "America/Bogota";

/**
 * Devuelve la hora actual en Colombia (0-23).
 */
export function getColombiaHour(): number {
  return parseInt(
    new Intl.DateTimeFormat("en-US", {
      timeZone: COLOMBIA_TIMEZONE,
      hour: "numeric",
      hour12: false,
    }).format(new Date()),
    10
  );
}

/**
 * Devuelve un objeto Date que representa la hora actual en Colombia.
 * Usar este en vez de `new Date()` cuando se necesite tiempo real
 * desde el lado del servidor.
 */
export function getColombiaDate(): Date {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: COLOMBIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(new Date());
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value || "00";

  const iso = `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get(
    "minute"
  )}:${get("second")}`;
  return new Date(iso);
}

/**
 * Devuelve la fecha de hoy en Colombia en formato YYYY-MM-DD.
 */
export function getColombiaToday(): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: COLOMBIA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(new Date());
}

/**
 * Devuelve un saludo apropiado segun la hora del dia en Colombia.
 */
export function getColombiaGreeting(): "Buenos días" | "Buenas tardes" | "Buenas noches" {
  const hour = getColombiaHour();
  if (hour < 12) return "Buenos días";
  if (hour < 19) return "Buenas tardes";
  return "Buenas noches";
}

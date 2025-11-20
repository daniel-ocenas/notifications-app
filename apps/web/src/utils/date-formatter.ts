// app is only available in English, can be loaded dynamically
const LOCALE = "en-US";

export function formatPublicationDate(date: string) {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleString(LOCALE, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatUpdateDate(date: string) {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleString(LOCALE, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateForDatetimeLocal(date: string) {
  const parsedDate = new Date(date);
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = parsedDate.getFullYear();
  const month = pad(parsedDate.getMonth() + 1);
  const day = pad(parsedDate.getDate());
  const hours = pad(parsedDate.getHours());
  const minutes = pad(parsedDate.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

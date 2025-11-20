// app is only available in English, can be loaded dynamically
const LOCALE = "en-US";

export function formatPublicationDate(date: Date) {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleString(LOCALE, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatUpdateDate(date: Date) {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleString(LOCALE, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateForDatetimeLocal(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatDate(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleDateString();
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
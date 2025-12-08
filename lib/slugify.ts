export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // espaços por hífen
    .replace(/[^\w\-]+/g, '') // remove caracteres inválidos
    .replace(/\-\-+/g, '-') // remove múltiplos hífens
}

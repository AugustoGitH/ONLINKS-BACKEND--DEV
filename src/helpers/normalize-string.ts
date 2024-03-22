export default function normalizeString(str: string) {
  return str
    .normalize("NFD") // Normaliza os caracteres para decomposição
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s\-]|_/g, "") // Remove caracteres especiais exceto hífen, underline, espaço e letras/números
    .replace(/\s+/g, " ") // Remove espaços extras
    .trim(); // Remove espaços no início e fim da string
}

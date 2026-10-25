// "02-abordagem" → "abordagem": o número só ordena, a âncora é o resto do nome do arquivo.
export const ancoraDe = (id: string) => id.replace(/^\d+-/, '');

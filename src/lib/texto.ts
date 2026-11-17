// Ajudas para os campos de texto do conteúdo que não passam pelo markdown: cards, partes e trechos das páginas, a
// trajetória e a formação.

// "02-abordagem" → "abordagem": o número só ordena, a âncora é o resto do nome do arquivo.
export const ancoraDe = (id: string) => id.replace(/^\d+-/, '');

export const paragrafos = (texto = '') =>
	texto
		.split(/\n\s*\n/)
		.map((parte) => parte.replace(/\s+/g, ' ').trim())
		.filter(Boolean);

const lista = (texto = '') =>
	texto
		.split('\n')
		.filter((linha) => linha.startsWith('- '))
		.map((linha) => linha.slice(2).trim());

// **negrito** e [links](endereço) num texto corrido, sem passar pelo markdown. O resto é escapado.
export const comNegrito = (texto: string) =>
	texto
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
		.replace(/\[(.+?)\]\((.+?)\)/g, (_, rotulo, href) => `<a href="${href.replace(/"/g, '&quot;')}">${rotulo}</a>`);

// O texto completo da trajetória em blocos: cada "#### Rótulo" abre um bloco, com parágrafos e listas. O que vem
// antes do primeiro rótulo é um bloco sem rótulo.
export function blocosDeTexto(texto = '') {
	const [antes = '', ...rotulados] = texto.split(/^#### /m);
	const partes = [
		{ rotulo: '', corpo: antes },
		...rotulados.map((parte) => {
			const [rotulo = '', ...resto] = parte.split('\n');
			return { rotulo: rotulo.trim(), corpo: resto.join('\n') };
		}),
	];
	return partes
		.filter(({ rotulo, corpo }) => rotulo || corpo.trim())
		.map(({ rotulo, corpo }) => ({
			rotulo,
			itens: corpo
				.split(/\n\s*\n/)
				.map((trecho) => trecho.trim())
				.filter(Boolean)
				.map((trecho) =>
					trecho.split('\n').every((linha) => linha.startsWith('- '))
						? { lista: lista(trecho) }
						: { paragrafo: trecho.replace(/\s+/g, ' ') },
				),
		}));
}

// "Formação em X (A, B), Instituição" → ['Formação em X (A, B)', 'Instituição']. Só a vírgula fora de parênteses separa.
export function separarFormacao(item: string): [string, string] {
	let nivel = 0;
	for (const [indice, letra] of [...item].entries()) {
		if (letra === '(') nivel++;
		if (letra === ')') nivel--;
		if (letra === ',' && nivel === 0) return [item.slice(0, indice), item.slice(indice + 1).trim()];
	}
	return [item, ''];
}

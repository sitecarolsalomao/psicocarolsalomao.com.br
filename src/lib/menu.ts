import { getCollection } from 'astro:content';
import { ancoraDe } from './texto';

export type ItemDoMenu = { rotulo: string; href: string };

// O menu sai das seções da página principal que têm "menu". Na principal, cada item rola até a sua seção. Nas páginas
// de "Ler mais", os itens que têm página própria levam a ela, e os outros voltam à seção na principal.
export async function menuDoSite(naPrincipal: boolean): Promise<ItemDoMenu[]> {
	const secoes = (await getCollection('secoes')).sort((a, b) => a.id.localeCompare(b.id));
	return secoes.flatMap((secao) => {
		const { data } = secao;
		if (!('menu' in data) || !data.menu) return [];
		const href = !naPrincipal && data.tipo === 'aprofundamento' ? `/${data.pagina.id}/` : `/#${ancoraDe(secao.id)}`;
		return [{ rotulo: data.menu, href }];
	});
}

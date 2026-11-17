import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Cada arquivo de src/content/home é uma seção da página principal, na ordem do número do nome.
// O "tipo" diz qual bloco desenha a seção. O texto corrido fica no corpo do markdown, depois do bloco ---.
// As fotos ficam em src/assets/fotos/ e são apontadas pelo caminho relativo ao arquivo, com a descrição em "fotoAlt".
const comMenu = {
	// Rótulo no menu. Sem ele, a seção fica fora do menu.
	menu: z.string().optional(),
	titulo: z.string().optional(),
};

// Os desenhos dos cards da Abordagem, em src/components/IconeDesenhado.astro.
const icones = z.enum(['vinculos', 'clareza', 'reverbera', 'lotus']);

const secoes = defineCollection({
	loader: glob({ base: './src/content/home', pattern: '*.md' }),
	schema: ({ image }) => {
		const comFoto = { foto: image(), fotoAlt: z.string() };
		return z.discriminatedUnion('tipo', [
			z.object({
				tipo: z.literal('abertura'),
				// A linha pequena acima do título, que diz o que é o atendimento.
				ancora: z.string(),
				headline: z.string(),
				// O botão que leva à seção Abordagem.
				conhecaAbordagem: z.string(),
				...comFoto,
			}),
			z.object({
				tipo: z.literal('abordagem'),
				...comMenu,
				...comFoto,
				cards: z.array(z.object({ icone: icones, titulo: z.string(), texto: z.string() })).default([]),
			}),
			z.object({
				tipo: z.literal('quem-te-escuta'),
				...comMenu,
				...comFoto,
				apresentacao: z.string(),
				// Rótulo do botão que abre a trajetória (o corpo do arquivo).
				trajetoria: z.string(),
				formacoes: z.array(z.string()).default([]),
			}),
			z.object({
				tipo: z.literal('texto'),
				...comMenu,
				// A citação em faixa própria, antes do texto.
				citacao: z.string().optional(),
				citacaoAutora: z.string().optional(),
			}),
			z.object({
				tipo: z.literal('aprofundamento'),
				...comMenu,
				...comFoto,
				pagina: reference('paginas'),
				linkTexto: z.string(),
			}),
			z.object({
				tipo: z.literal('perguntas'),
				...comMenu,
			}),
			z.object({
				tipo: z.literal('convite'),
				...comFoto,
				ancora: z.string().optional(),
				botao: z.string(),
			}),
		]);
	},
});

// Uma pergunta por arquivo. A resposta é o corpo.
const perguntas = defineCollection({
	loader: glob({ base: './src/content/perguntas', pattern: '*.md' }),
	schema: z.object({
		pergunta: z.string(),
		ordem: z.number(),
	}),
});

// Páginas de "Ler mais". O nome do arquivo vira o endereço: saude-da-mulher.md → /saude-da-mulher/
// O "tipo" diz o desenho da página: "partes" (a de Saúde), "trechos" (a de Saberes) ou "texto" (só o texto, para uma
// página nova). O corpo do arquivo é o fecho, antes do botão do WhatsApp.
const paginas = defineCollection({
	loader: glob({ base: './src/content/paginas', pattern: '*.md' }),
	schema: ({ image }) => {
		const comum = {
			titulo: z.string(),
			// Vai na busca do Google e na prévia do link no WhatsApp.
			descricao: z.string(),
		};
		const parte = z.object({ titulo: z.string(), texto: z.string() });
		return z.discriminatedUnion('tipo', [
			z.object({
				tipo: z.literal('partes'),
				...comum,
				partes: z.array(parte),
				// Os lugares embaixo do fio, um por item.
				lugares: z.array(z.string()).default([]),
				foto: image(),
				fotoAlt: z.string(),
			}),
			z.object({
				tipo: z.literal('trechos'),
				...comum,
				abertura: z.string().optional(),
				// A frase em destaque, com a foto larga embaixo.
				alquimia: z.string(),
				fotoAlquimia: image(),
				fotoAlquimiaAlt: z.string(),
				trechos: z.array(parte),
				// As formações, ao lado da segunda foto.
				formacoes: z.array(z.string()).default([]),
				foto: image(),
				fotoAlt: z.string(),
			}),
			z.object({
				tipo: z.literal('texto'),
				...comum,
			}),
		]);
	},
});

export const collections = { secoes, perguntas, paginas };

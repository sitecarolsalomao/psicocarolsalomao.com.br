import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Cada arquivo de src/content/home é uma seção da página principal, na ordem do número do nome.
// O "tipo" diz qual bloco desenha a seção. O texto corrido fica no corpo do markdown.
const comMenu = {
	// Rótulo no menu. Sem ele, a seção fica fora do menu.
	menu: z.string().optional(),
	titulo: z.string().optional(),
};

const secoes = defineCollection({
	loader: glob({ base: './src/content/home', pattern: '*.md' }),
	schema: ({ image }) =>
		z.discriminatedUnion('tipo', [
			z.object({
				tipo: z.literal('abertura'),
				headline: z.string(),
				// A linha pequena que diz o que é o atendimento.
				ancora: z.string(),
				botao: z.string(),
				// Link discreto para a seção Abordagem.
				conhecaAbordagem: z.string().optional(),
			}),
			z.object({
				tipo: z.literal('abordagem'),
				...comMenu,
				cards: z.array(z.object({ icone: z.string(), titulo: z.string(), texto: z.string() })).default([]),
			}),
			z.object({
				tipo: z.literal('quem-te-escuta'),
				...comMenu,
				apresentacao: z.string(),
				foto: image().optional(),
				fotoAlt: z.string().optional(),
				// Rótulo do botão que abre o texto completo (o corpo do arquivo).
				trajetoria: z.string(),
				formacoes: z.array(z.string()).default([]),
				estudos: z.array(z.string()).default([]),
			}),
			z.object({
				tipo: z.literal('texto'),
				...comMenu,
			}),
			z.object({
				tipo: z.literal('aprofundamento'),
				...comMenu,
				pagina: reference('paginas'),
				linkTexto: z.string(),
			}),
			z.object({
				tipo: z.literal('perguntas'),
				...comMenu,
			}),
			z.object({
				tipo: z.literal('convite'),
				botao: z.string(),
			}),
		]),
});

// Uma pergunta por arquivo. A resposta é o corpo.
const perguntas = defineCollection({
	loader: glob({ base: './src/content/perguntas', pattern: '*.md' }),
	schema: z.object({
		pergunta: z.string(),
		ordem: z.number(),
	}),
});

// Páginas de aprofundamento. O nome do arquivo vira o endereço: saude-da-mulher.md → /saude-da-mulher/
const paginas = defineCollection({
	loader: glob({ base: './src/content/paginas', pattern: '*.md' }),
	schema: z.object({
		titulo: z.string(),
		// Vai na busca do Google e na prévia do link no WhatsApp.
		descricao: z.string(),
	}),
});

export const collections = { secoes, perguntas, paginas };

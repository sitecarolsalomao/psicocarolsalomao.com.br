// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// As fontes são baixadas do Google no build e servidas pelo próprio site: nada carrega de fora na visita.
const google = fontProviders.google();

// https://astro.build/config
export default defineConfig({
	// Canonical, sitemap e Open Graph dependem deste endereço.
	site: 'https://psicocarolsalomao.com.br',
	// O Cloudflare serve /pagina/ e redireciona /pagina para lá. Os links seguem o mesmo formato.
	trailingSlash: 'always',
	// O padrão do Astro 7 ('jsx') pode colar palavras entre elementos inline. Num site de texto, não.
	compressHTML: true,
	integrations: [sitemap()],
	// O realce de código (Shiki) usa estilo inline, que a CSP barra. Um site de texto não tem código para realçar.
	markdown: { syntaxHighlight: false },
	fonts: [
		{ name: 'Newsreader', cssVariable: '--fonte-newsreader', provider: google, weights: [300, 400, 500], styles: ['normal', 'italic'], subsets: ['latin'], fallbacks: ['Georgia', 'serif'] },
		{ name: 'Figtree', cssVariable: '--fonte-figtree', provider: google, weights: [400, 500, 600], styles: ['normal'], subsets: ['latin'], fallbacks: ['system-ui', 'sans-serif'] },
	],
	// Content-Security-Policy numa <meta> em cada página, com o hash de cada script e estilo do próprio site. De fora, só o
	// Umami: o script vem de cloud.umami.is e as visitas vão para gateway.umami.is. O que não cabe numa <meta>
	// (frame-ancestors) está em public/_headers.
	security: {
		csp: {
			directives: [
				"default-src 'self'",
				"img-src 'self' data:",
				"font-src 'self'",
				"connect-src 'self' https://gateway.umami.is https://cloud.umami.is",
				"base-uri 'self'",
				"form-action 'self'",
				"object-src 'none'",
			],
			scriptDirective: { resources: ["'self'", 'https://cloud.umami.is'] },
			styleDirective: { resources: ["'self'"] },
		},
	},
});

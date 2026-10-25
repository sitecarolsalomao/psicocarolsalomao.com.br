// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// Canonical, sitemap e Open Graph dependem deste endereço.
	site: 'https://psicocarolsalomao.com.br',
	// O Cloudflare serve /pagina/ e redireciona /pagina para lá. Os links seguem o mesmo formato.
	trailingSlash: 'always',
	// O padrão do Astro 7 ('jsx') pode colar palavras entre elementos inline. Num site de texto, não.
	compressHTML: true,
	integrations: [sitemap()],
});

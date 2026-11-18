# psicocarolsalomao.com.br

Site da Carolina Salomão, psicóloga (CRP 12/24479): psicoterapia sistêmica com olhar integrativo, online, para mulheres.

Astro 7, estático, publicado no Cloudflare Workers. Sem CMS: o conteúdo é markdown em `src/content/`, separado do layout.

## Rodar

```sh
nvm use          # Node 24, versão fixa no .nvmrc
npm install
npm run dev      # http://localhost:4321
npm run build    # gera o dist/
```

## Onde fica cada coisa

| O quê | Onde |
|---|---|
| Seções da página principal, na ordem do número do nome | `src/content/home/` |
| Perguntas frequentes, uma por arquivo | `src/content/perguntas/` |
| Páginas de "Ler mais" (o nome do arquivo vira o endereço) | `src/content/paginas/` |
| Fotos, apontadas pelo campo `foto` de cada arquivo de conteúdo | `src/assets/fotos/` |
| Nome, CRP, WhatsApp, e-mail e ID do Umami | `src/data/site.ts` |
| Formato de cada tipo de conteúdo | `src/content.config.ts` |
| Layout e componentes | `src/layouts/`, `src/components/` |
| Identidade visual (a estrutura em `base.css`, o desenho em `site.css`) | `src/styles/` |
| Fontes e Content-Security-Policy | `astro.config.mjs` |
| Cabeçalhos HTTP que o Cloudflare manda (`frame-ancestors` e outros) | `public/_headers` |
| Imagem da prévia do link e ícones | `public/og.jpg`, `public/favicon.svg`, `public/apple-touch-icon.png` |
| Regras para a IA que edita o conteúdo | `AGENTS.md` |

As fotos de banco são do StockSnap, licença CC0 (uso livre, sem crédito obrigatório), e ficam até a fotógrafa entregar as dela. Estão em 960 px; a foto da faixa da página de Saberes é a "Leaves Plants" (https://stocksnap.io/photo/leaves-plants-VDPAX2OY3R).

**CSP:** o Astro gera a política numa `<meta>` em cada página, com o hash de cada script e estilo do site. Por isso os scripts dos componentes são `<script>` processados pelo Astro, nunca `<script is:inline>` (o hash de um inline não bate e o navegador bloqueia), e nenhum elemento usa `style="…"`. De fora, só o Umami: o script vem de `cloud.umami.is` e as visitas vão para `gateway.umami.is`.

## Como o site é publicado

```text
sitecarolsalomao/psicocarolsalomao.com.br (privado, conta da Carol, main)
  └─ Cloudflare Workers Builds da conta da Carol → npm run build → psicocarolsalomao.com.br
```

Só a `main` publica. Não existe preview por branch.

O repo é da Carol, e o Gustavo (`the-almeida`) entra como colaborador, para ajustar o que for preciso. Quem faz push é ela (pela IA no computador dela) ou ele, direto na `main`. Antes de mexer, `git pull`, para não sobrescrever o que o outro publicou.

## Configuração, uma vez só

### Repo

1. Na conta `sitecarolsalomao`, criar o repo privado `psicocarolsalomao.com.br` **vazio, sem README**, para ele não nascer com commit próprio.
2. Settings → Collaborators → convidar `the-almeida`, e aceitar o convite na conta dele.
3. Primeiro push da `main` a partir do clone do Gustavo.

### Cloudflare (conta da Carol)

1. Workers → Create → importar este repo, conectando o GitHub como `sitecarolsalomao`. O nome do Worker precisa ser igual ao `name` do `wrangler.jsonc`: `psicocarolsalomao`.
2. Build: `npm run build`. Deploy: `npx wrangler deploy`. Branch de produção: `main`. Preview de branch desligado.
3. Conferir o site no endereço `*.workers.dev` antes de encostar no domínio.
4. Virada do domínio: tirar `psicocarolsalomao.com.br` do Worker temporário, adicionar no Worker novo, esperar o certificado, conferir o site, o 301 do `www` e o HTTPS. Só então apagar o temporário. Dois Workers não respondem pelo mesmo domínio.
5. **Robôs de IA.** Desde julho de 2025 a Cloudflare bloqueia os robôs de IA por padrão em domínios novos, e pode reescrever o `robots.txt`. Este site libera GPTBot, ClaudeBot, PerplexityBot e Google-Extended de propósito. Conferir em AI Crawl Control (ou Security → Bots) que o bloqueio está desligado e que `https://psicocarolsalomao.com.br/robots.txt` em produção é igual ao `public/robots.txt`.

## Voltar uma versão

Painel da Cloudflare → Workers → `psicocarolsalomao` → Deployments → escolher a versão anterior. Como push é publicação, essa é a rede de proteção. Para desfazer também no código: `git revert` do commit e push.

## Manutenção

- O `.nvmrc` fixa o Node 24, a LTS mais recente, só pela versão maior. O build da Cloudflare já traz o 24 pré-instalado e as correções de segurança da linha 24 entram sem mexer no repo.
- Node 24 sai de manutenção em abril de 2028. Para trocar, mudar o `.nvmrc` e o `engines` do `package.json` juntos.

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
| Páginas de aprofundamento (o nome do arquivo vira o endereço) | `src/content/paginas/` |
| Nome, CRP, WhatsApp, e-mail e ID do Analytics | `src/data/site.ts` |
| Formato de cada tipo de conteúdo | `src/content.config.ts` |
| Layout e componentes | `src/layouts/`, `src/components/` |
| Identidade visual | `src/styles/global.css` |
| Regras para a IA que edita o conteúdo | `AGENTS.md` |

## Como o site é publicado

```text
este repo (conta do Gustavo, main)
  └─ push na main → .github/workflows/mirror.yml
       └─ git push --force → sitecarolsalomao/psicocarolsalomao.com.br (privado, conta da Carol)
            └─ Cloudflare Workers Builds da conta da Carol → npm run build → psicocarolsalomao.com.br
```

Só a `main` publica. Não existe preview por branch.

**A regra do espelho:** o repo da conta da Carol é só leitura. Qualquer commit feito lá é apagado na próxima sincronização. Todo commit acontece aqui; a conta `sitecarolsalomao` é colaboradora deste repo.

## Configuração, uma vez só

### Espelho

1. Na conta `sitecarolsalomao`, criar o repo privado `psicocarolsalomao.com.br` **vazio, sem README**, para ele não nascer com commit próprio.
2. `ssh-keygen -t ed25519 -f mirror_key -N "" -C "espelho psicocarolsalomao"`
3. `mirror_key.pub` como **deploy key com permissão de escrita** no repo espelho.
4. O conteúdo de `mirror_key` como secret `MIRROR_SSH_KEY` neste repo.
5. Apagar `mirror_key` e `mirror_key.pub` da máquina.
6. Testar: um commit aqui aparece no espelho em menos de um minuto (aba Actions).

O workflow só roda quando o dono do repo é `the-almeida`. O arquivo também chega ao espelho, e lá ele não pode rodar.

### Cloudflare (conta da Carol)

1. Workers → Create → importar o **repo espelho** (nunca este). O nome do Worker precisa ser igual ao `name` do `wrangler.jsonc`: `psicocarolsalomao`.
2. Build: `npm run build`. Deploy: `npx wrangler deploy`. Branch de produção: `main`. Preview de branch desligado.
3. Conferir o site no endereço `*.workers.dev` antes de encostar no domínio.
4. Virada do domínio: tirar `psicocarolsalomao.com.br` do Worker temporário, adicionar no Worker novo, esperar o certificado, conferir o site, o 301 do `www` e o HTTPS. Só então apagar o temporário. Dois Workers não respondem pelo mesmo domínio.
5. **Robôs de IA.** Desde julho de 2025 a Cloudflare bloqueia os robôs de IA por padrão em domínios novos, e pode reescrever o `robots.txt`. Este site libera GPTBot, ClaudeBot, PerplexityBot e Google-Extended de propósito. Conferir em AI Crawl Control (ou Security → Bots) que o bloqueio está desligado e que `https://psicocarolsalomao.com.br/robots.txt` em produção é igual ao `public/robots.txt`.

## Voltar uma versão

Painel da Cloudflare → Workers → `psicocarolsalomao` → Deployments → escolher a versão anterior. Como push é publicação, essa é a rede de proteção. Para desfazer também no código: `git revert` do commit e push.

## Manutenção

- O `.nvmrc` fixa o Node 24, a LTS mais recente, só pela versão maior. O build da Cloudflare já traz o 24 pré-instalado e as correções de segurança da linha 24 entram sem mexer no repo.
- Node 24 sai de manutenção em abril de 2028. Para trocar, mudar o `.nvmrc` e o `engines` do `package.json` juntos.
- As Actions do workflow estão fixadas por hash de commit, com a versão no comentário.

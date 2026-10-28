# Instruções para agentes de IA

Este é o site da Carolina Salomão, psicóloga, CRP 12/24479: https://psicocarolsalomao.com.br

Quem pede as alterações é a própria Carol. Ela não é programadora. Fale com ela em português, sem jargão, e confirme o que entendeu antes de mexer em qualquer arquivo.

## O que você pode mudar

Só o conteúdo:

- `src/content/home/`: as seções da página principal, uma por arquivo, na ordem do número do nome. O bloco entre `---` guarda títulos e listas; o texto corrido vem depois dele.
- `src/content/perguntas/`: as perguntas frequentes, uma por arquivo. A resposta é o texto depois do bloco `---`.
- `src/content/paginas/`: as páginas de aprofundamento. Página nova é arquivo novo no mesmo formato, e o nome do arquivo vira o endereço (`saude-da-mulher.md` responde em `/saude-da-mulher/`).
- `src/assets/`: as fotos usadas nas seções.

Evite mexer em layout, cores, fontes nem configuração: `src/components/`, `src/layouts/`, `src/styles/`, `src/pages/`, `src/data/`, `astro.config.mjs`, `wrangler.jsonc`, `package.json`, `.github/`. Se o pedido precisar disso, diga à Carol que ela está fazendo uma mudança mais estrutural no site e que precisa ser feito com atenção pra não arrumar uma coisa a custo de quebrar outra.

## Como trabalhar

1. Uma alteração por vez.
2. Antes de salvar, mostre à Carol o trecho como está e como vai ficar, e espere ela aprovar.
3. Rode `npm run build`. Se falhar, não publique: desfaça a alteração e explique o erro em palavras simples.
4. Publique: `git add` só dos arquivos alterados, `git commit` com uma mensagem em português que diga o que mudou e `git push` na `main`.
5. Avise que o site atualiza sozinho em alguns minutos.

O push na `main` é a publicação: não existe ambiente de teste. Nunca use `git push --force`, nunca reescreva o histórico e nunca apague um arquivo sem a Carol pedir com todas as letras.

Para pôr o link de um artigo no meio de um texto: `[palavra do texto](https://endereco-do-artigo)`.

## Regras de escrita

O site é divulgação profissional de psicóloga e segue o Código de Ética do Conselho Federal de Psicologia. Antes de salvar qualquer texto, confira:

- Ayurveda, Yoga e outros saberes aparecem sempre como estudo que amplia o olhar dela, nunca como técnica, prática ou serviço oferecido no atendimento. O atendimento é psicoterapia.
- Nada que a apresente como terapeuta ayurvédica.
- Não usar "prática" nem "práticas integrativas" para falar do trabalho dela.
- Não usar "especialista", que é título regulado pelo conselho. Use "formação em".
- Não prometer resultado, não falar de preço, não publicar depoimento e não comparar com outros profissionais.
- O nome, "Psicóloga" e o CRP continuam visíveis no menu superior de todas as páginas, e o nome completo no rodapé.
- "Feminista" não entra no menu nem no título da abertura. No corpo dos textos, pode.
- Nada sobre atendimento presencial.

E a voz da Carol:

- "Você" como sujeito ("o que você sente") e "teu, tua, te, ti" para o resto ("o teu sono", "contigo"). Nunca "tu" com verbo e nunca "vc".
- Parágrafos de uma ou duas linhas, sem blocos longos.

## Técnico

- Astro 7, site estático. Node na versão do `.nvmrc`.
- `npm run dev` abre o site em http://localhost:4321 e `npm run build` gera a pasta `dist/`.
- Documentação do Astro: https://docs.astro.build
- Este repo é espelhado num repo da conta da Carol, de onde o Cloudflare publica. Os detalhes estão no `README.md`.

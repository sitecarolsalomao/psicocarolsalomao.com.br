// Dados fixos do site. Nome completo, "Psicóloga" e CRP são exigência do conselho em toda divulgação.
export const site = {
	url: 'https://psicocarolsalomao.com.br',
	nome: 'Carol Salomão',
	nomeCompleto: 'Carolina Salomão',
	profissao: 'Psicóloga',
	crp: 'CRP 12/24479',
	descricao: 'Carol Salomão, psicóloga (CRP 12/24479). Psicoterapia sistêmica online para mulheres, com olhar integrativo e atenção à saúde da mulher e à perimenopausa.',
	email: 'psicologacarolinasalomao@gmail.com',
	whatsapp: '5551993324459',
	// Sem dado de saúde: a mensagem fica no histórico do WhatsApp de quem clica.
	mensagemWhatsapp: 'Olá, vim pelo site e gostaria de saber mais sobre os atendimentos.',
	// Enquanto a página de política de privacidade não existe, o link do rodapé abre o WhatsApp com esta pergunta.
	mensagemPrivacidade: 'Olá, vim pelo site e gostaria de saber sobre a política de privacidade: quais dados o site coleta e como eles são usados.',
	// ID do site no Umami Cloud (Website ID). Vazio, o site não carrega analytics.
	umami: 'ebcf573d-70ca-4371-a25b-00cd806e42a3',
	// Só as visitas a este domínio contam: o mesmo código rodando em outro endereço (no computador, numa prévia) não soma.
	dominio: 'psicocarolsalomao.com.br',
};

// "5551993324459" → "(51) 99332-4459"
export const telefoneWhatsapp = site.whatsapp.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

export const linkWhatsapp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.mensagemWhatsapp)}`;

export const linkPrivacidade = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.mensagemPrivacidade)}`;

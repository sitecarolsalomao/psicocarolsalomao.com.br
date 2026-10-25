// Dados fixos do site. Nome completo, "Psicóloga" e CRP são exigência do conselho em toda divulgação.
export const site = {
	url: 'https://psicocarolsalomao.com.br',
	nome: 'Carol Salomão',
	nomeCompleto: 'Carolina Salomão',
	profissao: 'Psicóloga',
	crp: 'CRP 12/24479',
	descricao: 'Psicoterapia sistêmica com olhar integrativo online para mulheres.',
	email: 'psicologacarolinasalomao@gmail.com',
	whatsapp: '5551993324459',
	// Sem dado de saúde: a mensagem fica no histórico do WhatsApp de quem clica.
	mensagemWhatsapp: 'Olá, vim pelo site e gostaria de saber mais sobre os atendimentos.',
	// ID do GA4 (G-XXXXXXX). Vazio, o site não carrega analytics.
	ga4: '',
};

export const linkWhatsapp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.mensagemWhatsapp)}`;

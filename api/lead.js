/* Vercel Serverless Function — lead capture + initial diagnosis */
const json = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
};

function careerDiagnosis(body) {
  const activity = body.atividade || '';
  const objective = body.objetivo || '';
  const moment = body.momento || '';

  if (/Gestão|Liderança/i.test(activity) || /Liderar/i.test(objective) || /Liderança/i.test(moment)) {
    return {
      recommended: 'Head Comercial',
      secondary: 'Inside Sales pode ajudar a consolidar repertório de execução antes ou durante a transição para liderança.',
      reason: 'Suas respostas indicam interesse em estruturar processo, metas e pessoas — competências centrais da trilha de liderança comercial.'
    };
  }
  if (/Relacionamento|expansão/i.test(activity) || /Pós-venda/i.test(objective)) {
    return {
      recommended: 'Customer Success / Farmer',
      secondary: 'Customer Success tende a aprofundar retenção e valor; Farmer aprofunda gestão e expansão de carteira.',
      reason: 'Seu perfil aponta para relacionamento contínuo com clientes, retenção e crescimento de contas.'
    };
  }
  if (/Diagnóstico|fechamento/i.test(activity) || /Vender melhor/i.test(objective)) {
    return {
      recommended: 'Inside Sales / Closer',
      secondary: 'Social Selling complementa a geração de oportunidades por canais digitais.',
      reason: 'Você demonstrou maior aderência a diagnóstico, negociação e fechamento — o núcleo das formações de conversão.'
    };
  }
  return {
    recommended: 'Pré-Vendas',
    secondary: 'Depois, você pode avançar para Inside Sales, Closer ou Social Selling conforme seu objetivo.',
    reason: 'Pré-Vendas é a porta de entrada mais coerente para desenvolver pesquisa, prospecção, qualificação e rotina comercial com método.'
  };
}

function b2bDiagnosis(body) {
  const challenge = body.desafio || '';
  const objective = body.objetivo || '';

  if (/comunidade/i.test(objective)) {
    return {
      title: 'O primeiro desafio é desenhar a comunidade antes da plataforma.',
      summary: 'A prioridade inicial é esclarecer proposta de valor, públicos, jornadas, ritos e modelo de engajamento antes de configurar a tecnologia.',
      priorities: ['Proposta de valor e público central', 'Jornadas, ritos e calendário', 'Modelo de engajamento, monetização e métricas'],
      recommended: 'Comunidade corporativa — CEC + Plura Community'
    };
  }
  if (/contratar/i.test(challenge) || /Bootcamp/i.test(objective) || /talentos/i.test(objective)) {
    return {
      title: 'Sua contratação precisa de mais evidências antes da decisão.',
      summary: 'O gargalo parece estar na avaliação e preparação dos profissionais, não apenas na atração de candidatos.',
      priorities: ['Definir perfil e competências críticas', 'Criar critérios comparáveis de avaliação', 'Observar execução e resposta a feedback'],
      recommended: /Bootcamp/i.test(objective) ? 'Bootcamp de formação e contratação' : 'Banco de talentos + critérios de seleção'
    };
  }
  if (/Equipe precisa|Onboarding/i.test(challenge) || /Treinar/i.test(objective)) {
    return {
      title: 'O time precisa de desenvolvimento conectado à rotina real.',
      summary: 'Treinamento isolado tende a perder força quando não conversa com produto, processo, CRM e indicadores da operação.',
      priorities: ['Mapear lacunas de competência', 'Conectar treinamento ao processo e ferramentas', 'Definir prática, feedback e indicadores de evolução'],
      recommended: 'Treinamento da equipe'
    };
  }
  if (/CRM|Pipeline/i.test(challenge)) {
    return {
      title: 'O problema parece estar na previsibilidade e disciplina da operação.',
      summary: 'Antes de aumentar atividade, vale revisar critérios de pipeline, uso do CRM, ritos e indicadores que sustentam a gestão.',
      priorities: ['Critérios claros de etapas e passagem', 'Rotina de CRM e governança de dados', 'Indicadores e ritos de acompanhamento'],
      recommended: 'Consultoria comercial'
    };
  }
  return {
    title: 'O primeiro passo é transformar conhecimento tácito em processo comercial.',
    summary: 'Sua operação tende a ganhar clareza quando ICP, jornada, playbook, responsabilidades e indicadores deixam de depender apenas das pessoas.',
    priorities: ['ICP e jornada comercial', 'Playbook e responsabilidades', 'Metas, indicadores e governança'],
    recommended: 'Consultoria comercial'
  };
}

async function forwardToCrm(payload) {
  const typeSpecific = payload.type === 'b2b' ? process.env.CEC_B2B_WEBHOOK_URL : process.env.CEC_B2C_WEBHOOK_URL;
  const url = typeSpecific || process.env.CEC_CRM_WEBHOOK_URL;
  if (!url) return { forwarded: false, reason: 'not_configured' };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) return { forwarded: false, reason: `http_${response.status}` };
    return { forwarded: true };
  } catch (error) {
    console.error('CRM webhook error:', error?.message || error);
    return { forwarded: false, reason: 'request_failed' };
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { error: 'Método não permitido.' });

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); }
    catch { return json(res, 400, { error: 'JSON inválido.' }); }
  }

  if (!['b2b', 'b2c'].includes(body.type)) return json(res, 400, { error: 'Tipo de lead inválido.' });
  if (!body.nome || !body.email) return json(res, 400, { error: 'Nome e e-mail são obrigatórios.' });
  if (body.type === 'b2b' && !body.empresa) return json(res, 400, { error: 'Empresa é obrigatória.' });

  const diagnosis = body.type === 'b2b' ? b2bDiagnosis(body) : careerDiagnosis(body);
  const payload = {
    ...body,
    diagnosis,
    submittedAt: new Date().toISOString(),
    source: body.source || 'cec-website'
  };
  const crm = await forwardToCrm(payload);

  return json(res, 200, {
    ok: true,
    diagnosis,
    crmForwarded: crm.forwarded
  });
};

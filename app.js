/* CEC Website — shared client behavior */
class CecHeader extends HTMLElement {
  connectedCallback() {
    const page = this.getAttribute('page') || 'home';
    const cta = page === 'empresas'
      ? '<a class="btn btn--primary" href="/empresas/#diagnostico">Diagnóstico gratuito →</a>'
      : page === 'alunos'
        ? '<a class="btn btn--primary" href="/alunos/#quiz">Descobrir formação →</a>'
        : page === 'comunidade'
          ? '<a class="btn btn--primary" href="/empresas/#diagnostico">Criar comunidade →</a>'
          : '<a class="btn btn--primary" href="/alunos/#quiz">Encontrar meu caminho →</a>';

    this.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="/" aria-label="CEC — Centro Excelência Comercial">
            <img src="/assets/images/logo-cec.png" alt="CEC — Centro Excelência Comercial" width="154" height="40">
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Abrir menu">
            <span class="nav-toggle-lines" aria-hidden="true"></span>
          </button>
          <nav class="nav" id="primary-navigation" aria-label="Navegação principal">
            <a href="/" ${page === 'home' ? 'aria-current="page"' : ''}>Home</a>
            <a href="/alunos/" ${page === 'alunos' ? 'aria-current="page"' : ''}>Formações</a>
            <a href="/empresas/" ${page === 'empresas' ? 'aria-current="page"' : ''}>Para empresas</a>
            <a href="/comunidade/" ${page === 'comunidade' ? 'aria-current="page"' : ''}>Criar comunidade</a>
            <a href="https://www.centroexcelenciacomercial.com.br/blog" target="_blank" rel="noopener noreferrer">Blog</a>
            <a href="https://comunidade.centroexcelenciacomercial.com.br/" target="_blank" rel="noopener noreferrer">Área do aluno</a>
            ${cta}
          </nav>
        </div>
      </header>`;

    const button = this.querySelector('.nav-toggle');
    const nav = this.querySelector('.nav');
    const close = () => {
      nav?.classList.remove('open');
      button?.setAttribute('aria-expanded', 'false');
      button?.setAttribute('aria-label', 'Abrir menu');
      document.body.classList.remove('menu-open');
    };
    button?.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      document.body.classList.toggle('menu-open', open && innerWidth <= 680);
    });
    nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    addEventListener('resize', () => { if (innerWidth > 980) close(); }, { passive: true });
  }
}
customElements.define('cec-header', CecHeader);

class CecFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <img class="footer-logo" src="/assets/images/logo-cec.png" alt="CEC — Centro Excelência Comercial" width="150" height="39">
              <p>Formação, prática e conexão para carreiras e operações comerciais · São Paulo, SP.</p>
            </div>
            <div>
              <h4>Para alunos</h4>
              <a href="/alunos/#trilha">Trilha de carreira</a>
              <a href="/alunos/#quiz">Diagnóstico de 5 perguntas</a>
              <a href="/alunos/#planos">Planos</a>
              <a href="https://comunidade.centroexcelenciacomercial.com.br/" target="_blank" rel="noopener noreferrer">Área do aluno</a>
            </div>
            <div>
              <h4>Para empresas</h4>
              <a href="/empresas/#solucoes">Soluções corporativas</a>
              <a href="/empresas/#diagnostico">Diagnóstico comercial</a>
              <a href="/comunidade/">Criar comunidade</a>
              <a href="https://www.centroexcelenciacomercial.com.br/blog" target="_blank" rel="noopener noreferrer">Blog CEC</a>
            </div>
            <div>
              <h4>Contato</h4>
              <a href="https://api.whatsapp.com/send/?phone=551153046822" target="_blank" rel="noopener noreferrer">WhatsApp (11) 5304-6822</a>
              <a href="mailto:contato@centroexcelenciacomercial.com.br">contato@centroexcelenciacomercial.com.br</a>
              <a href="mailto:dpo@centroexcelenciacomercial.com.br">Encarregado de dados (DPO)</a>
              <p>São Paulo/SP</p>
            </div>
          </div>
          <div class="footer-bottom footer-bottom--legal">
            <span>© 2026 Centro Excelência Comercial</span>
            <nav class="legal-links" aria-label="Links legais">
              <a href="https://www.centroexcelenciacomercial.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de privacidade</a>
              <a href="https://www.centroexcelenciacomercial.com.br/politica-de-cookies" target="_blank" rel="noopener noreferrer">Política de cookies</a>
              <a href="https://www.centroexcelenciacomercial.com.br/termos" target="_blank" rel="noopener noreferrer">Termos de uso</a>
              <a href="mailto:dpo@centroexcelenciacomercial.com.br">Encarregado de dados</a>
            </nav>
          </div>
        </div>
      </footer>`;
  }
}
customElements.define('cec-footer', CecFooter);

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('[data-reveal]');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
  revealElements.forEach(el => observer.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('is-visible'));
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const selector = anchor.getAttribute('href');
    if (!selector || selector === '#') return;
    const target = document.querySelector(selector);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', selector);
  });
});

const mobileCta = document.querySelector('.mobile-cta');
if (mobileCta) {
  const sync = () => mobileCta.classList.toggle('visible', innerWidth <= 680 && scrollY > 540);
  addEventListener('scroll', sync, { passive: true });
  addEventListener('resize', sync, { passive: true });
  sync();
}

function escapeHTML(value = '') {
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

async function submitLead(payload) {
  const response = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Não foi possível concluir agora.');
  return data;
}

function validateStep(step) {
  const fields = [...step.querySelectorAll('input,select,textarea')];
  for (const field of fields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  const requiredRadioNames = [...new Set(fields.filter(f => f.type === 'radio' && f.required).map(f => f.name))];
  for (const name of requiredRadioNames) {
    if (!step.querySelector(`input[name="${CSS.escape(name)}"]:checked`)) {
      const first = step.querySelector(`input[name="${CSS.escape(name)}"]`);
      first?.focus();
      return false;
    }
  }
  return true;
}

function setupStepper(form, stepSelector, controls) {
  const steps = [...form.querySelectorAll(stepSelector)];
  if (!steps.length) return null;
  let current = 0;
  const label = form.querySelector('[data-step-label]');
  const bar = form.querySelector('[data-progress-bar]');
  const prev = form.querySelector(controls.prev);
  const next = form.querySelector(controls.next);
  const submit = form.querySelector(controls.submit);
  const render = () => {
    steps.forEach((step, index) => step.classList.toggle('is-active', index === current));
    if (label) label.textContent = `${controls.label} ${current + 1} de ${steps.length}`;
    if (bar) bar.style.width = `${((current + 1) / steps.length) * 100}%`;
    if (prev) prev.hidden = current === 0;
    if (next) next.hidden = current === steps.length - 1;
    if (submit) submit.hidden = current !== steps.length - 1;
  };
  prev?.addEventListener('click', () => { if (current > 0) { current -= 1; render(); } });
  next?.addEventListener('click', () => {
    if (!validateStep(steps[current])) return;
    if (current < steps.length - 1) { current += 1; render(); }
  });
  render();
  return { steps, get current() { return current; }, validateCurrent: () => validateStep(steps[current]) };
}

function setBusy(form, busy, text = '') {
  const buttons = form.querySelectorAll('button');
  buttons.forEach(button => { button.disabled = busy; });
  const status = form.querySelector('.form-status');
  if (status) status.textContent = text;
}

function renderCareerResult(target, diagnosis, crmForwarded) {
  const recommended = escapeHTML(diagnosis?.recommended || 'Trilha comercial CEC');
  const reason = escapeHTML(diagnosis?.reason || 'Sua resposta indica que vale aprofundar o seu momento antes de escolher a formação.');
  const secondary = diagnosis?.secondary ? `<p class="result-secondary"><strong>Também vale conhecer:</strong> ${escapeHTML(diagnosis.secondary)}</p>` : '';
  const integration = crmForwarded === false ? '<p class="integration-note">Homologação: a recomendação foi gerada, mas o webhook do CRM ainda precisa ser configurado na Vercel para registrar automaticamente o lead.</p>' : '';
  target.innerHTML = `
    <div class="result-kicker">Sua recomendação inicial</div>
    <h3>${recommended}</h3>
    <p>${reason}</p>
    ${secondary}
    <div class="button-row">
      <a class="btn btn--primary" href="/alunos/#formacoes">Ver formações →</a>
      <a class="btn" href="https://api.whatsapp.com/send/?phone=551153046822&text=${encodeURIComponent(`Olá! Fiz o diagnóstico de carreira no site da CEC e minha recomendação foi: ${diagnosis?.recommended || 'trilha CEC'}. Quero entender o próximo passo.`)}" target="_blank" rel="noopener noreferrer">Falar com a CEC</a>
    </div>
    ${integration}`;
  target.hidden = false;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
}

const careerQuiz = document.querySelector('#career-quiz');
if (careerQuiz) {
  const stepper = setupStepper(careerQuiz, '.quiz-step', {
    prev:'[data-quiz-prev]', next:'[data-quiz-next]', submit:'[data-quiz-submit]', label:'Pergunta'
  });
  const target = document.querySelector('#career-result');
  careerQuiz.addEventListener('submit', async event => {
    event.preventDefault();
    if (!stepper?.validateCurrent()) return;
    const data = Object.fromEntries(new FormData(careerQuiz).entries());
    setBusy(careerQuiz, true, 'Gerando sua recomendação…');
    try {
      const result = await submitLead({ type:'b2c', source:'cec-website', ...data });
      renderCareerResult(target, result.diagnosis, result.crmForwarded);
      setBusy(careerQuiz, false, 'Recomendação gerada.');
    } catch (error) {
      setBusy(careerQuiz, false, error.message || 'Não foi possível concluir agora.');
    }
  });
}

function renderB2BResult(target, diagnosis, crmForwarded, formData) {
  const priorities = Array.isArray(diagnosis?.priorities) ? diagnosis.priorities : [];
  const integration = crmForwarded === false ? '<p class="integration-note">Homologação: o diagnóstico funciona, mas o webhook do CRM ainda precisa ser configurado na Vercel para registrar o lead e acionar a automação de e-mail.</p>' : '';
  const whatsappMessage = `Olá! Fiz o diagnóstico comercial no site da CEC para a empresa ${formData.empresa || ''}. A frente indicada foi: ${diagnosis?.recommended || 'diagnóstico comercial'}. Quero conversar sobre os próximos passos.`;
  target.innerHTML = `
    <div class="result-kicker">Diagnóstico inicial</div>
    <h3>${escapeHTML(diagnosis?.title || 'Primeira leitura da operação')}</h3>
    <p>${escapeHTML(diagnosis?.summary || '')}</p>
    ${priorities.length ? `<div class="result-priorities"><strong>Prioridades para aprofundar:</strong><ul>${priorities.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul></div>` : ''}
    <p><strong>Frente CEC sugerida:</strong> ${escapeHTML(diagnosis?.recommended || 'Diagnóstico comercial')}</p>
    <div class="button-row">
      <button class="btn btn--primary" type="button" data-print-diagnosis>Salvar diagnóstico em PDF</button>
      <a class="btn" href="https://api.whatsapp.com/send/?phone=551153046822&text=${encodeURIComponent(whatsappMessage)}" target="_blank" rel="noopener noreferrer">Conversar com especialista</a>
    </div>
    ${integration}`;
  target.hidden = false;
  target.querySelector('[data-print-diagnosis]')?.addEventListener('click', () => window.print());
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
}

const b2bForm = document.querySelector('#b2b-form');
if (b2bForm) {
  const stepper = setupStepper(b2bForm, '.form-step', {
    prev:'[data-form-prev]', next:'[data-form-next]', submit:'[data-form-submit]', label:'Etapa'
  });
  const target = document.querySelector('#b2b-result');
  b2bForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!stepper?.validateCurrent()) return;
    const formData = Object.fromEntries(new FormData(b2bForm).entries());
    setBusy(b2bForm, true, 'Analisando suas respostas…');
    try {
      const result = await submitLead({ type:'b2b', source:'cec-website', ...formData });
      renderB2BResult(target, result.diagnosis, result.crmForwarded, formData);
      setBusy(b2bForm, false, 'Diagnóstico gerado.');
    } catch (error) {
      setBusy(b2bForm, false, error.message || 'Não foi possível concluir agora.');
    }
  });
}

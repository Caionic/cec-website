/* CEC Website — consolidated client script */
const routes = {
  home: '/',
  empresas: '/empresas/',
  alunos: '/alunos/'
};

class CecHeader extends HTMLElement {
  connectedCallback() {
    const page = this.getAttribute('page') || 'home';
    const cta = page === 'empresas'
      ? '<a class="btn btn--primary" href="/empresas/#diagnostico">Agendar diagnóstico →</a>'
      : '<a class="btn btn--primary" href="/alunos/#formacoes">Encontrar meu caminho →</a>';
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
            <a href="/empresas/" ${page === 'empresas' ? 'aria-current="page"' : ''}>Para empresas</a>
            <a href="/alunos/" ${page === 'alunos' ? 'aria-current="page"' : ''}>Para alunos</a>
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
              <p>Ecossistema de formação, prática e conexão para carreiras comerciais · São Paulo, SP.</p>
            </div>
            <div>
              <h4>Para você</h4>
              <a href="/alunos/#formacoes">Formações</a>
              <a href="/alunos/#planos">Planos</a>
              <a href="https://comunidade.centroexcelenciacomercial.com.br/" target="_blank" rel="noopener noreferrer">Comunidade</a>
            </div>
            <div>
              <h4>Para empresas</h4>
              <a href="/empresas/#solucoes">Soluções corporativas</a>
              <a href="/empresas/#diagnostico">Diagnóstico comercial</a>
              <a href="https://www.centroexcelenciacomercial.com.br/comunidade" target="_blank" rel="noopener noreferrer">Comunidade corporativa</a>
            </div>
            <div>
              <h4>Contato</h4>
              <a href="https://api.whatsapp.com/send/?phone=551153046822" target="_blank" rel="noopener noreferrer">WhatsApp (11) 5304-6822</a>
              <a href="mailto:contato@centroexcelenciacomercial.com.br">contato@centroexcelenciacomercial.com.br</a>
              <p>São Paulo/SP</p>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2026 Centro Excelência Comercial</span>
            <span><a href="https://www.centroexcelenciacomercial.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de privacidade</a> · <a href="https://www.centroexcelenciacomercial.com.br/termos" target="_blank" rel="noopener noreferrer">Termos de uso</a></span>
          </div>
        </div>
      </footer>`;
  }
}

customElements.define('cec-footer', CecFooter);

function buildWhatsAppUrl(data) {
  const get = key => typeof data?.get === 'function' ? data.get(key) : data?.[key];
  const message = [
    'Olá! Vim pelo site de homologação da CEC e quero agendar um diagnóstico comercial.',
    '',
    `Nome: ${get('nome') || ''}`,
    `Empresa: ${get('empresa') || ''}`,
    `Cargo: ${get('cargo') || ''}`,
    `Tamanho do time: ${get('time') || ''}`,
    `Principal desafio: ${get('desafio') || ''}`,
    `Objetivo: ${get('objetivo') || ''}`,
    `E-mail: ${get('email') || ''}`,
    `WhatsApp: ${get('whatsapp') || ''}`,
    get('contexto') ? `Contexto: ${get('contexto')}` : ''
  ].filter(Boolean).join('\n');
  return `https://api.whatsapp.com/send/?phone=551153046822&text=${encodeURIComponent(message)}`;
}

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

const form = document.querySelector('#b2b-form');
if (form) {
  const status = form.querySelector('.form-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const url = buildWhatsAppUrl(data);
    if (status) status.textContent = 'Abrindo o WhatsApp com seu pré-diagnóstico preenchido…';
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

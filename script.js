(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(pointer: coarse)');

  const inPageLinks = [...document.querySelectorAll('a[href^="#"]:not([href="#"])')].filter(link => !link.closest('#site-navigation-root'));
  inPageLinks.forEach(link => link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    window.scrollTo({ top: target.offsetTop - 80, behavior: reduced.matches ? 'auto' : 'smooth' });
  }));

  addEventListener('scroll', () => {
    if (!reduced.matches && !coarse.matches) document.querySelectorAll('[data-parallax]').forEach(el => {
      const rect = el.parentElement.getBoundingClientRect();
      const amount = Number(el.dataset.parallax);
      const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight));
      el.style.transform = `translate3d(0, ${progress * amount}px, 0)`;
    });
  }, { passive: true });

  const clock = document.querySelector('#cebu-time');
  const updateTime = () => {
    clock.textContent = `Cebu time ${new Intl.DateTimeFormat('en-PH', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())}`;
  };
  updateTime(); setInterval(updateTime, 30000);

  if (!coarse.matches) document.querySelectorAll('.project-media').forEach(media => {
    media.addEventListener('pointermove', e => {
      const r = media.getBoundingClientRect();
      media.style.setProperty('--x', `${Math.max(52, Math.min(r.width - 52, e.clientX - r.left))}px`);
      media.style.setProperty('--y', `${Math.max(52, Math.min(r.height - 52, e.clientY - r.top))}px`);
    });
  });
  const services = [...document.querySelectorAll('.service')];
  const previewTitle = document.querySelector('#preview-title');
  const selectService = service => {
    previewTitle.textContent = service.dataset.service;
    services.forEach(item => {
      const isSelected = item === service;
      const button = item.querySelector('.service-button');
      const panel = item.querySelector('.service-panel');
      button.setAttribute('aria-expanded', String(isSelected));
      panel.setAttribute('aria-hidden', String(!isSelected));
      panel.inert = !isSelected;
    });
  };
  services.forEach(service => {
    const button = service.querySelector('.service-button');
    button.addEventListener('click', () => selectService(service));
    button.addEventListener('focus', () => { previewTitle.textContent = service.dataset.service; });
    service.addEventListener('pointerenter', () => { if (!coarse.matches) previewTitle.textContent = service.dataset.service; });
  });

  const steps = [...document.querySelectorAll('.process-step')];
  const processList = document.querySelector('#process-list');
  const processObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    steps.forEach(step => step.classList.toggle('active', step === entry.target));
    processList.style.setProperty('--progress', `${((steps.indexOf(entry.target) + 1) / steps.length) * 100}%`);
  }), { rootMargin: '-38% 0px -38%', threshold: .15 });
  steps.forEach(step => processObserver.observe(step));

  const dialog = document.querySelector('#case-dialog');
  const dialogTitle = dialog.querySelector('#dialog-title');
  const dialogCopy = dialog.querySelector('#dialog-copy');
  const dialogLive = dialog.querySelector('#dialog-live');
  const caseCopy = Object.fromEntries((window.JUNRY_PROJECTS || []).map(project => [project.name, project.summary]));
  document.querySelectorAll('[data-dialog-project]').forEach(trigger => trigger.addEventListener('click', () => {
    const project = trigger.dataset.dialogProject;
    dialogTitle.textContent = project;
    dialogCopy.textContent = caseCopy[project] || 'Project details can be shared during a project conversation.';
    dialogLive.href = trigger.dataset.projectUrl;
    dialog.showModal();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialogLive.addEventListener('click', () => dialog.close());
  dialog.querySelector('#dialog-contact').addEventListener('click', () => dialog.close());

  const form = document.querySelector('#project-form');
  const status = document.querySelector('#form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    if (location.protocol === 'file:') {
      status.className = 'form-status is-error';
      status.textContent = 'Local file preview detected. Test the form from the deployed website or through a local web server.';
      return;
    }

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    status.className = 'form-status';
    status.textContent = 'Sending your project details…';

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      payload._url = location.href;
      const response = await fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(result.message || `Submission failed with status ${response.status}`);
      }

      form.reset();
      status.classList.add('is-success');
      status.textContent = 'Thanks — your inquiry has been sent. I’ll be in touch soon.';
    } catch (error) {
      console.error('Project inquiry submission failed:', error);
      status.classList.add('is-error');
      status.textContent = /activat/i.test(error.message)
        ? 'One-time form activation is required. Check junry.virtucio10@gmail.com for the FormSubmit activation email, click Activate Form, then try again.'
        : 'Your inquiry could not be sent. Please try again or contact me through email or WhatsApp.';
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
    }
  });
})();

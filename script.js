(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = matchMedia('(pointer: coarse)');
  const revealTargets = [...document.querySelectorAll('.work-header, .project, .interlude-grid, .services-head, .services-grid, .process-grid, .about-header, .about-layout, .principles, .contact-head, .contact-grid, .work-archive-cta')];
  const parallaxTargets = [...document.querySelectorAll('.interlude-visual, .service-preview')];
  parallaxTargets.forEach(target => target.classList.add('scroll-parallax'));

  if (!reduced.matches) {
    revealTargets.forEach((element, index) => {
      element.classList.add('reveal-on-scroll');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
    });

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      }), { rootMargin: '0px 0px -12% 0px', threshold: .08 });
      revealTargets.forEach(target => revealObserver.observe(target));
    } else revealTargets.forEach(target => target.classList.add('is-visible'));
  }

  let scrollFrame = 0;
  const updateScrollEffects = () => {
    scrollFrame = 0;
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    document.documentElement.style.setProperty('--scroll-progress', `${maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0}%`);
    if (reduced.matches || coarse.matches) return;
    parallaxTargets.forEach(element => {
      const rect = element.parentElement.getBoundingClientRect();
      const amount = Number(element.dataset.parallax || (element.classList.contains('hero-portrait') ? 18 : 28));
      const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight));
      element.style.setProperty('--parallax-y', `${progress * amount}px`);
    });
  };
  const requestScrollEffects = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollEffects); };
  requestScrollEffects();
  addEventListener('scroll', requestScrollEffects, { passive: true });

  const inPageLinks = [...document.querySelectorAll('a[href^="#"]:not([href="#"])')].filter(link => !link.closest('#site-navigation-root'));
  inPageLinks.forEach(link => link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    window.scrollTo({ top: target.offsetTop - 80, behavior: reduced.matches ? 'auto' : 'smooth' });
  }));

  if (!coarse.matches) document.querySelectorAll('.project-media').forEach(media => {
    media.addEventListener('pointermove', e => {
      const r = media.getBoundingClientRect();
      media.style.setProperty('--x', `${Math.max(52, Math.min(r.width - 52, e.clientX - r.left))}px`);
      media.style.setProperty('--y', `${Math.max(52, Math.min(r.height - 52, e.clientY - r.top))}px`);
    });
  });
  const services = [...document.querySelectorAll('.service')];
  const serviceList = document.querySelector('.service-list');
  const servicePreview = document.querySelector('.service-preview');
  const previewOverlay = servicePreview.querySelector('.preview-overlay');
  const previewTitle = document.querySelector('#preview-title');
  const previewIndex = document.querySelector('#preview-index');
  const previewOutcome = document.querySelector('#preview-outcome');
  const previewOutputs = document.querySelector('#preview-outputs');
  const previewAnnouncement = document.querySelector('#preview-announcement');
  const previewIndexItems = [...document.querySelectorAll('.preview-service-index li')];
  const serviceAccents = {
    cobalt: 'var(--cobalt)',
    coral: 'var(--coral)',
    acid: 'var(--acid)',
    teal: 'var(--teal)'
  };

  const updateServicePreview = (service, announce = false) => {
    const outputs = service.dataset.serviceOutputs.split('|');
    const activeIndex = services.indexOf(service);
    servicePreview.style.setProperty('--service-accent', serviceAccents[service.dataset.serviceAccent] || 'var(--coral)');
    previewTitle.textContent = service.dataset.service;
    previewIndex.textContent = `${service.dataset.serviceIndex} / ${String(services.length).padStart(2, '0')}`;
    previewOutcome.textContent = service.dataset.serviceOutcome;
    previewOutputs.replaceChildren(...outputs.map(output => {
      const item = document.createElement('span');
      item.textContent = output;
      return item;
    }));
    previewIndexItems.forEach((item, index) => item.classList.toggle('is-active', index === activeIndex));

    if (announce) previewAnnouncement.textContent = `${service.dataset.service} selected. ${service.dataset.serviceOutcome}`;
    if (reduced.matches) return;

    previewOverlay.getAnimations().forEach(animation => animation.cancel());
    previewOverlay.animate([
      { opacity: .2, transform: 'translateY(14px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 380, easing: 'cubic-bezier(.22, .7, .15, 1)' });
    [...previewOutputs.children].forEach((item, index) => item.animate([
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 280, delay: 75 + index * 45, fill: 'both', easing: 'ease-out' }));
  };

  const selectService = service => {
    services.forEach(item => {
      const isSelected = item === service;
      const button = item.querySelector('.service-button');
      const panel = item.querySelector('.service-panel');
      item.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-expanded', String(isSelected));
      panel.setAttribute('aria-hidden', String(!isSelected));
      panel.inert = !isSelected;
    });
    updateServicePreview(service, true);
  };
  services.forEach(service => {
    const button = service.querySelector('.service-button');
    button.addEventListener('click', () => selectService(service));
    button.addEventListener('focus', () => updateServicePreview(service));
    service.addEventListener('pointerenter', () => { if (!coarse.matches) updateServicePreview(service); });
    service.addEventListener('pointerleave', () => {
      if (coarse.matches) return;
      const selected = services.find(item => item.querySelector('.service-button').getAttribute('aria-expanded') === 'true');
      if (selected) updateServicePreview(selected);
    });
  });
  serviceList.addEventListener('focusout', () => requestAnimationFrame(() => {
    if (serviceList.contains(document.activeElement)) return;
    const selected = services.find(item => item.querySelector('.service-button').getAttribute('aria-expanded') === 'true');
    if (selected) updateServicePreview(selected);
  }));
  updateServicePreview(services.find(service => service.querySelector('.service-button').getAttribute('aria-expanded') === 'true') || services[0]);

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
    const projectUrl = trigger.dataset.projectUrl;
    dialogLive.hidden = !projectUrl;
    if (projectUrl) dialogLive.href = projectUrl;
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

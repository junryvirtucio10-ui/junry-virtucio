(() => {
  document.documentElement.classList.add('projects-js');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const clock = document.querySelector('#cebu-time');
  const updateTime = () => {
    clock.textContent = `CEBU TIME ${new Intl.DateTimeFormat('en-PH', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())}`;
  };
  updateTime();
  setInterval(updateTime, 30000);

  const projects = window.JUNRY_PROJECTS || [];
  const configuredFilters = window.JUNRY_PROJECT_FILTERS || [{ id: 'all', label: 'All' }];
  const filterBar = document.querySelector('#project-filters');
  const mobileFilter = document.querySelector('#project-filter-select');
  const grid = document.querySelector('#project-grid');
  const count = document.querySelector('#project-count');
  const empty = document.querySelector('#project-empty');
  const pad = value => String(value).padStart(2, '0');

  const makeProjectCard = (project, index) => {
    const article = document.createElement('article');
    article.className = 'archive-project';
    article.dataset.filters = project.filters.join(' ');

    const media = document.createElement('a');
    media.className = 'archive-project-media';
    media.href = project.url;
    media.target = '_blank';
    media.rel = 'noopener noreferrer';
    media.setAttribute('aria-label', `Visit the ${project.name} website — opens in a new tab`);

    const image = document.createElement('img');
    image.src = project.image;
    image.width = project.imageWidth;
    image.height = project.imageHeight;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.alt = project.imageAlt;
    media.append(image);

    const visit = document.createElement('span');
    visit.className = 'archive-project-visit mono';
    visit.textContent = 'VISIT WEBSITE ↗';
    media.append(visit);

    const body = document.createElement('div');
    body.className = 'archive-project-body';

    const eyebrow = document.createElement('div');
    eyebrow.className = 'archive-project-eyebrow mono';
    eyebrow.innerHTML = `<span>PROJECT ${pad(index + 1)}</span><span>${project.sector}</span>`;

    const title = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = project.url;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener noreferrer';
    titleLink.textContent = project.name;
    title.append(titleLink);

    const summary = document.createElement('p');
    summary.className = 'archive-project-summary';
    summary.textContent = project.summary;

    const services = document.createElement('ul');
    services.className = 'archive-project-services';
    project.services.forEach(service => {
      const item = document.createElement('li');
      item.textContent = service;
      services.append(item);
    });

    body.append(eyebrow, title, summary, services);
    article.append(media, body);
    return article;
  };

  const cards = projects.map((project, index) => {
    const card = makeProjectCard(project, index);
    grid.append(card);
    return { element: card, project };
  });

  const revealTargets = [
    document.querySelector('.archive-index-head'),
    document.querySelector('.archive-controls'),
    ...cards.map(({ element }) => element),
    document.querySelector('.archive-cta-grid'),
    document.querySelector('.site-footer .shell')
  ].filter(Boolean);

  revealTargets.forEach((target, index) => {
    target.classList.add('reveal-item');
    target.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 70}ms`);
  });

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealTargets.forEach(target => target.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8%', threshold: 0.08 });

    revealTargets.forEach(target => revealObserver.observe(target));
  }

  const validFilters = configuredFilters.filter(filter => filter.id === 'all' || projects.some(project => project.filters.includes(filter.id)));
  const buttons = validFilters.map(filter => {
    const visibleCount = filter.id === 'all' ? projects.length : projects.filter(project => project.filters.includes(filter.id)).length;
    const button = document.createElement('button');
    button.className = 'filter-button mono';
    button.type = 'button';
    button.dataset.filter = filter.id;
    button.setAttribute('aria-controls', 'project-grid');
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = `<span>${filter.label}</span><span>${pad(visibleCount)}</span>`;
    filterBar.append(button);
    return button;
  });
  validFilters.forEach(filter => {
    const visibleCount = filter.id === 'all' ? projects.length : projects.filter(project => project.filters.includes(filter.id)).length;
    const option = document.createElement('option');
    option.value = filter.id;
    option.textContent = `${filter.label} (${visibleCount})`;
    mobileFilter.append(option);
  });

  const applyFilter = (filter, updateUrl = true) => {
    const selected = validFilters.some(item => item.id === filter) ? filter : 'all';
    let visible = 0;
    cards.forEach(({ element, project }) => {
      const show = selected === 'all' || project.filters.includes(selected);
      element.hidden = !show;
      if (show) visible += 1;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    mobileFilter.value = selected;
    const label = validFilters.find(item => item.id === selected)?.label || 'All';
    count.textContent = selected === 'all'
      ? `SHOWING ${pad(visible)} / ${pad(projects.length)} WEBSITES`
      : `SHOWING ${pad(visible)} / ${pad(projects.length)} · ${label.toUpperCase()}`;
    empty.hidden = visible !== 0;

    if (updateUrl && !reducedMotion.matches && typeof grid.animate === 'function') {
      grid.animate([
        { opacity: 0.35, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 360,
        easing: 'cubic-bezier(.22, .7, .15, 1)'
      });
    }

    if (updateUrl) {
      const url = new URL(location.href);
      if (selected === 'all') url.searchParams.delete('filter');
      else url.searchParams.set('filter', selected);
      try { history.replaceState({}, '', url); } catch { /* Filtering still works in restricted local previews. */ }
    }
  };

  buttons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
  mobileFilter.addEventListener('change', () => applyFilter(mobileFilter.value));
  const initialFilter = new URL(location.href).searchParams.get('filter') || 'all';
  applyFilter(initialFilter, false);
})();

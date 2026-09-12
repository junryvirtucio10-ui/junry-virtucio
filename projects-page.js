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

    const hasLiveUrl = Boolean(project.url && project.url !== '#');
    const media = document.createElement(hasLiveUrl ? 'a' : 'div');
    media.className = 'archive-project-media';
    if (hasLiveUrl) {
      media.href = project.url;
      media.target = '_blank';
      media.rel = 'noopener noreferrer';
      media.setAttribute('aria-label', `Visit the ${project.name} website — opens in a new tab`);
    } else {
      media.classList.add('is-static');
    }

    const picture = document.createElement('picture');
    picture.className = 'responsive-picture';
    const sizes = '(max-width: 760px) 90vw, (max-width: 1100px) 45vw, (min-width: 1631px) 474px, 29vw';
    const source = document.createElement('source');
    source.type = 'image/avif';
    source.sizes = sizes;
    source.srcset = project.thumbnail.avifSrcset;
    picture.append(source);

    const image = document.createElement('img');
    image.width = project.thumbnail.width;
    image.height = project.thumbnail.height;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.alt = project.imageAlt;
    image.sizes = sizes;
    image.srcset = project.thumbnail.srcset;
    image.src = project.thumbnail.src;
    picture.append(image);
    media.append(picture);

    const visit = document.createElement('span');
    visit.className = 'archive-project-visit mono';
    visit.textContent = hasLiveUrl ? 'VISIT WEBSITE ↗' : 'PROJECT CAPTURE';
    media.append(visit);

    const body = document.createElement('div');
    body.className = 'archive-project-body';

    const eyebrow = document.createElement('div');
    eyebrow.className = 'archive-project-eyebrow mono';
    const projectNumber = document.createElement('span');
    projectNumber.textContent = `PROJECT ${pad(index + 1)}`;
    const projectSector = document.createElement('span');
    projectSector.textContent = project.sector;
    eyebrow.append(projectNumber, projectSector);

    const title = document.createElement('h3');
    if (hasLiveUrl) {
      const titleLink = document.createElement('a');
      titleLink.href = project.url;
      titleLink.target = '_blank';
      titleLink.rel = 'noopener noreferrer';
      titleLink.textContent = project.name;
      title.append(titleLink);
    } else {
      title.textContent = project.name;
    }

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
    const button = document.createElement('button');
    button.className = 'filter-button mono';
    button.type = 'button';
    button.dataset.filter = filter.id;
    button.setAttribute('aria-controls', 'project-grid');
    button.setAttribute('aria-pressed', 'false');
    button.textContent = filter.label;
    filterBar.append(button);
    return button;
  });
  validFilters.forEach(filter => {
    const option = document.createElement('option');
    option.value = filter.id;
    option.textContent = filter.label;
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
      ? 'projects · all industries'
      : `projects · ${label}`;
    count.setAttribute('aria-label', selected === 'all'
      ? 'Showing projects from all industries'
      : `Showing projects in ${label}`);
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

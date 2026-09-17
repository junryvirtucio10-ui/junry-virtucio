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
  const matchesFilter = (filter, project) => {
    if (filter.id === 'all') return true;
    const sourceFilters = filter.filters || [filter.id];
    return sourceFilters.some(sourceFilter => project.filters.includes(sourceFilter));
  };
  const validFilters = configuredFilters.filter(filter => filter.id === 'all' || projects.some(project => matchesFilter(filter, project)));
  const requestedFilter = new URL(location.href).searchParams.get('filter') || 'all';
  // Older links used the original, more granular industry IDs. Resolve them to
  // their new client-type group so shared links keep showing relevant work.
  const resolveFilter = filter => {
    if (validFilters.some(item => item.id === filter)) return filter;
    return validFilters.find(item => item.filters?.includes(filter) || item.aliases?.includes(filter))?.id || 'all';
  };
  const initialFilter = resolveFilter(requestedFilter);
  const initialFilterConfig = validFilters.find(item => item.id === initialFilter);
  const initialPriorityIndex = initialFilter === 'all' ? 0 : projects.findIndex(project => matchesFilter(initialFilterConfig, project));

  const makeProjectCard = (project, index) => {
    const article = document.createElement('article');
    article.className = 'archive-project';
    article.dataset.filters = project.filters.join(' ');
    article.hidden = initialFilter !== 'all' && !matchesFilter(initialFilterConfig, project);

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

    const sizes = '(max-width: 760px) 90vw, (max-width: 1100px) 45vw, (min-width: 1631px) 474px, 29vw';
    const mountImage = (prioritize = false) => {
      if (media.dataset.imageMounted === 'true') return;
      const picture = document.createElement('picture');
      picture.className = 'responsive-picture';
      const source = document.createElement('source');
      source.type = 'image/avif';
      source.sizes = sizes;
      source.srcset = project.thumbnail.avifSrcset;
      picture.append(source);

      const image = document.createElement('img');
      image.width = project.thumbnail.width;
      image.height = project.thumbnail.height;
      image.loading = prioritize ? 'eager' : 'lazy';
      if (prioritize) image.fetchPriority = 'high';
      image.decoding = 'async';
      image.alt = project.imageAlt;
      image.sizes = sizes;
      image.srcset = project.thumbnail.srcset;
      image.src = project.thumbnail.src;
      picture.append(image);
      media.prepend(picture);
      media.dataset.imageMounted = 'true';
    };

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
    if (!article.hidden) mountImage(index === initialPriorityIndex);
    return { element: article, mountImage };
  };

  const cards = projects.map((project, index) => {
    const card = makeProjectCard(project, index);
    grid.append(card.element);
    return { ...card, project };
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
    const selected = resolveFilter(filter);
    const selectedFilter = validFilters.find(item => item.id === selected);
    let visible = 0;
    cards.forEach(({ element, mountImage, project }) => {
      const show = matchesFilter(selectedFilter, project);
      if (show) mountImage(visible === 0);
      element.hidden = !show;
      if (show) visible += 1;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    mobileFilter.value = selected;
    const label = validFilters.find(item => item.id === selected)?.label || 'All';
    const projectLabel = visible === 1 ? 'project' : 'projects';
    count.textContent = selected === 'all'
      ? `${visible} ${projectLabel} · all client types`
      : `${visible} ${projectLabel} · ${label}`;
    count.setAttribute('aria-label', selected === 'all'
      ? `Showing ${visible} ${projectLabel} across all client types`
      : `Showing ${visible} ${projectLabel} in ${label}`);
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
  applyFilter(initialFilter, false);
})();

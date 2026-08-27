(() => {
  const root = document.querySelector('#site-navigation-root');
  if (!root) return;

  const currentPage = document.body.dataset.page || 'home';
  const onHomepage = currentPage === 'home';
  const sectionHref = id => onHomepage ? `#${id}` : `index.html#${id}`;
  const navigationItems = [
    { label: 'Work', href: sectionHref('work'), section: 'work', marker: '01' },
    { label: 'Projects', href: 'projects.html', page: 'projects', marker: '02' },
    { label: 'Services', href: sectionHref('services'), section: 'services', marker: '03' },
    { label: 'Process', href: sectionHref('process'), section: 'process', marker: '04' },
    { label: 'About', href: sectionHref('about'), section: 'about', marker: '05' },
    { label: 'Contact', href: sectionHref('contact'), section: 'contact', marker: '06' }
  ];
  const linkAttributes = item => {
    const active = item.page === currentPage;
    return `${item.section ? ` data-section="${item.section}"` : ''}${active ? ' class="active" aria-current="page"' : ''}`;
  };
  const desktopLinks = navigationItems.map(item => `<a class="nav-link${item.page === currentPage ? ' active' : ''}" href="${item.href}"${item.section ? ` data-section="${item.section}"` : ''}${item.page === currentPage ? ' aria-current="page"' : ''}>${item.label}</a>`).join('');
  const mobileLinks = navigationItems.map(item => `<a href="${item.href}"${linkAttributes(item)}>${item.label} <span>${item.marker}</span></a>`).join('');

  root.innerHTML = `
    <header class="site-nav" id="site-nav" data-od-id="floating-navigation">
      <a class="brand" href="${onHomepage ? '#top' : 'index.html'}" aria-label="Junry Virtucio, return to homepage" data-od-id="brand-mark">
        <img class="brand-logo" src="assets/jv-white-logo.png" width="1536" height="1024" alt=""><span class="brand-note">WEB DESIGN +<br>DEVELOPMENT</span>
      </a>
      <nav class="desktop-links" aria-label="Primary navigation">${desktopLinks}</nav>
      <a class="nav-action" href="${sectionHref('contact')}" data-od-id="nav-start-project">Start a project ↗</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-od-id="mobile-menu-toggle">Menu</button>
    </header>
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true" data-od-id="mobile-menu">
      <nav aria-label="Mobile navigation">${mobileLinks}</nav>
    </div>`;

  const nav = root.querySelector('#site-nav');
  const menuButton = root.querySelector('.menu-toggle');
  const mobileMenu = root.querySelector('#mobile-menu');
  const compactNav = matchMedia('(max-width: 1100px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let lastY = scrollY;

  const setMenu = (open, restoreFocus = true) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close' : 'Menu';
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
    if (open) mobileMenu.querySelector('a').focus();
    else if (restoreFocus && compactNav.matches) menuButton.focus({ preventScroll: true });
  };

  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  compactNav.addEventListener('change', event => {
    if (!event.matches && mobileMenu.classList.contains('open')) setMenu(false, false);
  });
  document.addEventListener('keydown', event => {
    if (!mobileMenu.classList.contains('open')) return;
    if (event.key === 'Escape') setMenu(false);
    if (event.key === 'Tab') {
      const links = [...mobileMenu.querySelectorAll('a')];
      const first = links[0];
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  root.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    if (mobileMenu.classList.contains('open')) setMenu(false, false);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    window.scrollTo({ top: target.offsetTop - 80, behavior: reduced.matches ? 'auto' : 'smooth' });
  }));

  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('is-hidden', y > lastY && y > 180 && !mobileMenu.classList.contains('open'));
    lastY = y;
  }, { passive: true });

  if (onHomepage) {
    const sectionLinks = [...root.querySelectorAll('.desktop-links [data-section]')];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link => link.classList.toggle('active', link.dataset.section === entry.target.id));
    }), { rootMargin: '-35% 0px -55%', threshold: 0 });
    sectionLinks.forEach(link => {
      const section = document.getElementById(link.dataset.section);
      if (section) observer.observe(section);
    });
  }
})();

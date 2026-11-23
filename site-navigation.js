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
  const savedTheme = (() => {
    try { return localStorage.getItem('junry-theme'); } catch { return null; }
  })();
  const initialTheme = savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = initialTheme;

  root.innerHTML = `
    <header class="site-nav" id="site-nav" data-od-id="floating-navigation">
      <a class="brand" href="${onHomepage ? '#top' : 'index.html'}" aria-label="Junry Virtucio, return to homepage" data-od-id="brand-mark">
        <img class="brand-logo" src="assets/optimized/jv-white-logo-198.webp" width="198" height="132" decoding="async" alt=""><span class="brand-note">WEB DESIGN +<br>DEVELOPMENT</span>
      </a>
      <nav class="desktop-links" aria-label="Primary navigation">${desktopLinks}</nav>
      <div class="nav-controls">
        <a class="nav-action" href="${sectionHref('contact')}" data-od-id="nav-start-project">Start a project ↗</a>
        <button class="theme-toggle" type="button" aria-label="Switch to dark theme" title="Switch to dark theme" data-od-id="theme-toggle"><span class="theme-toggle-icon" aria-hidden="true"></span><span class="theme-toggle-label">Dark theme</span></button>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-od-id="mobile-menu-toggle">Menu</button>
      </div>
    </header>
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true" data-od-id="mobile-menu">
      <nav aria-label="Mobile navigation">${mobileLinks}</nav>
    </div>`;

  const nav = root.querySelector('#site-nav');
  const menuButton = root.querySelector('.menu-toggle');
  const themeButton = root.querySelector('.theme-toggle');
  const mobileMenu = root.querySelector('#mobile-menu');
  const caseDialog = document.querySelector('#case-dialog');
  const compactNav = matchMedia('(max-width: 1100px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const stickyArchiveControls = document.querySelector('.archive-controls');
  const scrollDirectionThreshold = 10;
  let lastY = scrollY;

  const setTheme = theme => {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    themeButton.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    themeButton.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    themeButton.querySelector('.theme-toggle-label').textContent = `${isDark ? 'Light' : 'Dark'} theme`;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#171615' : '#faf7f0');
    try { localStorage.setItem('junry-theme', isDark ? 'dark' : 'light'); } catch { /* Storage may be unavailable. */ }
  };
  setTheme(initialTheme);
  themeButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    if (reduced.matches || typeof document.startViewTransition !== 'function') {
      setTheme(nextTheme);
      return;
    }

    const buttonRect = themeButton.getBoundingClientRect();
    document.documentElement.style.setProperty('--theme-x', `${buttonRect.left + buttonRect.width / 2}px`);
    document.documentElement.style.setProperty('--theme-y', `${buttonRect.top + buttonRect.height / 2}px`);
    const transition = document.startViewTransition(() => setTheme(nextTheme));
    transition.finished.finally(() => {
      document.documentElement.style.removeProperty('--theme-x');
      document.documentElement.style.removeProperty('--theme-y');
    });
  });

  const setNavHidden = hidden => {
    if (nav.classList.contains('is-hidden') === hidden) return;

    const previousControlsRect = stickyArchiveControls?.getBoundingClientRect();
    stickyArchiveControls?.getAnimations().forEach(animation => animation.cancel());
    nav.classList.toggle('is-hidden', hidden);
    document.body.classList.toggle('site-nav-hidden', hidden);

    if (!stickyArchiveControls || reduced.matches || !previousControlsRect || previousControlsRect.bottom <= 0 || previousControlsRect.top >= innerHeight) return;

    const nextControlsTop = stickyArchiveControls.getBoundingClientRect().top;
    const offset = previousControlsRect.top - nextControlsTop;
    if (Math.abs(offset) < 1) return;

    stickyArchiveControls.animate([
      { transform: `translate3d(0, ${offset}px, 0)` },
      { transform: 'translate3d(0, 0, 0)' }
    ], {
      duration: 460,
      easing: 'cubic-bezier(.22, .7, .15, 1)'
    });
  };

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

  const clampScroll = top => Math.max(0, Math.min(top, document.documentElement.scrollHeight - innerHeight));
  let anchorFrame = 0;
  let wheelFrame = 0;
  let wheelTarget = 0;
  let wheelPosition = 0;
  let previousWheelTime = 0;

  const cancelWheelScroll = () => {
    cancelAnimationFrame(wheelFrame);
    wheelFrame = 0;
  };
  const cancelAnchorScroll = () => {
    cancelAnimationFrame(anchorFrame);
    anchorFrame = 0;
  };

  const cancelScroll = () => {
    cancelAnchorScroll();
    cancelWheelScroll();
  };

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;

    if (mobileMenu.classList.contains('open')) setMenu(false, false);
    cancelScroll();
    if (reduced.matches) return;

    if (link.hash !== location.hash) {
      try {
        history.pushState(history.state, '', link.hash);
      } catch {
        return;
      }
    }
    event.preventDefault();
    target.focus({ preventScroll: true });

    const start = scrollY;
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop);
    const destination = () => clampScroll(scrollY + target.getBoundingClientRect().top - margin);
    const distance = Math.abs(destination() - start);
    if (distance < 1) return;

    const duration = Math.min(760, 420 + distance * .22);
    let elapsed = 0;
    let previousFrame;
    const step = now => {
      // Keep a dropped frame from skipping the end of the easing curve.
      elapsed += Math.min(now - (previousFrame ?? now), 34);
      previousFrame = now;
      const progress = Math.min(elapsed / duration, 1);
      const eased = (1 - Math.cos(Math.PI * progress)) / 2;
      const top = start + (destination() - start) * eased;
      window.scrollTo({ top, behavior: 'instant' });
      anchorFrame = progress < 1 ? requestAnimationFrame(step) : 0;
    };
    anchorFrame = requestAnimationFrame(step);
  });

  const stepWheel = now => {
    const elapsed = previousWheelTime ? Math.min(now - previousWheelTime, 34) : 16;
    previousWheelTime = now;
    wheelTarget = clampScroll(wheelTarget);
    wheelPosition += (wheelTarget - wheelPosition) * (1 - Math.exp(-elapsed / 58));
    const settled = Math.abs(wheelTarget - wheelPosition) < .75;
    window.scrollTo({ top: settled ? wheelTarget : wheelPosition, behavior: 'instant' });
    wheelFrame = settled ? 0 : requestAnimationFrame(stepWheel);
  };

  addEventListener('wheel', event => {
    cancelAnchorScroll();
    const { deltaMode, deltaX, deltaY, deltaZ } = event;
    // WheelEvent has no device type. Leave small or fractional pixel deltas to native scrolling.
    const fineDelta = deltaMode === WheelEvent.DOM_DELTA_PIXEL && (Math.abs(deltaY) < 40 || !Number.isInteger(deltaY));
    if (reduced.matches || event.defaultPrevented || !event.cancelable || !deltaY || deltaX || deltaZ || fineDelta ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
        caseDialog?.open || mobileMenu.classList.contains('open') ||
        event.target.closest?.('input, select, textarea, [contenteditable]')) {
      cancelWheelScroll();
      return;
    }

    const insideScrollable = event.composedPath().some(element =>
      element instanceof Element && element !== document.body && element !== document.scrollingElement &&
      element.scrollHeight > element.clientHeight && /^(auto|scroll|overlay)$/.test(getComputedStyle(element).overflowY)
    );
    if (insideScrollable) {
      cancelWheelScroll();
      return;
    }

    const units = deltaMode === WheelEvent.DOM_DELTA_LINE
      ? parseFloat(getComputedStyle(document.body).lineHeight)
      : deltaMode === WheelEvent.DOM_DELTA_PAGE ? innerHeight : 1;
    const delta = deltaY * units;
    const position = clampScroll(scrollY);
    // Discard outstanding travel when the wheel changes direction.
    const continuing = wheelFrame && Math.sign(wheelTarget - position) === Math.sign(delta);
    wheelTarget = clampScroll((continuing ? wheelTarget : position) + delta);
    if (wheelTarget === position) {
      cancelWheelScroll();
      return;
    }

    event.preventDefault();
    if (!wheelFrame) {
      wheelPosition = position;
      previousWheelTime = 0;
      wheelFrame = requestAnimationFrame(stepWheel);
    }
  }, { passive: false });

  addEventListener('touchstart', cancelScroll, { passive: true });
  addEventListener('popstate', cancelScroll);
  reduced.addEventListener('change', cancelScroll);
  document.addEventListener('keydown', event => {
    if ((anchorFrame || wheelFrame) && ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
      cancelScroll();
    }
  });

  addEventListener('scroll', () => {
    const y = scrollY;
    const distance = y - lastY;
    if (y <= 180) {
      setNavHidden(false);
      lastY = y;
      return;
    }
    if (Math.abs(distance) < scrollDirectionThreshold) return;
    setNavHidden(y > lastY && y > 180 && !mobileMenu.classList.contains('open'));
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

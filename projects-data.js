// Add new portfolio entries here. The archive page and homepage case-study copy
// both read from this catalog, so project details stay in one place.
window.JUNRY_PROJECT_FILTERS = Object.freeze([
  { id: 'all', label: 'All' },
  { id: 'legal-services', label: 'Legal services' },
  { id: 'construction', label: 'Construction' },
  { id: 'site-services', label: 'Site services' },
  { id: 'interior-design', label: 'Interior design' },
  { id: 'personal-brand', label: 'Personal brand' },
  { id: 'travel', label: 'Travel' },
  { id: 'venture-groups', label: 'Venture groups' }
]);

window.JUNRY_PROJECTS = Object.freeze([
  {
    id: 'idiart-law-group',
    name: 'Idiart Law Group',
    sector: 'Legal services',
    filters: ['legal-services'],
    services: ['WordPress', 'Divi 5', 'Responsive design', 'SEO', 'Technical QA'],
    summary: 'A responsive legal website implementation spanning practice-area, location, attorney, and conversion pages, with SEO foundations, form testing, mobile refinement, and launch QA.',
    image: 'assets/projects/idiartlaw_com_2026-08-25-06-21-59.webp',
    imageWidth: 1920,
    imageHeight: 7592,
    imageAlt: 'Idiart Law Group website homepage featuring its attorneys, practice areas, testimonials, and consultation information.',
    url: 'https://www.idiartlaw.com/'
  },
  {
    id: 'mt-grand-construction',
    name: 'MT Grand Construction',
    sector: 'Commercial construction',
    filters: ['construction'],
    services: ['Website design', 'WordPress', 'Service pages', 'Local pages', 'Responsive QA'],
    summary: 'A commercial construction website system that organizes services and location-focused content clearly for customers across Southwest Florida.',
    image: 'assets/projects/mtgrandconstruction_com_2026-08-25-06-22-19.webp',
    imageWidth: 1920,
    imageHeight: 6116,
    imageAlt: 'MT Grand Construction website homepage presenting commercial construction services, projects, and service areas.',
    url: 'https://mtgrandconstruction.com/'
  },
  {
    id: 'clark-gregory-design',
    name: 'Clark Gregory Design',
    sector: 'Interior design',
    filters: ['interior-design'],
    services: ['Website design', 'Responsive development', 'Service structure', 'Content refinement'],
    summary: 'A refined portfolio and lead-generation website bringing services, trusted brands, design philosophy, FAQs, and consultation paths into one cohesive experience.',
    image: 'assets/projects/clarkgregorydesign_com_2026-08-25-06-22-46.webp',
    imageWidth: 1920,
    imageHeight: 8084,
    imageAlt: 'Clark Gregory Design website homepage showing interior-design services and residential project imagery.',
    url: 'https://www.clarkgregorydesign.com/'
  },
  {
    id: 'direct-construction',
    name: 'Direct Construction',
    sector: 'Construction services',
    filters: ['construction'],
    services: ['Service website', 'Responsive development', 'Inquiry path design'],
    summary: 'A service-focused construction website that presents the company’s capabilities clearly and creates a direct path from relevant services to inquiry.',
    image: 'assets/projects/directconstructioninc_com_2026-08-25-06-21-39.webp',
    imageWidth: 1920,
    imageHeight: 5699,
    imageAlt: 'Direct Construction website homepage showing remodeling services, featured projects, process, and testimonials.',
    url: 'https://www.direct-construction.com/'
  },
  {
    id: 'damon-davis',
    name: 'Damon Davis',
    sector: 'Personal brand',
    filters: ['personal-brand'],
    services: ['Personal brand', 'Custom content', 'Responsive development'],
    summary: 'A polished personal-brand website combining business positioning, custom content sections, responsive design, and a clear presentation of the client’s work.',
    image: 'assets/projects/damondavis_com_2026-08-25-06-21-48.webp',
    imageWidth: 1920,
    imageHeight: 2356,
    imageAlt: 'Damon Davis website homepage presenting his businesses, books, music, podcast, and contact information.',
    url: 'https://damondavis.com/'
  },
  {
    id: 'mt-grand-homes',
    name: 'MT Grand Homes',
    sector: 'Custom home builder',
    filters: ['construction'],
    services: ['Website development', 'Responsive design', 'Service structure', 'Project showcase', 'Lead generation'],
    summary: 'A conversion-focused website for a Southwest Florida custom-home builder, bringing construction services, process, recent projects, reviews, service areas, and consultation paths into one clear experience.',
    image: 'assets/projects/mtgrandhomes_com_2026-08-27-02-24-36.webp',
    imageWidth: 1920,
    imageHeight: 6414,
    imageAlt: 'MT Grand Homes website homepage presenting custom-home construction, renovation services, recent projects, client reviews, and consultation information.',
    url: 'https://mtgrandhomes.com/'
  },
  {
    id: 'lucky-portables',
    name: 'Lucky Portables',
    sector: 'Portable site services',
    filters: ['site-services'],
    services: ['Website development', 'Responsive design', 'Rental options', 'Resource content', 'Quote form'],
    summary: 'A service-led rental website for South Florida projects and events, organizing portable-restroom options, customer types, pricing, delivery process, resources, and quote requests.',
    image: 'assets/projects/luckyportables_com_2026-08-27-02-29-09.webp',
    imageWidth: 1920,
    imageHeight: 8463,
    imageAlt: 'Lucky Portables website homepage featuring portable-restroom rentals, customer types, service benefits, rental options, resources, and a quote form.',
    url: '#'
  },
  {
    id: 'flyover-travel',
    name: 'FlyOver Travel',
    sector: 'Travel agency',
    filters: ['travel'],
    services: ['Website development', 'Responsive design', 'Service architecture', 'Team profiles', 'Lead generation'],
    summary: 'A content-rich website for a full-service travel agency, connecting custom trips, cruises, group travel, destination weddings, advisor profiles, educational media, reviews, and trip inquiries in one responsive experience.',
    image: 'assets/projects/flyovertravel_com_2026-09-04-04-26-40.webp',
    imageWidth: 1920,
    imageHeight: 9973,
    imageAlt: 'FlyOver Travel website homepage featuring travel services, destinations, advisor profiles, videos, articles, client reviews, and trip-planning resources.',
    url: 'https://flyovertravel.com/'
  },
  {
    id: 'davis-global-ventures-group',
    name: 'Davis Global Ventures Group',
    sector: 'Venture group',
    filters: ['venture-groups'],
    services: ['Website development', 'Responsive design', 'Brand portfolio', 'Content structure', 'Lead generation'],
    summary: 'A unified corporate website presenting a purpose-driven portfolio across media, wellness, leadership, and humanitarian work, supported by brand stories, impact metrics, testimonials, and clear contact paths.',
    image: 'assets/projects/davisglobalgroup_com_2026-09-04-04-27-00.webp',
    imageWidth: 1920,
    imageHeight: 6815,
    imageAlt: 'Davis Global Ventures Group website homepage presenting its portfolio of media, wellness, leadership, health-science, and humanitarian brands.',
    url: 'https://davisglobalgroup.com/'
  }
]);

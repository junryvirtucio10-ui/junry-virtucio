// Add new portfolio entries here. The archive page and homepage case-study copy
// both read from this catalog, so project details stay in one place.
window.JUNRY_PROJECT_FILTERS = Object.freeze([
  { id: 'all', label: 'All projects' },
  { id: 'legal-services', label: 'Legal services' },
  { id: 'construction', label: 'Construction' },
  { id: 'site-services', label: 'Site services' },
  { id: 'interior-design', label: 'Interior design' },
  { id: 'personal-brand', label: 'Personal brand' },
  { id: 'travel', label: 'Travel' },
  { id: 'venture-groups', label: 'Venture groups' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'workforce', label: 'Workforce' },
  { id: 'financial-services', label: 'Financial services' },
  { id: 'home-services', label: 'Home services' },
  { id: 'hospitality', label: 'Hospitality' }
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
  },
  {
    id: 'tradie',
    name: 'Tradie',
    sector: 'Trades business platform',
    filters: ['home-services'],
    services: ['Website development', 'Responsive design', 'Conversion landing page', 'Lead generation'],
    summary: 'A bold growth-focused website for UK trades professionals, combining a clear offer, social proof, media credibility, lead magnets, and a guarantee-led conversion path.',
    image: 'assets/projects/tradie.png',
    imageWidth: 1920,
    imageHeight: 4908,
    imageAlt: 'Tradie website homepage promoting business growth services, customer results, media coverage, downloads, and a money-back guarantee.',
    url: null
  },
  {
    id: 'newsom-eye',
    name: 'Newsom Eye',
    sector: 'Eye care practice',
    filters: ['healthcare'],
    services: ['Website development', 'Responsive design', 'Service architecture', 'Provider profiles', 'Location content'],
    summary: 'A comprehensive eye-care website organizing specialty treatments, physician profiles, surgery centers, patient portals, testimonials, FAQs, and five Florida locations.',
    image: 'assets/projects/newsom-eye.webp',
    imageWidth: 1440,
    imageHeight: 6769,
    imageAlt: 'Newsom Eye website homepage featuring eye-care services, physicians, surgery centers, patient portals, testimonials, locations, and FAQs.',
    url: 'https://newsomeye.com/'
  },
  {
    id: 'assistmynt',
    name: 'AssistMynt',
    sector: 'Virtual assistant services',
    filters: ['workforce'],
    services: ['Website development', 'Responsive design', 'Service presentation', 'Social proof', 'Lead capture'],
    summary: 'A streamlined service website explaining virtual-assistant matchmaking, quality assurance, flexible support, client outcomes, and a direct path to get started.',
    image: 'assets/projects/assistmynt.webp',
    imageWidth: 1440,
    imageHeight: 3290,
    imageAlt: 'AssistMynt website homepage presenting virtual-assistant services, benefits, client testimonials, and a contact form.',
    url: 'https://assistmynt.com/'
  },
  {
    id: 'alliance-care-medical',
    name: 'Alliance Care Medical Equipment',
    sector: 'Medical equipment',
    filters: ['healthcare', 'ecommerce'],
    services: ['E-commerce development', 'Responsive design', 'Rental catalog', 'Brand storytelling', 'Customer education'],
    summary: 'A medical-equipment website balancing rental and purchase categories with accreditation, company values, community content, and practical customer support information.',
    image: 'assets/projects/alliance-care-medical.webp',
    imageWidth: 1440,
    imageHeight: 4368,
    imageAlt: 'Alliance Care Medical Equipment website homepage presenting rentals, equipment categories, accreditation, company impact, and core values.',
    url: 'https://alliancecaremedical.com/'
  },
  {
    id: 'classe-credit-consulting',
    name: 'Classe Credit Consulting',
    sector: 'Credit consulting',
    filters: ['financial-services'],
    services: ['Website development', 'Responsive design', 'Conversion strategy', 'Results showcase', 'Lead generation'],
    summary: 'A results-led credit consulting website bringing service positioning, client outcomes, educational content, reviews, FAQs, and consultation calls to action into one focused journey.',
    image: 'assets/projects/classe-credit-consulting.webp',
    imageWidth: 1440,
    imageHeight: 4920,
    imageAlt: 'Classe Credit Consulting website homepage featuring credit-repair services, client results, reviews, FAQs, and consultation calls to action.',
    url: 'https://www.classecreditconsulting.com/'
  },
  {
    id: 'orbit-building-remodeling',
    name: 'Orbit Building and Remodeling',
    sector: 'Residential construction',
    filters: ['construction'],
    services: ['Website development', 'Responsive design', 'Service architecture', 'Quote form', 'Project showcase'],
    summary: 'A residential remodeling website pairing a detailed consultation form with service pathways, testimonials, project imagery, and answers to common homeowner questions.',
    image: 'assets/projects/orbit-building-remodeling.webp',
    imageWidth: 1440,
    imageHeight: 4690,
    imageAlt: 'Orbit Building and Remodeling website homepage showing renovation services, a consultation form, testimonials, FAQs, and project photos.',
    url: 'https://orbitbuildingandremodeling.com/'
  },
  {
    id: 'oyins-international',
    name: 'Oyins International',
    sector: 'Hospitality and resort',
    filters: ['hospitality'],
    services: ['Website development', 'Responsive design', 'Room presentation', 'Amenities showcase', 'Booking paths'],
    summary: 'A hospitality website introducing a resort destination through room categories, amenities, dining and entertainment venues, event spaces, and clear booking paths.',
    image: 'assets/projects/oyins-international.webp',
    imageWidth: 1440,
    imageHeight: 6544,
    imageAlt: 'Oyins International website homepage featuring resort amenities, room and suite categories, dining, entertainment venues, and booking information.',
    url: 'https://oyinsinternational.com/'
  },
  {
    id: 'thriving-gutters',
    name: 'Thriving Gutters',
    sector: 'Gutter services',
    filters: ['home-services'],
    services: ['Landing page', 'Responsive development', 'Direct-response design', 'Call conversion'],
    summary: 'A compact, call-first landing page for local gutter services, using a focused service menu, trust markers, and a prominent phone action to minimize friction.',
    image: 'assets/projects/thriving-gutters.webp',
    imageWidth: 1440,
    imageHeight: 727,
    imageAlt: 'Thriving Gutters landing page presenting gutter services, a prominent call button, trust badge, and service navigation.',
    url: 'https://thriving-gutters.com/'
  },
  {
    id: 'sail-with-seth',
    name: 'Sail with Seth',
    sector: 'Cruise travel',
    filters: ['travel'],
    services: ['Website development', 'Responsive design', 'Travel storytelling', 'Trip showcase', 'Lead generation'],
    summary: 'A warm travel website positioning a boutique cruise experience through destination imagery, hosted-group highlights, service promises, and direct trip-planning contact paths.',
    image: 'assets/projects/sail-with-seth.webp',
    imageWidth: 1440,
    imageHeight: 2382,
    imageAlt: 'Sail with Seth website homepage featuring cruise destinations, group travel experiences, service promises, and contact details.',
    url: 'https://sailwithseth.com/'
  },
  {
    id: 'buddy-bright',
    name: 'Buddy Bright',
    sector: 'Exterior cleaning',
    filters: ['home-services'],
    services: ['Website development', 'Responsive design', 'Local service pages', 'Review content', 'Lead generation'],
    summary: 'A friendly local-service website connecting roof cleaning and pressure washing with neighborhood trust, customer stories, FAQs, process guidance, service areas, and quote requests.',
    image: 'assets/projects/buddy-bright.webp',
    imageWidth: 1440,
    imageHeight: 7724,
    imageAlt: 'Buddy Bright website homepage featuring roof cleaning and pressure washing services, reviews, FAQs, process steps, and service areas.',
    url: 'https://callbuddybright.com/'
  },
  {
    id: 'amrocor',
    name: 'Amrocor',
    sector: 'Industrial e-commerce',
    filters: ['ecommerce'],
    services: ['E-commerce development', 'Responsive design', 'Product catalog', 'Category navigation', 'Quote requests'],
    summary: 'A large industrial storefront organizing electrical equipment, generators, transformers, lubricants, and related supplies through category-led discovery and quote-ready commerce.',
    image: 'assets/projects/amrocor.webp',
    imageWidth: 1440,
    imageHeight: 5369,
    imageAlt: 'Amrocor website homepage showing industrial supply categories, transformers, generators, lubricants, and top-selling products.',
    url: 'https://amrocor.com/'
  },
  {
    id: 'perfect-foto',
    name: 'Perfect Foto',
    sector: 'Custom products',
    filters: ['ecommerce'],
    services: ['E-commerce development', 'Responsive design', 'Collection architecture', 'Product merchandising', 'Customer reviews'],
    summary: 'A visual e-commerce catalog for personalized apparel, memorial products, photo gifts, and custom keepsakes, supported by collection navigation, product grids, and trust content.',
    image: 'assets/projects/perfect-foto.webp',
    imageWidth: 1440,
    imageHeight: 5461,
    imageAlt: 'Perfect Foto website homepage presenting personalized apparel, memorial products, photo gifts, product collections, and customer reviews.',
    url: 'https://www.perfectfotoinc.com/'
  },
  {
    id: 'premier-island-jobs',
    name: 'Premier Island Jobs',
    sector: 'Talent marketplace',
    filters: ['workforce'],
    services: ['Website development', 'Responsive design', 'Marketplace structure', 'Search experience', 'Employer education'],
    summary: 'A two-sided talent marketplace helping employers find Filipino virtual professionals while guiding jobseekers through profiles, resumes, opportunities, pricing, and hiring education.',
    image: 'assets/projects/premier-island-jobs.webp',
    imageWidth: 1440,
    imageHeight: 2554,
    imageAlt: 'Premier Island Jobs website homepage featuring talent and job search, skill categories, hiring guidance, pricing information, and registration paths.',
    url: 'https://premierislandjobs.com/'
  },
  {
    id: 'global-workforce',
    name: 'GlobalWorkforce',
    sector: 'International recruitment',
    filters: ['workforce'],
    services: ['Website development', 'Responsive design', 'Job listings', 'Regional content', 'Candidate conversion'],
    summary: 'An international recruitment website presenting verified placement services, countries served, job categories, current openings, legal guidance, and candidate registration.',
    image: 'assets/projects/global-workforce.webp',
    imageWidth: 1440,
    imageHeight: 2838,
    imageAlt: 'GlobalWorkforce website homepage presenting international recruitment services, countries served, job categories, openings, and application paths.',
    url: 'https://globallworkforce.com/'
  },
  {
    id: 'innovamed-industries',
    name: 'Innovamed Industries',
    sector: 'Medical supplies',
    filters: ['healthcare', 'ecommerce'],
    services: ['E-commerce development', 'Responsive design', 'Product catalog', 'Sales merchandising', 'Customer education'],
    summary: 'A medical-supplies storefront organizing categories, featured brands, product collections, promotions, ordering guidance, and educational content for customers and care providers.',
    image: 'assets/projects/innovamed-industries.webp',
    imageWidth: 1440,
    imageHeight: 5260,
    imageAlt: 'Innovamed Industries website homepage featuring medical supply categories, brands, products, promotions, ordering guidance, and educational content.',
    url: 'https://innovamedindustries.com/'
  },
  {
    id: 'zoe-wellness',
    name: 'Zoë Wellness Center',
    sector: 'Wellness services',
    filters: ['healthcare'],
    services: ['Website development', 'Responsive design', 'Service presentation', 'Results storytelling', 'Appointment conversion'],
    summary: 'A wellness website connecting natural weight-loss programs, coaching, products, spa services, client transformations, program steps, and location-based appointment paths.',
    image: 'assets/projects/zoe-wellness.webp',
    imageWidth: 1440,
    imageHeight: 3191,
    imageAlt: 'Zoë Wellness Center website homepage featuring weight-loss services, coaching, products, client results, program steps, and locations.',
    url: 'https://www.zoewellness.com/'
  }
].map(project => {
  const base = `assets/optimized/projects/${project.id}`;
  const cropWidth = project.imageHeight >= project.imageWidth * 3 / 4
    ? project.imageWidth
    : Math.floor(project.imageHeight * 4 / 3);
  const widths = [480, 800, 1200, 1600, 1920].filter(width => width <= cropWidth);
  const srcWidth = widths.includes(1200) ? 1200 : widths.at(-1);
  return {
    ...project,
    // Retain the original image metadata above for full-resolution use.
    thumbnail: {
      src: `${base}-${srcWidth}.webp`,
      width: srcWidth,
      height: srcWidth * 3 / 4,
      srcset: widths.map(width => `${base}-${width}.webp ${width}w`).join(', '),
      avifSrcset: widths.map(width => `${base}-${width}.avif ${width}w`).join(', ')
    }
  };
}));

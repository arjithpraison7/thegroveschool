// Everything the school is likely to update lives here: contact details, the admissions year and
// form link, timings and the menu. Change a value once and every page picks it up.

export const site = {
  name: 'The Grove School',
  foundation: 'The C.P. Ramaswami Aiyar Foundation',
  description:
    'The Grove School, Alwarpet, Chennai — an ICSE & ISC school founded in 1984 by The C.P. Ramaswami Aiyar Foundation. Small classes, excellent English, and an education that goes beyond the curriculum.',
  affiliation: 'Council for the Indian School Certificate Examinations (CISCE)',
  founded: 1984,
  inaugurated: 2004,

  principal: { name: 'Mrs. S.M. Sujatha', title: 'Principal' },
  address: {
    street: '1 Eldams Road',
    locality: 'Alwarpet',
    city: 'Chennai',
    postalCode: '600018',
    region: 'Tamil Nadu',
    country: 'IN',
  },
  phone: { display: '+91 44 4957 2820', href: 'tel:+914449572820' },
  mobile: { display: '+91 75500 09485', href: 'tel:+917550009485' },
  email: 'thegroveschool@gmail.com',

  admissions: {
    open: true,
    year: '2026–27',
    formUrl: 'https://form.123formbuilder.com/5430450',
  },

  magazine: {
    url: 'https://thegroveschoolmagazine.com/',
    archiveUrl: 'https://thegroveschoolmagazine.com/annual-magazine/',
  },

  map: {
    query: 'The Grove School, 1 Eldams Road, Alwarpet, Chennai 600018',
    // Where Google Maps places "Grove School" for that query (checked October 2026).
    latitude: 13.0381249,
    longitude: 80.2554072,
  },

  schoolTimings: [
    { label: 'Pre-KG & LKG', time: '9:00 AM – 12:00 noon' },
    { label: 'UKG', time: '9:00 AM – 1:50 PM' },
    { label: 'Classes I – XII', time: '8:50 AM – 3:30 PM' },
  ],
  officeTimings: [
    { label: 'Monday – Friday', time: '9:00 AM – 4:00 PM' },
    { label: 'Saturdays & vacations', time: '9:00 AM – 12:00 noon' },
  ],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.city} – ${site.address.postalCode}`;

const mapQuery = encodeURIComponent(site.map.query);
export const mapLinks = {
  open: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`,
  embed: `https://www.google.com/maps?q=${mapQuery}&output=embed`,
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const schoolLifeLinks = [
  { label: 'Arts & Culture', href: '/school-life/arts-culture/' },
  { label: 'Sports & Games', href: '/school-life/sports-games/' },
  { label: 'Annual Day', href: '/school-life/annual-day/' },
  { label: 'Exhibitions & Projects', href: '/school-life/exhibitions-projects/' },
  { label: 'Annual Project Day', href: '/school-life/annual-project-day/' },
  { label: 'Elections & Houses', href: '/school-life/elections-houses/' },
  { label: 'SUPW & Environment', href: '/school-life/supw-environment/' },
  { label: 'Children’s Theatre', href: '/school-life/childrens-theatre/' },
];

export const nav: NavItem[] = [
  { label: 'About', href: '/about/' },
  { label: 'Admissions', href: '/admissions/' },
  { label: 'School Life', href: '/school-life/', children: schoolLifeLinks },
  {
    label: 'Achievements',
    href: '/achievements/',
    children: [
      { label: 'Highlights & Achievements', href: '/achievements/' },
      { label: 'In the News', href: '/media/' },
    ],
  },
  { label: 'Magazine', href: '/magazine/' },
  { label: 'Contact', href: '/contact/' },
];

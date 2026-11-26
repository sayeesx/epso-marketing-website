export interface LocalBlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LocalBlogFaq {
  question: string;
  answer: string;
}

export interface LocalBlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  imageTitle: string;
  imageAlt: string;
  keywords: string[];
  quickAnswer: string;
  sections: LocalBlogSection[];
  faqs: LocalBlogFaq[];
}

export const localBlogPosts: LocalBlogPost[] = [
  {
    slug: 'about-epso-marketing-cherukulamba-malappuram-kerala',
    title: 'Inside Epso Marketing: Everyday Food and Home Care from Cherukulamba, Malappuram',
    seoTitle: 'Inside Epso Marketing | Cherukulamba, Malappuram, Kerala',
    description:
      'Learn about Epso and EPSO BAKERY & STATIONERY WHOLESALE in Cherukulamba, Malappuram district, Kerala, supplying everyday food and home care products.',
    excerpt:
      'How Epso and EPSO BAKERY & STATIONERY WHOLESALE in Cherukulamba, Malappuram serve Kerala households and retailers with everyday food and home care items.',
    publishedAt: '2026-11-10',
    updatedAt: '2026-11-26',
    author: 'Epso Editorial',
    category: 'Company & Brand',
    readTime: '4 min read',
    image: '/assets/banners/EPSO-Marketing-Truck-on-Globe.webp',
    imageTitle: 'Epso Marketing Delivery Truck Serving Kerala and India',
    imageAlt: 'Epso Marketing truck carrying everyday food and home care products from Cherukulamba, Malappuram',
    keywords: [
      'Epso',
      'Epso Marketing',
      'EPSO BAKERY & STATIONERY WHOLESALE',
      'Cherukulamba Malappuram',
      'Kerala FMCG brand',
      'Jabir T',
    ],
    quickAnswer:
      'Epso is an Indian FMCG brand supported by EPSO BAKERY & STATIONERY WHOLESALE, a wholesale and retail supplier in Cherukulamba, Malappuram district, Kerala, founded by Jabir T.',
    sections: [
      {
        heading: 'Built for everyday Indian homes',
        paragraphs: [
          'Families look for household items that are practical, consistent, and easy to pick up for daily routines. Epso was created around this simple need.',
          'From tea-time snacks in the kitchen to cleaning essentials used around the house, Epso focuses on two core categories that every home uses regularly: Food Products and Home Care.',
        ],
      },
      {
        heading: 'Rooted in Cherukulamba, Malappuram district, Kerala',
        paragraphs: [
          'EPSO BAKERY & STATIONERY WHOLESALE operates as a wholesale and retail supplier in Cherukulamba, Malappuram district, Kerala.',
          'Serving both individual household buyers and regional shopkeepers gives Epso direct feedback from families and local retailers across Malappuram and Kerala.',
        ],
        bullets: [
          'Direct wholesale and retail supply from Cherukulamba, Malappuram',
          'Food range featuring Kerala mixtures, snacks, and biscuits',
          'Home care range covering dishwashing liquids, floor cleaners, and household cleaning products',
          'Online marketplace availability on Amazon, Flipkart, and JioMart',
        ],
      },
      {
        heading: 'Leadership and community connection',
        paragraphs: [
          'Epso Marketing is founded by Jabir T, who is also an elected member of the Ponmala Grama Panchayat in Malappuram district.',
          'Being closely connected to local communities keeps the brand grounded in real household expectations rather than short-lived trends.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Where is EPSO BAKERY & STATIONERY WHOLESALE located?',
        answer:
          'EPSO BAKERY & STATIONERY WHOLESALE is located in Cherukulamba, Malappuram district, Kerala, and serves both wholesale and retail customers.',
      },
      {
        question: 'What types of products does Epso sell?',
        answer:
          'Epso offers food products such as Kerala mixtures, snacks, and biscuits, as well as home care products including dishwashing liquids, floor cleaners, and household cleaning items.',
      },
    ],
  },
  {
    slug: 'jabir-t-founder-epso-marketing-ponmala-grama-panchayat',
    title: 'Meet Jabir T: Founder of Epso Marketing and Ponmala Grama Panchayat Member',
    seoTitle: 'Jabir T | Founder of Epso Marketing & Ponmala Grama Panchayat',
    description:
      'Profile of Jabir T, founder of Epso Marketing in Malappuram, Kerala, and an elected member of the Ponmala Grama Panchayat.',
    excerpt:
      'Meet Jabir T, the founder behind Epso Marketing and an elected member of the Ponmala Grama Panchayat in Malappuram district, Kerala.',
    publishedAt: '2026-11-14',
    updatedAt: '2026-11-26',
    author: 'Epso Editorial',
    category: 'Leadership',
    readTime: '3 min read',
    image: '/jabir-t-founder-epso-marketing-ponmala-grama-panchayat.webp',
    imageTitle: 'Jabir T - Founder of Epso Marketing and Elected Member of Ponmala Grama Panchayat',
    imageAlt: 'Portrait of Jabir T, Founder of Epso Marketing and elected member of Ponmala Grama Panchayat',
    keywords: [
      'Jabir T',
      'Jabir T Ponmala Grama Panchayat',
      'Epso Marketing founder',
      'Ponmala Grama Panchayat',
      'Malappuram',
    ],
    quickAnswer:
      'Jabir T is the founder of Epso Marketing and an elected member of the Ponmala Grama Panchayat in Malappuram district, Kerala.',
    sections: [
      {
        heading: 'Local roots in Malappuram and Ponmala',
        paragraphs: [
          'Behind Epso Marketing is Jabir T, an entrepreneur from Malappuram district and an elected member of the Ponmala Grama Panchayat.',
          'Working closely with people in Ponmala and nearby Cherukulamba shaped his practical understanding of what local families and small shops need every day.',
        ],
      },
      {
        heading: 'Connecting wholesale supply with household trust',
        paragraphs: [
          'Through EPSO BAKERY & STATIONERY WHOLESALE in Cherukulamba, Jabir T built a dependable wholesale and retail supply network before expanding Epso products onto national online marketplaces.',
          'Today, customers can reach Epso locally in Malappuram or order online through Amazon, Flipkart, and JioMart.',
        ],
        bullets: [
          'Founder of Epso Marketing',
          'Elected Member, Ponmala Grama Panchayat',
          'Wholesale and retail distribution base in Cherukulamba, Malappuram district, Kerala',
        ],
      },
    ],
    faqs: [
      {
        question: 'Who is Jabir T?',
        answer:
          'Jabir T is the founder of Epso Marketing and an elected member of the Ponmala Grama Panchayat in Malappuram district, Kerala.',
      },
      {
        question: 'How can retailers connect with Epso Marketing for wholesale enquiries?',
        answer:
          'Retailers and wholesale buyers can reach Epso Marketing via the Contact page or by calling/WhatsApp at +91 98096 65188.',
      },
    ],
  },
  {
    slug: 'kerala-mixture-tea-time-snacks-epso-food-products',
    title: 'Kerala Mixture and Tea-Time Snacks: Storing Crisp Everyday Favourites',
    seoTitle: 'Kerala Mixture & Tea-Time Snacks Guide | Epso Food Products',
    description:
      'Practical tips on enjoying and storing Kerala mixtures, biscuits, and tea-time snacks in humid weather, from Epso Food Products.',
    excerpt:
      'Simple storage and serving tips to keep Kerala mixtures, snacks, and biscuits crisp and fresh for family tea-time.',
    publishedAt: '2026-11-18',
    updatedAt: '2026-11-26',
    author: 'Epso Editorial',
    category: 'Food Products',
    readTime: '4 min read',
    image: '/epso-food-products-kerala-mixture-snacks-biscuits.webp',
    imageTitle: 'Epso Food Products - Kerala Mixture, Snacks and Biscuits',
    imageAlt: 'Epso Food Products display showing Kerala mixtures, snacks, and biscuits',
    keywords: [
      'Epso food products',
      'Kerala mixture',
      'Kerala tea-time snacks',
      'Epso snacks and biscuits',
      'store Kerala mixture crisp',
    ],
    quickAnswer:
      'To keep Kerala mixtures and biscuits crisp in Kerala’s humid climate, transfer opened packs immediately into dry, airtight glass or food-grade steel containers away from stove steam.',
    sections: [
      {
        heading: 'Why Kerala tea-time snacks are an everyday staple',
        paragraphs: [
          'Across Kerala homes, evening tea is rarely served alone. Crisp Kerala mixture, savoury snacks, and light biscuits bring families and guests together.',
          'Epso Food Products focuses on these familiar everyday snacks so households and local bakeries always have reliable packs ready on the shelf.',
        ],
      },
      {
        heading: 'How to keep mixtures and biscuits crisp during monsoon months',
        paragraphs: [
          'Coastal and Malappuram humidity can soften crunchy snacks quickly once a packet is opened. A few simple kitchen habits help preserve texture for longer:',
        ],
        bullets: [
          'Move remaining mixture into a clean, completely dry airtight jar right after opening.',
          'Keep snack containers away from boiling kettles, pressure cookers, and sink moisture.',
          'Use a dry spoon instead of damp hands when serving.',
          'Seal biscuit packs with a tight clip or store in a separate container from spiced snacks so flavours do not mix.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What food items are part of Epso Food Products?',
        answer:
          'Epso Food Products includes everyday tea-time favourites such as Kerala mixtures, snacks, and biscuits.',
      },
      {
        question: 'How should opened Kerala mixture packets be stored?',
        answer:
          'Keep opened mixture in a dry, airtight container away from kitchen steam and direct sunlight to retain crispness.',
      },
    ],
  },
  {
    slug: 'choosing-dishwashing-liquid-and-floor-cleaner-indian-homes',
    title: 'Everyday Kitchen and Floor Care: Practical Cleaning Habits for Indian Homes',
    seoTitle: 'Dishwashing Liquid & Floor Cleaner Guide | Epso Home Care',
    description:
      'A practical guide to using dishwashing liquids, floor cleaners, and household cleaning products effectively in everyday Indian kitchens.',
    excerpt:
      'Simple, effective daily routines for grease-free utensils and clean floors using Epso Home Care products.',
    publishedAt: '2026-11-21',
    updatedAt: '2026-11-26',
    author: 'Epso Editorial',
    category: 'Home Care',
    readTime: '4 min read',
    image: '/epso-home-care-dishwash-floor-cleaner-products.webp',
    imageTitle: 'Epso Home Care - Dishwashing Liquid and Floor Cleaner Range',
    imageAlt: 'Epso Home Care bottles including dishwashing liquids and floor cleaners',
    keywords: [
      'Epso home care',
      'dishwashing liquid India',
      'floor cleaner Kerala',
      'household cleaning products Epso',
    ],
    quickAnswer:
      'Diluting dishwashing liquid in a small bowl of water instead of pouring directly onto dry scrubbers saves product, rinses cleaner, and cuts cooking oil effectively.',
    sections: [
      {
        heading: 'Getting more out of your dishwashing liquid',
        paragraphs: [
          'Indian cooking involves spices, coconut oil, and ghee that leave residue on stainless steel, cast iron, and non-stick cookware.',
          'Mixing a few drops of Epso dishwashing liquid in a bowl of water creates even suds for an entire sink of utensils without wasting liquid.',
        ],
        bullets: [
          'Scrape food bits off plates before soaking to keep the wash water clean.',
          'Wash lightly soiled glasses and cups first, then oily pans last.',
          'Rinse scrubbers thoroughly and let them air-dry after every wash.',
        ],
      },
      {
        heading: 'Keeping floors clean in busy households',
        paragraphs: [
          'Dust, monsoon footprints, and kitchen spills require regular mopping. Sweeping thoroughly before mopping prevents dirt from streaking across tiles or granite.',
          'Always measure floor cleaner according to bucket water volume, and store all cleaning bottles upright and out of reach of children and food shelves.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What products are included in Epso Home Care?',
        answer:
          'Epso Home Care includes dishwashing liquids, floor cleaners, and everyday household cleaning products.',
      },
      {
        question: 'How should household cleaning bottles be stored?',
        answer:
          'Store cleaning liquids tightly capped in a cool, dry utility area separate from food items and out of children’s reach.',
      },
    ],
  },
  {
    slug: 'where-to-buy-epso-products-wholesale-retail-online',
    title: 'Where to Buy Epso Products: Wholesale, Retail in Malappuram, and Online',
    seoTitle: 'Where to Buy Epso Products | Wholesale, Retail & Online',
    description:
      'Find out how to purchase Epso food and home care products online on Amazon, Flipkart, JioMart, or wholesale and retail in Cherukulamba, Malappuram.',
    excerpt:
      'All the ways households and retailers can buy Epso food and home care products online and in Malappuram, Kerala.',
    publishedAt: '2026-11-25',
    updatedAt: '2026-11-26',
    author: 'Epso Editorial',
    category: 'Shopping & Supply',
    readTime: '3 min read',
    image: '/epso-marketing-logo-cherukulamba-malappuram-kerala.png',
    imageTitle: 'Epso Marketing Official Logo - Wholesale and Retail Supplier',
    imageAlt: 'Epso Marketing logo for wholesale and retail supply in Cherukulamba, Malappuram, Kerala',
    keywords: [
      'buy Epso products',
      'Epso Amazon Flipkart JioMart',
      'EPSO BAKERY & STATIONERY WHOLESALE',
      'Epso wholesale Malappuram',
    ],
    quickAnswer:
      'You can buy Epso products online on Amazon, Flipkart, and JioMart, or directly for wholesale and retail from EPSO BAKERY & STATIONERY WHOLESALE in Cherukulamba, Malappuram, Kerala.',
    sections: [
      {
        heading: 'Ordering Epso products online across India',
        paragraphs: [
          'For home delivery across India, Epso products are listed on major online marketplaces including Amazon, Flipkart, and JioMart.',
          'Online availability makes it simple for customers outside Malappuram to reorder their favourite snacks and home care bottles conveniently.',
        ],
      },
      {
        heading: 'Wholesale and retail supply in Malappuram, Kerala',
        paragraphs: [
          'For bulk shop orders, local supermarkets, bakeries, and direct retail purchases in Malappuram district, EPSO BAKERY & STATIONERY WHOLESALE in Cherukulamba serves as the central supply hub.',
        ],
        bullets: [
          'Online marketplaces: Amazon, Flipkart, and JioMart',
          'Local hub: EPSO BAKERY & STATIONERY WHOLESALE, Cherukulamba, Malappuram district, Kerala',
          'Direct phone & WhatsApp enquiries: +91 98096 65188',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are Epso products available on Amazon, Flipkart, and JioMart?',
        answer:
          'Yes, Epso products are available online through Amazon, Flipkart, and JioMart.',
      },
      {
        question: 'Can shops order Epso products in wholesale quantities?',
        answer:
          'Yes. EPSO BAKERY & STATIONERY WHOLESALE in Cherukulamba, Malappuram district, Kerala handles wholesale and retail supply. Call or WhatsApp +91 98096 65188 for enquiries.',
      },
    ],
  },
];


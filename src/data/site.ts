// Content captured verbatim from https://storify-demo.neurolightstudio.com/en
// Images point at local copies downloaded into /public/images.

import type {
  Article,
  BrandLogo,
  CategoryItem,
  DealCard,
  FeatureTile,
  FeaturedDeal,
  FooterColumn,
  HeroSlide,
  NavLink,
  PromoTile,
  Vendor,
} from "@/types/storify";

/**
 * Canonical origin used to build shareable links. Deterministic on server and
 * client, so the share anchors hydrate without a mismatch.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://storify-clone.vercel.app";

export const announcement = "Free shipping on orders over $50";

export const announcementGradient =
  "linear-gradient(90deg, #48E4FF 0%, #5570FF 53%, #C053FF 100%)";

export const logo = "/images/logo-bc6d62.svg";

/** Sparkle icon inside the mobile search field ("AI search"). */
export const aiIcon = "/images/AI-Icon.png";

export const primaryNav: NavLink[] = [
  { label: "Products", href: "/en/products" },
  { label: "Brands", href: "/en/brands" },
];

export const utilityNav: NavLink[] = [
  { label: "Track Order", href: "/en/track-order" },
  { label: "Blog", href: "/en/blog" },
  { label: "Contact Us", href: "/en/contact" },
  { label: "Become a Vendor", href: "/en/become-vendor" },
];

export const categories: CategoryItem[] = [
  {
    label: "Accessories",
    href: "/en/categories/accessories",
    image: "/images/chatgpt-image-aug-29-2026-05-26-03-pm-16bd80.webp",
  },
  {
    label: "Appliances",
    href: "/en/categories/appliances",
    image: "/images/chatgpt-image-aug-20-2026-11-54-56-am-443411.webp",
  },
  {
    label: "Cameras & Smart Home",
    href: "/en/categories/cameras-smart-home",
    image: "/images/chatgpt-image-aug-19-2026-11-12-01-am-63ada5.webp",
  },
  {
    label: "Gaming",
    href: "/en/categories/gaming",
    image: "/images/chatgpt-image-aug-20-2026-12-43-23-pm-883ba8.webp",
  },
  {
    label: "Laptops. Tablets & PC",
    href: "/en/categories/laptops-tablets-pc",
    image: "/images/chatgpt-image-aug-19-2026-04-49-49-pm-7fdcfb.webp",
  },
  {
    label: "Mobile Phones",
    href: "/en/categories/mobile-phones",
    image: "/images/chatgpt-image-aug-28-2026-08-44-21-am-4a0483.webp",
  },
  {
    label: "PC Parts",
    href: "/en/categories/pc-parts",
    image: "/images/chatgpt-image-aug-19-2026-01-01-29-pm-bab208.webp",
  },
  {
    label: "TV & Audio",
    href: "/en/categories/tv-audio",
    image: "/images/chatgpt-image-aug-19-2026-09-56-38-pm-79b664.webp",
  },
  {
    label: "Wearable Technology",
    href: "/en/categories/wearable-technology",
    image: "/images/chatgpt-image-aug-20-2026-12-27-56-pm-b2a892.webp",
  },
];

export const heroSlides: HeroSlide[] = [
  {
    title: "Go All in on\nBig Screen Action",
    cta: "Shop Now",
    href: "/en/products",
    image: "/images/image-862-073b06.webp",
    background:
      "linear-gradient(0deg, rgb(229, 228, 231) 0%, rgb(222, 223, 233) 100%)",
  },
  {
    title: "iPad Mini",
    subtitle: "with A17 or A18 chips",
    cta: "Shop Now",
    href: "/en/products",
    image: "/images/ipads-8e4de5.webp",
    background: "rgb(241, 241, 241)",
  },
];

/**
 * The promo tiles were captured linking to /en/collections/iphones,
 * /apple-watches and /laptops — slugs that 404 on the target itself. They are
 * retargeted here to the real destinations: the iPhone Lineup and Smart Watches
 * collections, and the Laptops. Tablets & PC category (no laptops collection
 * exists).
 */
export const heroPromos: PromoTile[] = [
  {
    title: "iPhones",
    cta: "Buy Now",
    href: "/en/collections/iphone-lineup",
    image: "/images/image-326-c82604.webp",
    background:
      "linear-gradient(225deg, rgb(243, 243, 243) 0%, rgb(227, 230, 232) 100%)",
  },
  {
    title: "Apple Watches",
    cta: "Buy Now",
    href: "/en/collections/smart-watches",
    image: "/images/rectangle-236-0d771e.webp",
    background:
      "linear-gradient(180deg, rgb(200, 228, 255) 0%, rgb(236, 255, 152) 100%)",
  },
];

export const brands: BrandLogo[] = [
  { name: "Anker", image: "/images/anker-9579-c39919.webp" },
  { name: "Apple", image: "/images/apple-6176-b3717a.webp" },
  { name: "Google", image: "/images/google-4283-89cd28.webp" },
  { name: "Intel", image: "/images/intel-01-1053-7be61f.webp" },
  { name: "Samsung", image: "/images/samsung-4680-509500.webp" },
  { name: "Sony", image: "/images/sony-3098-c3e091.webp" },
  { name: "Xioami", image: "/images/xiaomi-1934-49986e.webp" },
];

export const featureTiles: FeatureTile[] = [
  { area: "a", image: "/images/tile-tall-1.png", alt: "vivo X100 Pro", href: "/en/products" },
  { area: "b", image: "/images/tile-small-1.png", alt: "10% OFF!", href: "/en/products" },
  {
    area: "c",
    image: "/images/tile-small-2.png",
    alt: "Nomad Tech Collection",
    href: "/en/products",
  },
  {
    area: "d",
    image: "/images/group-249-378203.webp",
    alt: "15% OFF! Power Bank",
    href: "/en/products",
  },
  { area: "e", image: "/images/group-526-5c31f5.webp", alt: "Power Bank", href: "/en/products" },
];

export const topSellingTabs = ["Featured", "New Arrivals", "On Sale"] as const;

/** Product slugs shown under each Top Selling tab, in order, as served by the site. */
export const topSellingBySlug: Record<string, string[]> = {
  Featured: [
    "sony-playstation-portal-remote-player-for-ps5-console",
    "ipad-mini-7",
    "xiaomi-pad-8-pro",
    "galaxy-s25-5g",
    "apple-watch-ultra-2-with-ocean-band-gps-cellular",
    "oneplus-15r-5g",
    "macbook-pro-m5-14-inch-24gb1tb-10-core-cpu-10-core-gpu",
    "intel-core-ultra-9-285k-arrow-lake-processor",
  ],
  "New Arrivals": [
    "sony-playstation-portal-remote-player-for-ps5-console",
    "powercolor-red-devil-amd-radeon-rx-9070-xt-16gb-gddr6-graphics-card",
    "beats-solo-4-wireless-headphones",
    "skullcandy-slyr-wired-overear-gaming-headphone",
    "amazon-echo-dot-max-smart-speaker",
    "anker-soundcore-liberty-5-anc-tws-earbuds",
    "google-pixel-watch",
    "galaxy-watch9",
  ],
  "On Sale": [
    "dji-air-3s-fly-more-combo-with-dji-rc-2-remote-controller",
    "xiaomi-pad-8-pro",
    "lenovo-legion-go-gaming-handhelds",
    "dell-pro-15-essential-pv15255-ryzen-5-7520u-amd-radeon-graphics-156-fhd-laptop",
    "oneplus-15r-5g",
    "anker-soundcore-space-q45-noise-cancelling-headphones",
    "poco-f8-ultra-5g",
    "iphone-15",
  ],
};

/** "Today's Featured Deals" — countdown target measured from the live page. */
export const deal = {
  kicker: "Today's Featured",
  title: "Deals",
  offBadge: "Up to 17% off",
  endsLabel: "Ends in",
  /** Days/Hours/Mins/Secs remaining when the page was captured. */
  endsInSeconds: 10 * 86400 + 21 * 3600 + 40 * 60 + 27,
  viewAll: "View All Deals",
  href: "/en/deals",
  background: "linear-gradient(180deg, #181c75 0%, #512c75 100%)",
};

export const featuredDeal: FeaturedDeal = {
  category: "Accessories",
  title: "DJI Air 3S Fly More Combo With DJI RC 2 Remote Controller",
  href: "/en/products/dji-air-3s-fly-more-combo-with-dji-rc-2-remote-controller",
  image: "/images/chatgpt-image-aug-31-2026-02-09-42-pm-2-e654b8.webp",
  gallery: [
    "/images/chatgpt-image-aug-31-2026-02-09-42-pm-2-e654b8.webp",
    "/images/chatgpt-image-aug-31-2026-02-09-42-pm-4-8333ba.webp",
    "/images/chatgpt-image-aug-31-2026-02-09-42-pm-5-711487.webp",
    "/images/chatgpt-image-aug-31-2026-02-09-42-pm-3-27d9f2.webp",
  ],
  price: "$1,660.00",
  oldPrice: "$1,700.00",
  discount: "-2%",
  save: "You save $40.00",
};

export const dealCards: DealCard[] = [
  {
    title: "Xiaomi Pad 8 Pro",
    href: "/en/products/xiaomi-pad-8-pro",
    image: "/images/chatgpt-image-aug-31-2026-06-54-05-pm-1-7fc558.webp",
    price: "$850.00",
    oldPrice: "$900.00",
    discount: "-6%",
  },
  {
    title: "Lenovo Legion Go Gaming Handhelds",
    href: "/en/products/lenovo-legion-go-gaming-handhelds",
    image: "/images/chatgpt-image-aug-30-2026-05-58-25-pm-1-396795.webp",
    price: "$900.00",
    oldPrice: "$1,000.00",
    discount: "-10%",
  },
  {
    title:
      'Dell Pro 15 Essential PV15255 Ryzen 5 7520U AMD Radeon Graphics 15.6" FHD Laptop',
    href: "/en/products/dell-pro-15-essential-pv15255-ryzen-5-7520u-amd-radeon-graphics-156-fhd-laptop",
    image: "/images/chatgpt-image-aug-30-2026-04-53-59-pm-4-310652.webp",
    price: "$600.00",
    oldPrice: "$700.00",
    discount: "-14%",
  },
  {
    title: "OnePlus 15R - 5G",
    href: "/en/products/oneplus-15r-5g",
    image: "/images/chatgpt-image-aug-30-2026-12-12-02-pm-1-71c1d3.webp",
    price: "$750.00",
    oldPrice: "$900.00",
    discount: "-17%",
  },
];

export const collectionsHeading = "Top Collections";

export const collectionRows: {
  promo: PromoTile;
  slugs: string[];
}[] = [
  {
    promo: {
      title: "iPhones",
      cta: "Buy Now",
      href: "/en/collections/iphone-lineup",
      image: "/images/image-326-c82604.webp",
      background:
        "linear-gradient(225deg, rgb(243, 243, 243) 0%, rgb(227, 230, 232) 100%)",
    },
    slugs: ["iphone-17", "iphone-16-pro-max", "iphone-17-pro-max", "ipad-air-m4-2026"],
  },
  {
    promo: {
      title: "Apple Watches",
      cta: "Buy Now",
      href: "/en/collections/smart-watches",
      image: "/images/rectangle-236-0d771e.webp",
      background:
        "linear-gradient(180deg, rgb(200, 228, 255) 0%, rgb(236, 255, 152) 100%)",
    },
    slugs: [
      "galaxy-watch9",
      "huawei-watch-fit-2-active",
      "apple-watch-ultra-2-with-ocean-band-gps-cellular",
      "cmf-by-nothing-watch-pro-2-bt-calling-smart-watch",
    ],
  },
  {
    promo: {
      // The artwork already carries the "Laptops / Shop Now" lockup, so this
      // tile renders image-only on the live page.
      title: "",
      cta: "",
      href: "/en/categories/laptops-tablets-pc",
      image: "/images/frame-694-a279f5.webp",
      background: "transparent",
      textClassName: "text-white",
    },
    slugs: [
      "acer-nitro-lite-nl-16-71g-578s-intel-i5-13420h-nvidia-rtx-3050-with-6gb-graphics-16-gaming-laptop",
      "macbook-pro-m5-14-inch-24gb1tb-10-core-cpu-10-core-gpu",
      "hp-victus-15-fa2104tx-intel-core-i7-13620h-nvidia-geforce-rtx-4050-with-6gb-graphics-156-fhd-gaming",
      "macbook-air-m5-15-inch",
    ],
  },
];

export const wideBanner = {
  title: "MacBook Pro",
  body: "Market-specific assortments balancing contemporary styling, comfort, durability.",
  cta: "Shop Now",
  href: "/en/products",
  image: "/images/onpaste-20260905-185602-f3f083.webp",
  background:
    "linear-gradient(90deg, rgb(28, 36, 55) 0%, rgb(32, 39, 57) 28%, rgb(58, 77, 125) 100%)",
};

export const explorerHeading = "Find your favorite products.";

export const explorerFilters = [
  "All Items",
  "Accessories",
  "Appliances",
  "Cameras & Smart Home",
  "Gaming",
  "Google",
  "Iphone",
  "Laptops. Tablets & PC",
];

export const coupon = {
  title: "Get 15% off",
  subtitle: "Use coupon code at checkout · Ends Nov 25",
  code: "TECH15",
  copyLabel: "Copy code",
  cta: "Shop Now",
  href: "/en/products",
  image: "/images/chatgpt-image-aug-30-2026-02-22-29-pm-5c6322.webp",
};

export const vendorsHeading = "Top Vendors";

export const vendors: Vendor[] = [
  {
    name: "Pixel Forge Computing",
    href: "/en/vendors/pixel-forge-computing",
    description:
      "Pixel Forge Computing provides laptops, desktop components, gaming accessories and reliable computing equipment for work and entertainment.",
    cover: "/images/banner-ce6783.webp",
    logo: "/images/logo-04c399.webp",
    rating: "5.0",
    sold: "1",
    priceTier: "$$$",
  },
  {
    name: "Smart Haven Electronics",
    href: "/en/vendors/smart-haven-electronics",
    description:
      "Smart Haven Electronics brings practical smart-home devices, wearable technology and entertainment electronics together in one convenient store.",
    cover: "/images/banner-c45661.webp",
    logo: "/images/logo-f8e685.webp",
    rating: "0.0",
    sold: "0",
    priceTier: "$$$",
  },
  {
    name: "Sonic Circuit Audio",
    href: "/en/vendors/sonic-circuit-audio",
    description:
      "Sonic Circuit Audio supplies quality headphones, speakers, microphones and home audio equipment for music, gaming and professional use.",
    cover: "/images/banner-bc0ca8.webp",
    logo: "/images/logo-00e5dc.webp",
    rating: "0.0",
    sold: "0",
    priceTier: "$$$",
  },
  {
    name: "Nova Mobile Hub",
    href: "/en/vendors/nova-mobile-hub",
    description:
      "Nova Mobile Hub offers the latest smartphones, tablets, mobile accessories and dependable charging solutions from popular technology brands.",
    cover: "/images/banner-84de0d.webp",
    logo: "/images/profile-358e53.webp",
    rating: "0.0",
    sold: "0",
    priceTier: "$",
  },
];

export const becomeVendor = {
  title: "Start Selling With Us Today",
  body: "Join our marketplace, manage products easily, accept secure payments, and grow your business faster.",
  cta: "Become a Vendor",
  href: "/en/become-vendor",
  image: "/images/group-424-99cdae.webp",
};

export const articlesHeading = "Top Articles";
export const articlesCta = "All Articles";

export const articles: Article[] = [
  {
    title: "Essential Gadgets for Your Home Office",
    href: "/en/blog/essential-gadgets-for-your-home-office",
    image: "/images/chatgpt-image-aug-30-2026-06-40-28-pm-fe169d.webp",
    excerpt:
      "Discover must-have gadgets that boost productivity and comfort in your home office, from ergonomic accessories to smart devices for any remote worker.",
    author: "Vendrix Admin",
    avatar: null,
    date: "Aug 30, 2026",
  },
  {
    title: "Electronics Accessories You Should Own",
    href: "/en/blog/electronics-accessories-you-should-own",
    image: "/images/chatgpt-image-aug-30-2026-06-10-33-pm-8722aa.webp",
    excerpt:
      "Discover must-have electronics accessories that enhance your tech experience, from chargers to protective cases.",
    author: "Vendrix Admin",
    avatar: null,
    date: "Aug 30, 2026",
  },
  {
    title: "Best Smartphones to Buy in 2026",
    href: "/en/blog/best-smartphones-to-buy-in-2026",
    image: "/images/chatgpt-image-aug-30-2026-04-45-55-pm-f25b9d.webp",
    excerpt:
      "Discover the top smartphones to buy in 2026, featuring the latest tech innovations and ideal choices for every shopper's needs.",
    author: "Vendrix Admin",
    avatar: null,
    date: "Aug 30, 2026",
  },
  {
    title: "Power Banks for Every Device",
    href: "/en/blog/power-banks-for-every-device",
    image: "/images/chatgpt-image-aug-30-2026-02-22-29-pm-5c6322.webp",
    excerpt:
      "Your essential smartphone accessory for reliable, on-the-go charging. Keep your devices powered anytime, anywhere.",
    author: "Admin User",
    avatar: null,
    date: "Aug 27, 2026",
  },
  {
    title: "Choose the Perfect Phone Case",
    href: "/en/blog/choose-the-perfect-phone-case",
    image: "/images/blog-3-fc1589.webp",
    excerpt:
      "Discover stylish, protective phone cases that safeguard your smartphone while showcasing your personal style. Shop now for durability!",
    author: "Admin User",
    avatar: null,
    date: "Aug 27, 2026",
  },
  {
    title: "Must-Have Accessories",
    href: "/en/blog/must-have-accessories",
    image: "/images/blog-1-41ca17.webp",
    excerpt:
      "Discover essential smartphone accessories that elevate your device, from stylish cases to powerful chargers and more.",
    author: "Admin User",
    avatar: null,
    date: "Aug 27, 2026",
  },
];

export const footerTagline = "Multi-vendor E-commerce Platform";

export const footerContact = {
  title: "Contact",
  phone: "+1 555-0100",
  email: "support@vendrix.com",
  address: "123 Main Street, New York, NY 10001",
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Products",
    links: [
      { label: "Products", href: "/en/products" },
      { label: "Categories", href: "/en/categories" },
      { label: "Brands", href: "/en/brands" },
      { label: "Collections", href: "/en/collections" },
      { label: "New Arrivals", href: "/en/products?sort=new" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Track Order", href: "/en/track-order" },
      { label: "FAQ", href: "/en/faq" },
      { label: "Returns", href: "/en/returns" },
      { label: "Contact", href: "/en/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/en/blog" },
      { label: "Careers", href: "/en/careers" },
      { label: "Become a Vendor", href: "/en/become-vendor" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/en/terms" },
      { label: "Privacy Policy", href: "/en/privacy" },
      { label: "Cookie Policy", href: "/en/cookies" },
      { label: "Accessibility", href: "/en/accessibility" },
    ],
  },
];

export const copyright = "© 2026 Vendrix. All rights reserved.";

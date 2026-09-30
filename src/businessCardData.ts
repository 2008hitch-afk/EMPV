export type BusinessPerson = "enrico" | "michele";

export type BusinessCardProfile = {
  slug: BusinessPerson;
  name: string;
  role: string;
  description: string;
  photo: string;
  vcard: string;
  qr: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  x: string;
  website: string;
  url: string;
};

export const businessCards: Record<BusinessPerson, BusinessCardProfile> = {
  enrico: {
    slug: "enrico",
    name: "Enrico Peruffo",
    role: "AI Systems & Architecture",
    description: "Architetture AI, automazioni, modelli locali e integrazioni tra sistemi.",
    photo: "team/enrico-peruffo.webp",
    vcard: "contacts/enrico-peruffo.vcf",
    qr: "qr/enrico.svg",
    email: "E.peruffo@empv.it",
    phone: "+39 379 243 8705",
    whatsapp: "https://wa.me/393792438705",
    linkedin: "https://www.linkedin.com/company/emp26/posts/?viewAsMember=true",
    x: "https://x.com/EMPV26",
    website: "https://empv.it",
    url: "https://empv.it/enrico/",
  },
  michele: {
    slug: "michele",
    name: "Michele Valleri",
    role: "AI Product & Process Design",
    description: "Prodotti AI, processi e workflow progettati intorno alle attività operative.",
    photo: "team/michele-valleri.webp",
    vcard: "contacts/michele-valleri.vcf",
    qr: "qr/michele.svg",
    email: "M.valleri@empv.it",
    phone: "+39 379 243 8705",
    whatsapp: "https://wa.me/393792438705",
    linkedin: "https://www.linkedin.com/company/emp26/posts/?viewAsMember=true",
    x: "https://x.com/EMPV26",
    website: "https://empv.it",
    url: "https://empv.it/michele/",
  },
};

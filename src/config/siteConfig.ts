import { seo } from "@/config/seo";

/** Brand-neutral content defaults for frontend components. */
export const siteConfig = {
  name: seo.name,
  description: seo.description,
  hero: {
    tagline: "A starting point for your next project.",
    title: "Build something great.",
    description: seo.description,
  },
  developer: {
    name: seo.developer.name,
    url: seo.developer.url,
  },
  socials: seo.socials,
};

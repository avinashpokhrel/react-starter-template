import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { seo } from "./src/config/seo";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!,
  );

function staticSeoPlugin(siteUrl: string): Plugin {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "");
  const canonical = `${normalizedSiteUrl}/`;
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: seo.name,
      url: normalizedSiteUrl,
      description: seo.description,
      developer: {
        "@type": "Person",
        name: seo.developer.name,
        url: seo.developer.url,
      },
      sameAs: seo.socials,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: seo.name,
      url: normalizedSiteUrl,
      description: seo.description,
      inLanguage: seo.language,
    },
  ];

  return {
    name: "static-seo-output",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        const head = [
          `<title>${escapeHtml(seo.title)}</title>`,
          `<meta name="description" content="${escapeHtml(seo.description)}">`,
          `<meta name="keywords" content="${escapeHtml(seo.keywords.join(", "))}">`,
          `<meta name="robots" content="index, follow, max-image-preview:large">`,
          `<link rel="canonical" href="${escapeHtml(canonical)}">`,
          `<meta property="og:type" content="website">`,
          `<meta property="og:site_name" content="${escapeHtml(seo.name)}">`,
          `<meta property="og:title" content="${escapeHtml(seo.title)}">`,
          `<meta property="og:description" content="${escapeHtml(seo.description)}">`,
          `<meta property="og:url" content="${escapeHtml(canonical)}">`,
          `<meta name="twitter:card" content="summary_large_image">`,
          `<meta name="twitter:title" content="${escapeHtml(seo.title)}">`,
          `<meta name="twitter:description" content="${escapeHtml(seo.description)}">`,
          `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`,
        ].join("\n    ");
        return html.replace("</head>", `    ${head}\n  </head>`);
      },
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\nSitemap: ${normalizedSiteUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(canonical)}</loc></url></urlset>`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, "VITE_");
  const siteUrl = env.VITE_SITE_URL || seo.siteUrl;

  return {
    plugins: [react(), tailwindcss(), staticSeoPlugin(siteUrl)],
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "src"),
        "@assets": path.resolve(rootDir, "src/assets"),
      },
    },
  };
});

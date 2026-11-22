import { siteConfig } from "@/config/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 px-6 py-6 text-center text-sm text-slate-500">
      <p>© {new Date().getFullYear()} {siteConfig.name}</p>
      <p className="mt-2">
        Website Developed by{" "}
        <a
          className="font-medium text-slate-700 underline underline-offset-4 transition-colors hover:text-slate-950"
          href={siteConfig.developer.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {siteConfig.developer.name}
        </a>
      </p>
    </footer>
  );
}

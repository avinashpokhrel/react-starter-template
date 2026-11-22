import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        <Link className="text-lg font-semibold" to="/">
          Your Brand
        </Link>
        <Link className="text-sm text-slate-600 hover:text-slate-900" to="/">
          Home
        </Link>
      </nav>
    </header>
  );
}

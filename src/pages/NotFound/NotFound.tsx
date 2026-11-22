import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-start justify-center px-6 py-20">
      <p className="text-sm font-medium text-slate-500">404</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 text-slate-600">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        className="mt-6 font-medium text-slate-900 underline underline-offset-4"
        to="/"
      >
        Return home
      </Link>
    </section>
  );
}

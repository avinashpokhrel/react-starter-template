import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound/NotFound";

export const routes = [
  { path: "/", component: Home },
  { path: "*", component: NotFound },
] as const;

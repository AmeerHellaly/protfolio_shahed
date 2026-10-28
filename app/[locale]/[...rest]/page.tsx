import { notFound } from "next/navigation";

// the layout sets dynamicParams = false; without this the URL 404s before reaching notFound()
// and Next shows its default page instead of ours
export const dynamicParams = true;

// any unknown URL under a locale (e.g. /en/nope) renders [locale]/not-found.tsx
export default function CatchAll() {
  notFound();
}

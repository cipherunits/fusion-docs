import { notFound } from 'next/navigation';

/** Catch unknown routes under a locale so `[lang]/not-found` can render. */
export default function CatchAllPage() {
  notFound();
}

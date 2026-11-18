import { ExternalLink } from 'lucide-react';
import { referenceById } from '../content';
import { Badge } from './ui/Badge';

export function RefList({ ids, title = 'Evidence base' }: { ids: string[]; title?: string }) {
  const refs = ids.map((id) => referenceById[id]).filter(Boolean);
  if (!refs.length) return null;
  return (
    <section aria-label={title}>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
      <ol className="space-y-2">
        {refs.map((r, i) => (
          <li key={r.id} className="flex gap-3 text-sm">
            <span className="w-5 shrink-0 text-right text-muted-foreground tabular">{i + 1}.</span>
            <div className="min-w-0">
              <a href={r.url} target="_blank" rel="noreferrer" className="leading-snug hover:text-primary hover:underline">
                {r.citation}
                <ExternalLink className="ml-1 inline h-3 w-3 align-baseline" aria-hidden />
              </a>
              <div className="mt-1">
                <Badge variant="secondary" className="capitalize">
                  {r.kind}
                </Badge>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

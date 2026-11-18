import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FlaskConical } from 'lucide-react';
import { interactives, moduleById } from '../content';
import useAppStore from '../store';
import { HUE } from '../lib/moduleStyle';
import { NotFound, PageHeader } from '../components/PageHeader';
import { Card, CardContent } from '../components/ui/Card';
import { cn } from '../lib/utils';

const LABS: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  'acid-base-simulator': lazy(() => import('../interactives/AcidBaseLab')),
  'electrolyte-dynamics': lazy(() => import('../interactives/ElectrolyteLab')),
  'sodium-correction': lazy(() => import('../interactives/SodiumPlanner')),
  'renal-handling': lazy(() => import('../interactives/KidneyLab')),
  'creatinine-kinetics': lazy(() => import('../interactives/CreatinineKinetics')),
  'hepatic-pattern': lazy(() => import('../interactives/LiverLab')),
  'endocrine-axes': lazy(() => import('../interactives/EndocrineAxes')),
  'analyzer-error': lazy(() => import('../interactives/SpecimenLab')),
  'qc-westgard': lazy(() => import('../interactives/QCTrainer')),
};

export function InteractivesList() {
  const labs = useAppStore((s) => s.progress.labs);
  return (
    <div>
      <PageHeader
        title="Interactive labs"
        subtitle="Simulators built on the same equations clinicians and laboratories use — every output is computed, and impossible combinations are prevented by the physiology itself."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {interactives.map((lab) => {
          const m = moduleById[lab.moduleId];
          return (
            <Link key={lab.id} to={`/interactives/${lab.id}`} className="group">
              <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-3 pt-5">
                  <div className="flex items-center gap-3">
                    <span className={cn('flex h-10 w-10 items-center justify-center rounded-lg', HUE[m.hue].soft)}>
                      <FlaskConical className={cn('h-5 w-5', HUE[m.hue].text)} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold leading-tight">{lab.title}</h2>
                      <p className="text-xs text-muted-foreground">{m.short}</p>
                    </div>
                    {labs[lab.id] && <CheckCircle2 className="h-4 w-4 text-success" aria-label="Opened" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{lab.summary}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {lab.skills.map((s) => (
                      <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-[0.7rem]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Launch <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function InteractiveRoute() {
  const { labId } = useParams();
  const Lab = labId ? LABS[labId] : undefined;
  if (!Lab) return <NotFound what="Lab" back="/interactives" />;
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading lab…</div>}>
      <Lab />
    </Suspense>
  );
}

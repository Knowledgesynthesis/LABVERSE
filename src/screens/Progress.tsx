import { Link } from 'react-router-dom';
import { BookOpen, BrainCircuit, Flame, FlaskConical, Stethoscope } from 'lucide-react';
import { cases, interactives, lessons, moduleById, modules, questions } from '../content';
import useAppStore, { BOX_INTERVAL_DAYS } from '../store';
import { moduleMastery, streak } from '../lib/mastery';
import { HUE, MODULE_ICON } from '../lib/moduleStyle';
import { PageHeader } from '../components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { cn } from '../lib/utils';

export function Progress() {
  const progress = useAppStore((s) => s.progress);
  const qStats = Object.values(progress.questions);
  const boxes = [0, 1, 2, 3, 4, 5].map((b) => qStats.filter((s) => s.box === b).length);
  const stats = [
    { icon: BookOpen, label: 'Lessons', value: `${Object.keys(progress.lessons).length}/${lessons.length}` },
    { icon: BrainCircuit, label: 'Questions seen', value: `${qStats.length}/${questions.length}` },
    { icon: Stethoscope, label: 'Cases solved', value: `${Object.keys(progress.cases).length}/${cases.length}` },
    { icon: FlaskConical, label: 'Labs opened', value: `${Object.keys(progress.labs).length}/${interactives.length}` },
    { icon: Flame, label: 'Day streak', value: String(streak(progress.activeDays)) },
  ];
  const sessions = [...progress.sessions].reverse().slice(0, 8);

  return (
    <div className="space-y-6">
      <PageHeader title="Progress" subtitle="Mastery combines lessons completed, the latest result on each question and case scores. Stored only in this browser." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {stats.map(({ icon: Icon, label, value }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <Icon className="mb-2 h-5 w-5 text-primary" />
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-xl font-bold tabular">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mastery by module</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {modules.map((m) => {
            const mm = moduleMastery(m, progress);
            const Icon = MODULE_ICON[m.id];
            return (
              <Link key={m.id} to={`/modules/${m.id}`} className="block">
                <div className="mb-1.5 flex items-center gap-2 text-sm">
                  <Icon className={cn('h-4 w-4', HUE[m.hue].text)} />
                  <span className="font-medium">{m.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{mm.level}</span>
                  <span className="w-10 text-right font-semibold tabular">{mm.mastery}%</span>
                </div>
                <ProgressBar value={mm.mastery} barClass={HUE[m.hue].solid} label={`${m.title} mastery`} />
              </Link>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Memory strength (Leitner boxes)</CardTitle>
          </CardHeader>
          <CardContent>
            {qStats.length === 0 ? (
              <p className="text-sm text-muted-foreground">Answer questions in lessons or practice to populate this.</p>
            ) : (
              <div className="flex h-40 items-end gap-2">
                {boxes.map((n, b) => (
                  <div key={b} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-xs font-semibold tabular">{n}</span>
                    <div
                      className={cn('w-full rounded-t', b === 0 ? 'bg-destructive/70' : 'bg-primary')}
                      style={{ height: `${Math.max(4, (120 * n) / Math.max(...boxes, 1))}px`, opacity: b === 0 ? 1 : 0.35 + b * 0.13 }}
                    />
                    <span className="text-[0.65rem] text-muted-foreground">{b === 0 ? 'Due' : `${BOX_INTERVAL_DAYS[b]}d`}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No quiz sessions yet.</p>
            ) : (
              <ul className="divide-y text-sm">
                {sessions.map((s) => (
                  <li key={s.id} className="flex items-center justify-between py-2">
                    <span>
                      {s.moduleId ? moduleById[s.moduleId].short : s.mode === 'review' ? 'Spaced review' : s.mode === 'weak' ? 'Weak spots' : 'Mixed exam'}
                      <span className="ml-2 text-xs text-muted-foreground">{new Date(s.at).toLocaleDateString()}</span>
                    </span>
                    <span className={cn('font-semibold tabular', s.score / s.total >= 0.8 ? 'text-success' : s.score / s.total >= 0.6 ? 'text-warning' : 'text-destructive')}>
                      {s.score}/{s.total}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

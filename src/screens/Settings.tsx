import { useRef, useState } from 'react';
import { Download, RotateCcw, Upload } from 'lucide-react';
import useAppStore from '../store';
import type { AppSettings, Progress } from '../types';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { cn } from '../lib/utils';

function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; label: string }) {
  return (
    <div className="inline-flex rounded-md border p-0.5" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn('rounded px-3 py-1.5 text-sm font-medium', value === o.value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Row({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b py-4 last:border-b-0">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
      {children}
    </div>
  );
}

export function Settings() {
  const { settings, updateSettings, progress, resetProgress, importProgress } = useAppStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ app: 'labverse', version: 2, exportedAt: new Date().toISOString(), progress }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `labverse-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const onImport = async (f: File) => {
    try {
      const data = JSON.parse(await f.text()) as { app?: string; progress?: Progress };
      if (data.app !== 'labverse' || !data.progress) throw new Error('Not a LabVerse export');
      importProgress(data.progress);
      setMsg('Progress imported.');
    } catch (e) {
      setMsg(`Import failed: ${(e as Error).message}`);
    }
  };

  return (
    <div className="max-w-3xl">
      <PageHeader title="Settings" subtitle="Everything is stored locally in this browser. No account, no tracking." />
      <Card className="mb-5">
        <CardHeader>
          <CardTitle className="text-base">Display</CardTitle>
        </CardHeader>
        <CardContent>
          <Row title="Theme" text="Follow your system or choose one.">
            <Segmented<AppSettings['theme']>
              label="Theme"
              value={settings.theme}
              onChange={(v) => updateSettings({ theme: v })}
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System' },
              ]}
            />
          </Row>
          <Row title="Text size" text="Scales all text and spacing.">
            <Segmented<AppSettings['textSize']>
              label="Text size"
              value={settings.textSize}
              onChange={(v) => updateSettings({ textSize: v })}
              options={[
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' },
              ]}
            />
          </Row>
          <Row title="Reduce motion" text="Turns off animations and transitions.">
            <Segmented<'on' | 'off'>
              label="Reduce motion"
              value={settings.reduceMotion ? 'on' : 'off'}
              onChange={(v) => updateSettings({ reduceMotion: v === 'on' })}
              options={[
                { value: 'off', label: 'Off' },
                { value: 'on', label: 'On' },
              ]}
            />
          </Row>
          <Row title="Units in cases" text="Show case results in conventional (US) or SI units.">
            <Segmented<AppSettings['units']>
              label="Units"
              value={settings.units}
              onChange={(v) => updateSettings({ units: v })}
              options={[
                { value: 'conventional', label: 'Conventional' },
                { value: 'si', label: 'SI' },
              ]}
            />
          </Row>
        </CardContent>
      </Card>

      <Card className="mb-5">
        <CardHeader>
          <CardTitle className="text-base">Your data</CardTitle>
          <CardDescription>Move progress between devices with a file, or start over.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="h-4 w-4" /> Export progress
          </Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            <Upload className="h-4 w-4" /> Import progress
          </Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])} />
          <Button
            variant="destructive"
            onClick={() => {
              if (window.confirm('Erase all progress on this device? This cannot be undone.')) {
                resetProgress();
                setMsg('Progress reset.');
              }
            }}
          >
            <RotateCcw className="h-4 w-4" /> Reset progress
          </Button>
          {msg && <p className="w-full text-sm text-muted-foreground" role="status">{msg}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            LabVerse teaches clinical chemistry as one connected system for students, residents, fellows and laboratory professionals. Content was
            reviewed against current guidelines in November 2026; see the Evidence Library for sources.
          </p>
          <p>Works offline after the first visit. Install it from your browser menu to use it like an app.</p>
        </CardContent>
      </Card>
    </div>
  );
}

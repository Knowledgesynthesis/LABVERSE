import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import useAppStore from '../store';
import { useTheme } from '../components/ThemeProvider';

export function Settings() {
  const { settings, updateSettings } = useAppStore();
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ] as const;

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ] as const;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-lg text-muted-foreground">
          Customize your learning experience
        </p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how LabVerse looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3">Theme</h4>
            <div className="flex gap-2">
              {themes.map((t) => (
                <Button
                  key={t.value}
                  variant={theme === t.value ? 'default' : 'outline'}
                  onClick={() => setTheme(t.value)}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Font Size</h4>
            <div className="flex gap-2">
              {fontSizes.map((size) => (
                <Button
                  key={size.value}
                  variant={settings.fontSize === size.value ? 'default' : 'outline'}
                  onClick={() => updateSettings({ fontSize: size.value })}
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>Options to improve accessibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">High Contrast</h4>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility
              </p>
            </div>
            <Button
              variant={settings.highContrast ? 'default' : 'outline'}
              onClick={() =>
                updateSettings({ highContrast: !settings.highContrast })
              }
            >
              {settings.highContrast ? 'On' : 'Off'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Reduce Motion</h4>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions
              </p>
            </div>
            <Button
              variant={settings.reduceMotion ? 'default' : 'outline'}
              onClick={() =>
                updateSettings({ reduceMotion: !settings.reduceMotion })
              }
            >
              {settings.reduceMotion ? 'On' : 'Off'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Application</CardTitle>
          <CardDescription>General app settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Offline Mode</h4>
              <p className="text-sm text-muted-foreground">
                Enable offline access to content
              </p>
            </div>
            <Button
              variant={settings.offlineMode ? 'default' : 'outline'}
              onClick={() =>
                updateSettings({ offlineMode: !settings.offlineMode })
              }
            >
              {settings.offlineMode ? 'On' : 'Off'}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Receive learning reminders and updates
              </p>
            </div>
            <Button
              variant={settings.notificationsEnabled ? 'default' : 'outline'}
              onClick={() =>
                updateSettings({
                  notificationsEnabled: !settings.notificationsEnabled,
                })
              }
            >
              {settings.notificationsEnabled ? 'On' : 'Off'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About LabVerse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Version</span>
            <Badge variant="outline">1.0.0</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Build</span>
            <Badge variant="outline">Production</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            LabVerse is an interactive clinical chemistry education platform designed
            for medical students, residents, fellows, and clinical pathologists.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { FlaskConical, RotateCcw, Info } from 'lucide-react';

// Electrolyte Dynamics Playground
export function ElectrolyteDynamics() {
  const [values, setValues] = useState({
    sodium: 140,
    potassium: 4.0,
    chloride: 102,
    bicarbonate: 24,
    glucose: 90,
    bun: 14,
    albumin: 4.0,
  });

  const handleChange = (key: string, value: number) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const resetValues = () => {
    setValues({
      sodium: 140,
      potassium: 4.0,
      chloride: 102,
      bicarbonate: 24,
      glucose: 90,
      bun: 14,
      albumin: 4.0,
    });
  };

  // Calculations
  const anionGap = values.sodium - (values.chloride + values.bicarbonate);
  const correctedAnionGap = anionGap + 2.5 * (4.0 - values.albumin);
  const osmolarity = 2 * values.sodium + values.glucose / 18 + values.bun / 2.8;

  const parameters = [
    {
      key: 'sodium',
      label: 'Sodium (Na⁺)',
      unit: 'mEq/L',
      min: 110,
      max: 170,
      step: 1,
      normal: { min: 135, max: 145 },
    },
    {
      key: 'potassium',
      label: 'Potassium (K⁺)',
      unit: 'mEq/L',
      min: 2.0,
      max: 7.0,
      step: 0.1,
      normal: { min: 3.5, max: 5.0 },
    },
    {
      key: 'chloride',
      label: 'Chloride (Cl⁻)',
      unit: 'mEq/L',
      min: 70,
      max: 130,
      step: 1,
      normal: { min: 96, max: 106 },
    },
    {
      key: 'bicarbonate',
      label: 'Bicarbonate (HCO₃⁻)',
      unit: 'mEq/L',
      min: 5,
      max: 40,
      step: 1,
      normal: { min: 22, max: 28 },
    },
    {
      key: 'glucose',
      label: 'Glucose',
      unit: 'mg/dL',
      min: 40,
      max: 600,
      step: 5,
      normal: { min: 70, max: 100 },
    },
    {
      key: 'bun',
      label: 'BUN',
      unit: 'mg/dL',
      min: 5,
      max: 100,
      step: 1,
      normal: { min: 7, max: 20 },
    },
    {
      key: 'albumin',
      label: 'Albumin',
      unit: 'g/dL',
      min: 1.5,
      max: 5.5,
      step: 0.1,
      normal: { min: 3.5, max: 5.0 },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Electrolyte Dynamics Playground</h1>
          <p className="text-lg text-muted-foreground">
            Adjust electrolyte values and observe the effects on calculated parameters
          </p>
        </div>
        <Button variant="outline" onClick={resetValues} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
              <CardDescription>
                Adjust the sliders to modify electrolyte values
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {parameters.map((param) => {
                const currentValue = values[param.key as keyof typeof values];
                const isAbnormal =
                  currentValue < param.normal.min || currentValue > param.normal.max;

                return (
                  <div key={param.key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">{param.label}</label>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            isAbnormal ? 'text-red-500' : 'text-green-500'
                          }`}
                        >
                          {currentValue.toFixed(param.step < 1 ? 1 : 0)} {param.unit}
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={currentValue}
                      onChange={(e) =>
                        handleChange(param.key, parseFloat(e.target.value))
                      }
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {param.min} {param.unit}
                      </span>
                      <span>
                        Normal: {param.normal.min}-{param.normal.max}
                      </span>
                      <span>
                        {param.max} {param.unit}
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Calculated Outputs */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calculated Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">Anion Gap</h4>
                <p className="text-2xl font-bold">
                  {anionGap.toFixed(1)} <span className="text-sm font-normal">mEq/L</span>
                </p>
                <p className="text-xs text-muted-foreground">Normal: 8-12 mEq/L</p>
                <div className="mt-2">
                  <Badge
                    variant={anionGap >= 8 && anionGap <= 12 ? 'default' : 'destructive'}
                  >
                    {anionGap >= 8 && anionGap <= 12 ? 'Normal' : 'Abnormal'}
                  </Badge>
                </div>
              </div>

              <div className="border-t pt-4 space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Corrected Anion Gap
                </h4>
                <p className="text-2xl font-bold">
                  {correctedAnionGap.toFixed(1)}{' '}
                  <span className="text-sm font-normal">mEq/L</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Adjusted for albumin {values.albumin.toFixed(1)} g/dL
                </p>
              </div>

              <div className="border-t pt-4 space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Serum Osmolarity
                </h4>
                <p className="text-2xl font-bold">
                  {osmolarity.toFixed(1)}{' '}
                  <span className="text-sm font-normal">mOsm/kg</span>
                </p>
                <p className="text-xs text-muted-foreground">Normal: 275-295 mOsm/kg</p>
                <div className="mt-2">
                  <Badge
                    variant={
                      osmolarity >= 275 && osmolarity <= 295 ? 'default' : 'destructive'
                    }
                  >
                    {osmolarity >= 275 && osmolarity <= 295 ? 'Normal' : 'Abnormal'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-500/10 border-blue-500/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <CardTitle className="text-sm">Learning Point</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                The anion gap is calculated as: Na⁺ - (Cl⁻ + HCO₃⁻). It represents
                unmeasured anions and helps classify metabolic acidosis.
              </p>
              <p className="mt-2">
                Albumin correction: AG(corrected) = AG + 2.5 × (4.0 - albumin)
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preset Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Preset Scenarios</CardTitle>
          <CardDescription>Try these common clinical scenarios</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() =>
              setValues({
                sodium: 132,
                potassium: 5.2,
                chloride: 98,
                bicarbonate: 8,
                glucose: 520,
                bun: 28,
                albumin: 4.0,
              })
            }
          >
            Diabetic Ketoacidosis
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setValues({
                sodium: 118,
                potassium: 3.8,
                chloride: 85,
                bicarbonate: 24,
                glucose: 90,
                bun: 12,
                albumin: 4.0,
              })
            }
          >
            Hyponatremia (SIADH)
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setValues({
                sodium: 138,
                potassium: 5.8,
                chloride: 110,
                bicarbonate: 16,
                glucose: 95,
                bun: 18,
                albumin: 4.0,
              })
            }
          >
            Normal AG Acidosis
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Interactives List
export function InteractivesList() {
  const interactives = [
    {
      id: 'electrolyte-dynamics',
      title: 'Electrolyte Dynamics Playground',
      description:
        'Adjust Na, K, Cl, HCO₃, and observe effects on anion gap and osmolarity',
      path: '/interactives/electrolyte-dynamics',
      category: 'Electrolytes',
    },
    {
      id: 'acid-base-simulator',
      title: 'Acid-Base Simulator',
      description: 'Explore respiratory and metabolic acid-base disorders',
      path: '#',
      category: 'Acid-Base',
      comingSoon: true,
    },
    {
      id: 'renal-handling',
      title: 'Renal Handling Model',
      description: 'Visualize GFR, RPF, and electrolyte handling in the nephron',
      path: '#',
      category: 'Renal',
      comingSoon: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FlaskConical className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Interactive Simulations</h1>
          <p className="text-lg text-muted-foreground">
            Hands-on learning tools to explore clinical chemistry concepts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interactives.map((interactive) => (
          <Card
            key={interactive.id}
            className="transition-all hover:shadow-lg hover:border-primary/50"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{interactive.title}</CardTitle>
                {interactive.comingSoon && (
                  <Badge variant="secondary">Coming Soon</Badge>
                )}
              </div>
              <CardDescription>{interactive.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{interactive.category}</Badge>
                {!interactive.comingSoon && (
                  <Link to={interactive.path}>
                    <Button size="sm">Launch</Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

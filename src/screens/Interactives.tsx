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

// Acid-Base Simulator
export function AcidBaseSimulator() {
  const [values, setValues] = useState({
    ph: 7.40,
    paco2: 40,
    hco3: 24,
  });

  const handleChange = (key: string, value: number) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const resetValues = () => {
    setValues({ ph: 7.40, paco2: 40, hco3: 24 });
  };

  // Determine primary disorder
  const isAcidemic = values.ph < 7.35;
  const isAlkalemic = values.ph > 7.45;

  let primaryDisorder = 'Normal';
  let compensation = 'N/A';
  let isCompensated = false;

  if (isAcidemic) {
    if (values.paco2 > 45) {
      primaryDisorder = 'Respiratory Acidosis';
      // Acute: HCO3 increases 1 per 10 increase in CO2
      // Chronic: HCO3 increases 3.5 per 10 increase in CO2
      const expectedAcute = 24 + (values.paco2 - 40) * 0.1;
      const expectedChronic = 24 + (values.paco2 - 40) * 0.35;
      compensation = values.hco3 >= expectedAcute - 2 && values.hco3 <= expectedChronic + 2 ? 'Appropriate' : 'Inappropriate';
    } else if (values.hco3 < 22) {
      primaryDisorder = 'Metabolic Acidosis';
      // Winter's formula: Expected PaCO2 = 1.5 × HCO3 + 8 (±2)
      const expectedPaCO2 = 1.5 * values.hco3 + 8;
      compensation = Math.abs(values.paco2 - expectedPaCO2) <= 2 ? 'Appropriate' : 'Inappropriate';
    }
  } else if (isAlkalemic) {
    if (values.paco2 < 35) {
      primaryDisorder = 'Respiratory Alkalosis';
      // Acute: HCO3 decreases 2 per 10 decrease in CO2
      // Chronic: HCO3 decreases 5 per 10 decrease in CO2
      const expectedAcute = 24 - (40 - values.paco2) * 0.2;
      const expectedChronic = 24 - (40 - values.paco2) * 0.5;
      compensation = values.hco3 >= expectedChronic - 2 && values.hco3 <= expectedAcute + 2 ? 'Appropriate' : 'Inappropriate';
    } else if (values.hco3 > 26) {
      primaryDisorder = 'Metabolic Alkalosis';
      // Expected PaCO2 increase: 0.7 per 1 increase in HCO3
      const expectedPaCO2 = 40 + 0.7 * (values.hco3 - 24);
      compensation = Math.abs(values.paco2 - expectedPaCO2) <= 2 ? 'Appropriate' : 'Inappropriate';
    }
  }

  isCompensated = values.ph >= 7.35 && values.ph <= 7.45 && primaryDisorder !== 'Normal';

  const parameters = [
    {
      key: 'ph',
      label: 'Arterial pH',
      unit: '',
      min: 6.80,
      max: 7.80,
      step: 0.01,
      normal: { min: 7.35, max: 7.45 },
    },
    {
      key: 'paco2',
      label: 'PaCO₂',
      unit: 'mmHg',
      min: 15,
      max: 80,
      step: 1,
      normal: { min: 35, max: 45 },
    },
    {
      key: 'hco3',
      label: 'HCO₃⁻',
      unit: 'mEq/L',
      min: 5,
      max: 45,
      step: 1,
      normal: { min: 22, max: 28 },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Acid-Base Simulator</h1>
          <p className="text-lg text-muted-foreground">
            Explore acid-base disorders and compensation mechanisms
          </p>
        </div>
        <Button variant="outline" onClick={resetValues} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Gas Parameters</CardTitle>
              <CardDescription>Adjust pH, PaCO₂, and HCO₃⁻ values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {parameters.map((param) => {
                const currentValue = values[param.key as keyof typeof values];
                const isAbnormal = currentValue < param.normal.min || currentValue > param.normal.max;

                return (
                  <div key={param.key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">{param.label}</label>
                      <span className={`text-sm font-semibold ${isAbnormal ? 'text-red-500' : 'text-green-500'}`}>
                        {currentValue.toFixed(param.step < 1 ? 2 : 0)} {param.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={currentValue}
                      onChange={(e) => handleChange(param.key, parseFloat(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{param.min} {param.unit}</span>
                      <span>Normal: {param.normal.min}-{param.normal.max}</span>
                      <span>{param.max} {param.unit}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">pH Status</h4>
                <p className="text-2xl font-bold">{values.ph.toFixed(2)}</p>
                <Badge variant={isAcidemic ? 'destructive' : isAlkalemic ? 'destructive' : 'default'}>
                  {isAcidemic ? 'Acidemia' : isAlkalemic ? 'Alkalemia' : 'Normal'}
                </Badge>
              </div>

              <div className="border-t pt-4 space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">Primary Disorder</h4>
                <p className="text-lg font-semibold text-primary">{primaryDisorder}</p>
              </div>

              {primaryDisorder !== 'Normal' && (
                <div className="border-t pt-4 space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Compensation</h4>
                  <p className="text-base">{compensation}</p>
                  {isCompensated && <Badge variant="default">Compensated</Badge>}
                  {!isCompensated && compensation === 'Inappropriate' && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Consider mixed disorder
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10 border-purple-500/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <CardTitle className="text-sm">Key Formulas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>Winter's Formula:</strong> Expected PaCO₂ = 1.5 × HCO₃⁻ + 8 (±2)</p>
              <p><strong>Metabolic Alkalosis:</strong> ΔPaCO₂ = 0.7 × ΔHCO₃⁻</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preset Scenarios</CardTitle>
          <CardDescription>Common acid-base disorders</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Button variant="outline" onClick={() => setValues({ ph: 7.28, paco2: 60, hco3: 27 })}>
            Acute Resp. Acidosis
          </Button>
          <Button variant="outline" onClick={() => setValues({ ph: 7.38, paco2: 60, hco3: 35 })}>
            Chronic Resp. Acidosis
          </Button>
          <Button variant="outline" onClick={() => setValues({ ph: 7.22, paco2: 28, hco3: 11 })}>
            Metabolic Acidosis
          </Button>
          <Button variant="outline" onClick={() => setValues({ ph: 7.52, paco2: 48, hco3: 38 })}>
            Metabolic Alkalosis
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Renal Handling Model
export function RenalHandlingModel() {
  const [values, setValues] = useState({
    gfr: 100,
    rpf: 600,
    serumCr: 1.0,
    urineCr: 100,
    urineVolume: 1.5,
  });

  const handleChange = (key: string, value: number) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const resetValues = () => {
    setValues({ gfr: 100, rpf: 600, serumCr: 1.0, urineCr: 100, urineVolume: 1.5 });
  };

  // Calculations
  const filtrationFraction = (values.gfr / values.rpf) * 100;
  const crClearance = (values.urineCr * values.urineVolume * 1000) / (values.serumCr * 1440); // mL/min
  const ckdStage = values.gfr >= 90 ? 'G1 (Normal)' : values.gfr >= 60 ? 'G2 (Mild)' : values.gfr >= 45 ? 'G3a (Mild-Moderate)' : values.gfr >= 30 ? 'G3b (Moderate-Severe)' : values.gfr >= 15 ? 'G4 (Severe)' : 'G5 (Kidney Failure)';

  const parameters = [
    { key: 'gfr', label: 'GFR', unit: 'mL/min/1.73m²', min: 5, max: 150, step: 5, normal: { min: 90, max: 120 } },
    { key: 'rpf', label: 'Renal Plasma Flow', unit: 'mL/min', min: 200, max: 1000, step: 10, normal: { min: 550, max: 650 } },
    { key: 'serumCr', label: 'Serum Creatinine', unit: 'mg/dL', min: 0.5, max: 10.0, step: 0.1, normal: { min: 0.7, max: 1.3 } },
    { key: 'urineCr', label: 'Urine Creatinine', unit: 'mg/dL', min: 10, max: 300, step: 10, normal: { min: 80, max: 200 } },
    { key: 'urineVolume', label: '24h Urine Volume', unit: 'L', min: 0.3, max: 4.0, step: 0.1, normal: { min: 1.0, max: 2.5 } },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Renal Handling Model</h1>
          <p className="text-lg text-muted-foreground">
            Explore GFR, renal plasma flow, and creatinine clearance
          </p>
        </div>
        <Button variant="outline" onClick={resetValues} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Renal Parameters</CardTitle>
              <CardDescription>Adjust GFR, RPF, and creatinine values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {parameters.map((param) => {
                const currentValue = values[param.key as keyof typeof values];
                const isAbnormal = currentValue < param.normal.min || currentValue > param.normal.max;

                return (
                  <div key={param.key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">{param.label}</label>
                      <span className={`text-sm font-semibold ${isAbnormal ? 'text-red-500' : 'text-green-500'}`}>
                        {currentValue.toFixed(param.step < 1 ? 1 : 0)} {param.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={currentValue}
                      onChange={(e) => handleChange(param.key, parseFloat(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{param.min} {param.unit}</span>
                      <span>Normal: {param.normal.min}-{param.normal.max}</span>
                      <span>{param.max} {param.unit}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calculated Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">Filtration Fraction</h4>
                <p className="text-2xl font-bold">{filtrationFraction.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Normal: 15-25%</p>
                <Badge variant={filtrationFraction >= 15 && filtrationFraction <= 25 ? 'default' : 'destructive'}>
                  {filtrationFraction >= 15 && filtrationFraction <= 25 ? 'Normal' : 'Abnormal'}
                </Badge>
              </div>

              <div className="border-t pt-4 space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">Creatinine Clearance</h4>
                <p className="text-2xl font-bold">{crClearance.toFixed(1)} <span className="text-sm font-normal">mL/min</span></p>
                <p className="text-xs text-muted-foreground">Approximates GFR</p>
              </div>

              <div className="border-t pt-4 space-y-1">
                <h4 className="text-sm font-medium text-muted-foreground">CKD Stage</h4>
                <p className="text-base font-semibold text-primary">{ckdStage}</p>
                <p className="text-xs text-muted-foreground">Based on GFR: {values.gfr} mL/min/1.73m²</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500/10 border-green-500/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <CardTitle className="text-sm">Key Concepts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>Filtration Fraction:</strong> GFR / RPF × 100</p>
              <p><strong>CrCl:</strong> (UCr × UVol) / (SCr × 1440)</p>
              <p className="text-xs text-muted-foreground mt-2">Normal FF indicates balanced glomerular and tubular function</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preset Scenarios</CardTitle>
          <CardDescription>Common renal conditions</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button variant="outline" onClick={() => setValues({ gfr: 45, rpf: 500, serumCr: 2.2, urineCr: 80, urineVolume: 1.2 })}>
            CKD Stage 3b
          </Button>
          <Button variant="outline" onClick={() => setValues({ gfr: 20, rpf: 400, serumCr: 4.5, urineCr: 50, urineVolume: 0.8 })}>
            CKD Stage 4
          </Button>
          <Button variant="outline" onClick={() => setValues({ gfr: 30, rpf: 300, serumCr: 3.8, urineCr: 40, urineVolume: 0.5 })}>
            Acute Kidney Injury
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
      path: '/interactives/acid-base-simulator',
      category: 'Acid-Base',
    },
    {
      id: 'renal-handling',
      title: 'Renal Handling Model',
      description: 'Visualize GFR, RPF, and electrolyte handling in the nephron',
      path: '/interactives/renal-handling',
      category: 'Renal',
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
              <CardTitle className="text-lg">{interactive.title}</CardTitle>
              <CardDescription>{interactive.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{interactive.category}</Badge>
                <Link to={interactive.path}>
                  <Button size="sm">Launch</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

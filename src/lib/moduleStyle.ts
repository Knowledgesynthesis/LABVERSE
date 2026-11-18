import {
  Activity,
  Beaker,
  Bone,
  Droplets,
  FlaskConical,
  HeartPulse,
  Layers,
  ShieldCheck,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import type { Module, ModuleId } from '../types';

export const MODULE_ICON: Record<ModuleId, LucideIcon> = {
  electrolytes: Droplets,
  'acid-base': Waves,
  renal: Beaker,
  hepatic: FlaskConical,
  endocrine: Activity,
  minerals: Bone,
  cardiac: HeartPulse,
  integrated: Layers,
  'lab-errors': ShieldCheck,
};

/** Full class strings so Tailwind can see them at build time. */
export const HUE: Record<Module['hue'], { text: string; soft: string; border: string; solid: string; ring: string }> = {
  sky: { text: 'text-sky-600 dark:text-sky-400', soft: 'bg-sky-500/10', border: 'border-sky-500/30', solid: 'bg-sky-500', ring: 'stroke-sky-500' },
  violet: { text: 'text-violet-600 dark:text-violet-400', soft: 'bg-violet-500/10', border: 'border-violet-500/30', solid: 'bg-violet-500', ring: 'stroke-violet-500' },
  teal: { text: 'text-teal-600 dark:text-teal-400', soft: 'bg-teal-500/10', border: 'border-teal-500/30', solid: 'bg-teal-500', ring: 'stroke-teal-500' },
  amber: { text: 'text-amber-600 dark:text-amber-400', soft: 'bg-amber-500/10', border: 'border-amber-500/30', solid: 'bg-amber-500', ring: 'stroke-amber-500' },
  rose: { text: 'text-rose-600 dark:text-rose-400', soft: 'bg-rose-500/10', border: 'border-rose-500/30', solid: 'bg-rose-500', ring: 'stroke-rose-500' },
  lime: { text: 'text-lime-700 dark:text-lime-400', soft: 'bg-lime-500/10', border: 'border-lime-500/30', solid: 'bg-lime-500', ring: 'stroke-lime-500' },
  red: { text: 'text-red-600 dark:text-red-400', soft: 'bg-red-500/10', border: 'border-red-500/30', solid: 'bg-red-500', ring: 'stroke-red-500' },
  indigo: { text: 'text-indigo-600 dark:text-indigo-400', soft: 'bg-indigo-500/10', border: 'border-indigo-500/30', solid: 'bg-indigo-500', ring: 'stroke-indigo-500' },
  orange: { text: 'text-orange-600 dark:text-orange-400', soft: 'bg-orange-500/10', border: 'border-orange-500/30', solid: 'bg-orange-500', ring: 'stroke-orange-500' },
};

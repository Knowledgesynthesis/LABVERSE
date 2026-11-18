import { useMemo, useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import type { QuestionBody } from '../types';
import { isCorrect, optionOrder, parseNumeric } from '../lib/quiz';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Rich } from './Rich';

interface Props {
  question: QuestionBody;
  /** Changes option order between attempts. */
  salt?: number;
  label?: string;
  onAnswered?: (correct: boolean) => void;
  /** Already answered in this view (controlled from parent). */
  compact?: boolean;
}

export function QuestionCard({ question, salt = 0, label, onAnswered, compact }: Props) {
  const [choice, setChoice] = useState<number | null>(null);
  const [typed, setTyped] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const order = useMemo(
    () => (question.kind === 'mcq' ? optionOrder(question.id, question.options.length, salt) : []),
    [question, salt]
  );

  const response = question.kind === 'mcq' ? choice : typed;
  const correct = submitted && isCorrect(question, response);
  const canSubmit = question.kind === 'mcq' ? choice !== null : parseNumeric(typed) !== null;

  const submit = () => {
    if (!canSubmit || submitted) return;
    setSubmitted(true);
    onAnswered?.(isCorrect(question, response));
  };

  return (
    <div className={cn('rounded-lg border bg-card', compact ? 'p-4' : 'p-5')}>
      {label && <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">{label}</p>}
      <p className="mb-4 font-medium leading-relaxed">
        <Rich text={question.stem} />
      </p>

      {question.kind === 'mcq' ? (
        <div className="space-y-2" role="radiogroup" aria-label="Answer options">
          {order.map((optIndex, displayIndex) => {
            const selected = choice === optIndex;
            const isAnswer = optIndex === question.answer;
            return (
              <button
                key={optIndex}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={submitted}
                onClick={() => setChoice(optIndex)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-md border p-3 text-left text-sm transition-colors',
                  !submitted && (selected ? 'border-primary bg-primary/10' : 'hover:bg-accent'),
                  submitted && isAnswer && 'border-success bg-success/10',
                  submitted && selected && !isAnswer && 'border-destructive bg-destructive/10',
                  submitted && !selected && !isAnswer && 'opacity-60'
                )}
              >
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                    selected && !submitted && 'border-primary bg-primary text-primary-foreground'
                  )}
                >
                  {String.fromCharCode(65 + displayIndex)}
                </span>
                <span className="pt-0.5">
                  <Rich text={question.options[optIndex]} />
                </span>
                {submitted && isAnswer && <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-success" />}
                {submitted && selected && !isAnswer && <XCircle className="ml-auto h-5 w-5 shrink-0 text-destructive" />}
              </button>
            );
          })}
        </div>
      ) : (
        <form
          className="flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <Input
            inputMode="decimal"
            aria-label="Your numeric answer"
            placeholder="Your answer"
            className="w-40 tabular"
            value={typed}
            disabled={submitted}
            onChange={(e) => setTyped(e.target.value)}
          />
          {question.unit && <span className="text-sm text-muted-foreground">{question.unit}</span>}
        </form>
      )}

      {!submitted ? (
        <div className="mt-4 flex justify-end">
          <Button onClick={submit} disabled={!canSubmit} size="sm">
            Check answer
          </Button>
        </div>
      ) : (
        <div
          className={cn('mt-4 rounded-md border p-4 text-sm animate-fade-up', correct ? 'border-success/40 bg-success/5' : 'border-warning/40 bg-warning/5')}
          aria-live="polite"
        >
          <p className={cn('mb-2 flex items-center gap-2 font-semibold', correct ? 'text-success' : 'text-warning')}>
            {correct ? <CheckCircle2 className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
            {correct
              ? 'Correct'
              : question.kind === 'numeric'
                ? `Not quite — expected ${question.value}${question.unit ? ' ' + question.unit : ''}${question.tolerance ? ` (± ${question.tolerance})` : ''}`
                : 'Not quite'}
          </p>
          <p className="leading-relaxed text-foreground/90">
            <Rich text={question.explanation} />
          </p>
        </div>
      )}
    </div>
  );
}

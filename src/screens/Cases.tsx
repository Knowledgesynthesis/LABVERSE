import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cases } from '../data';
import useAppStore from '../store';

export function CasesList() {
  const { progress } = useAppStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Clinical Cases</h1>
        <p className="text-lg text-muted-foreground">
          Apply your knowledge to real-world clinical scenarios
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((clinicalCase) => {
          const isCompleted = progress.casesCompleted.includes(clinicalCase.id);

          return (
            <Link key={clinicalCase.id} to={`/cases/${clinicalCase.id}`}>
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{clinicalCase.title}</CardTitle>
                      <CardDescription className="mt-2 line-clamp-2">
                        {clinicalCase.presentation}
                      </CardDescription>
                    </div>
                    {isCompleted && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{clinicalCase.difficulty}</Badge>
                    <Badge variant="secondary">
                      {clinicalCase.questions.length} questions
                    </Badge>
                    {clinicalCase.mustNotMiss && (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Must Not Miss
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function CaseDetail() {
  const { caseId } = useParams();
  const { progress, completeCase } = useAppStore();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const clinicalCase = cases.find((c) => c.id === caseId);

  if (!clinicalCase) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Case not found</h2>
        <Link to="/cases" className="mt-4 inline-block">
          <Button variant="outline">Back to Cases</Button>
        </Link>
      </div>
    );
  }

  const isCompleted = progress.casesCompleted.includes(clinicalCase.id);

  const handleSubmit = () => {
    setShowResults(true);
    if (!isCompleted) {
      completeCase(clinicalCase.id);
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Link to="/cases">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Cases
          </Button>
        </Link>

        <div>
          <h1 className="text-3xl font-bold mb-2">{clinicalCase.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{clinicalCase.difficulty}</Badge>
            {clinicalCase.mustNotMiss && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                Must Not Miss
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Clinical Presentation */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Presentation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base">{clinicalCase.presentation}</p>
        </CardContent>
      </Card>

      {/* Lab Values */}
      <Card>
        <CardHeader>
          <CardTitle>Laboratory Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold">Test</th>
                  <th className="text-left py-2 px-4 font-semibold">Value</th>
                  <th className="text-left py-2 px-4 font-semibold">Reference Range</th>
                  <th className="text-left py-2 px-4 font-semibold">Unit</th>
                </tr>
              </thead>
              <tbody>
                {clinicalCase.labValues.map((lab) => {
                  const isAbnormal =
                    lab.value !== undefined &&
                    (lab.value < lab.referenceRange.min ||
                      lab.value > lab.referenceRange.max);

                  return (
                    <tr key={lab.id} className="border-b">
                      <td className="py-2 px-4">{lab.name}</td>
                      <td
                        className={`py-2 px-4 font-semibold ${
                          isAbnormal ? 'text-red-500' : ''
                        }`}
                      >
                        {lab.value ?? '—'}
                      </td>
                      <td className="py-2 px-4 text-sm text-muted-foreground">
                        {lab.referenceRange.min} - {lab.referenceRange.max}
                      </td>
                      <td className="py-2 px-4 text-sm text-muted-foreground">
                        {lab.unit}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        {clinicalCase.questions.map((question, index) => {
          const selectedAnswer = selectedAnswers[question.id];
          const isCorrect = selectedAnswer === question.correctAnswer;

          return (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                <CardDescription>{question.question}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {question.options?.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => handleAnswerSelect(question.id, optIndex)}
                    disabled={showResults}
                    className={`w-full text-left p-3 border rounded-lg transition-colors ${
                      selectedAnswer === optIndex
                        ? showResults
                          ? isCorrect
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-red-500 bg-red-500/10'
                          : 'border-primary bg-primary/5'
                        : 'hover:bg-accent'
                    } ${showResults ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-semibold">{String.fromCharCode(65 + optIndex)}.</span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}

                {showResults && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Explanation</h4>
                    <p className="text-sm">{question.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Submit Button */}
      {!showResults && (
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < clinicalCase.questions.length}
            size="lg"
          >
            Submit Answers
          </Button>
        </div>
      )}

      {/* Diagnosis & Reasoning */}
      {showResults && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Diagnosis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-primary mb-3">
                {clinicalCase.diagnosis}
              </p>
              <p className="text-base">{clinicalCase.reasoning}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Points</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {clinicalCase.learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

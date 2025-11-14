import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, BookOpen } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { lessons, modules } from '../data';
import useAppStore from '../store';
import type { LessonContent, TableContent } from '../types';

export function Lesson() {
  const { lessonId } = useParams();
  const { progress, completeLesson } = useAppStore();

  const lesson = lessons.find((l) => l.id === lessonId);
  const module = lesson ? modules.find((m) => m.id === lesson.moduleId) : null;

  if (!lesson || !module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Lesson not found</h2>
        <Link to="/" className="mt-4 inline-block">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const isCompleted = progress.lessonsCompleted.includes(lesson.id);

  const handleComplete = () => {
    if (!isCompleted) {
      completeLesson(lesson.id);
    }
  };

  const renderContent = (content: LessonContent, index: number) => {
    switch (content.type) {
      case 'heading':
        if (content.level === 1) {
          return (
            <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
              {content.content as string}
            </h1>
          );
        }
        return (
          <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
            {content.content as string}
          </h2>
        );

      case 'text':
        return (
          <p key={index} className="text-base leading-relaxed mb-4">
            {content.content as string}
          </p>
        );

      case 'list':
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4 ml-4">
            {(content.content as string[]).map((item, i) => (
              <li key={i} className="text-base">
                {item}
              </li>
            ))}
          </ul>
        );

      case 'table':
        const tableContent = content.content as TableContent;
        return (
          <div key={index} className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  {tableContent.headers.map((header, i) => (
                    <th
                      key={i}
                      className="border border-border px-4 py-2 text-left font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableContent.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-muted/50">
                    {row.map((cell, j) => (
                      <td key={j} className="border border-border px-4 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'formula':
        return (
          <div key={index} className="bg-muted p-4 rounded-lg mb-4 font-mono text-center">
            {content.content as string}
          </div>
        );

      case 'callout':
        const calloutColors = {
          info: 'bg-blue-500/10 border-blue-500/50 text-blue-900 dark:text-blue-100',
          warning: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-900 dark:text-yellow-100',
          success: 'bg-green-500/10 border-green-500/50 text-green-900 dark:text-green-100',
          error: 'bg-red-500/10 border-red-500/50 text-red-900 dark:text-red-100',
          'clinical-pearl':
            'bg-purple-500/10 border-purple-500/50 text-purple-900 dark:text-purple-100',
        };

        return (
          <div
            key={index}
            className={`border-l-4 p-4 rounded-r-lg mb-4 ${
              calloutColors[content.calloutType || 'info']
            }`}
          >
            <p className="font-medium">{content.content as string}</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Link to={`/modules/${module.id}`}>
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to {module.title}
          </Button>
        </Link>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge>{module.category}</Badge>
            <Badge variant="outline">{lesson.estimatedTime} min</Badge>
            <Badge variant="secondary">{lesson.bloomLevel}</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-lg text-muted-foreground">{lesson.description}</p>
        </div>
      </div>

      {/* Learning Objectives */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Learning Objectives</h2>
        </div>
        <ul className="space-y-2">
          {lesson.objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Lesson Content */}
      <Card className="p-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {lesson.content.map((content, index) => renderContent(content, index))}
        </div>
      </Card>

      {/* Completion Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleComplete}
          disabled={isCompleted}
          className="gap-2"
          size="lg"
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="h-5 w-5" />
              Completed
            </>
          ) : (
            'Mark as Complete'
          )}
        </Button>
      </div>
    </div>
  );
}

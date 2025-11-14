import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FlaskConical, FileText, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { modules, lessons, cases } from '../data';
import useAppStore from '../store';

export function ModuleOverview() {
  const { moduleId } = useParams();
  const { progress } = useAppStore();

  const module = modules.find((m) => m.id === moduleId);

  if (!module) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Module not found</h2>
        <Link to="/" className="mt-4 inline-block">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const moduleLessons = lessons.filter((l) => module.lessons.includes(l.id));
  const moduleCases = cases.filter((c) => module.cases.includes(c.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          <div className="text-5xl">{module.icon}</div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
            <p className="text-lg text-muted-foreground">{module.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge>{module.category}</Badge>
              <Badge variant="outline">{module.estimatedTime} min</Badge>
              <Badge variant="secondary">{module.bloomLevel}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      {module.prerequisites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Prerequisites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {module.prerequisites.map((prereqId) => {
                const prereq = modules.find((m) => m.id === prereqId);
                return prereq ? (
                  <Link key={prereqId} to={`/modules/${prereqId}`}>
                    <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                      {prereq.title}
                    </Badge>
                  </Link>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lessons */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Lessons</h2>
        </div>

        <div className="space-y-3">
          {moduleLessons.map((lesson) => {
            const isCompleted = progress.lessonsCompleted.includes(lesson.id);

            return (
              <Link key={lesson.id} to={`/lessons/${lesson.id}`}>
                <Card className="transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{lesson.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {lesson.description}
                          </CardDescription>
                        </div>
                        {isCompleted && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          {lesson.estimatedTime} min
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {lesson.bloomLevel}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Clinical Cases */}
      {moduleCases.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Clinical Cases</h2>
          </div>

          <div className="space-y-3">
            {moduleCases.map((clinicalCase) => {
              const isCompleted = progress.casesCompleted.includes(clinicalCase.id);

              return (
                <Link key={clinicalCase.id} to={`/cases/${clinicalCase.id}`}>
                  <Card className="transition-all hover:shadow-lg hover:border-primary/50">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {clinicalCase.title}
                            </CardTitle>
                            {clinicalCase.mustNotMiss && (
                              <Badge variant="destructive" className="mt-2">
                                Must Not Miss
                              </Badge>
                            )}
                          </div>
                          {isCompleted && (
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline" className="text-xs">
                            {clinicalCase.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {clinicalCase.questions.length} questions
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Simulations */}
      {module.interactives.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Interactive Simulations</h2>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Explore Interactive Labs</CardTitle>
              <CardDescription>
                Hands-on simulations to reinforce your understanding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/interactives">
                <Button>Go to Simulations</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

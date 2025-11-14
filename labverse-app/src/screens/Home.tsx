import { Link } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { modules } from '../data';
import useAppStore from '../store';

export function Home() {
  const { progress } = useAppStore();

  const getModuleProgress = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return 0;

    const completedLessons = module.lessons.filter((lessonId) =>
      progress.lessonsCompleted.includes(lessonId)
    ).length;

    return module.lessons.length > 0
      ? Math.round((completedLessons / module.lessons.length) * 100)
      : 0;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Welcome to LabVerse
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master clinical chemistry through interactive simulations, integrated
          learning modules, and real-world cases.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lessons Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress.lessonsCompleted.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cases Solved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {progress.casesCompleted.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Time Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(progress.totalTimeSpent)} min
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Learning Modules</h2>
          <Link to="/modules">
            <Button variant="ghost" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => {
            const progressPercent = getModuleProgress(module.id);
            const isCompleted = progressPercent === 100;

            return (
              <Link key={module.id} to={`/modules/${module.id}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{module.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                        </div>
                      </div>
                      {isCompleted && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <CardDescription className="mt-2">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{module.estimatedTime} min</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{module.category}</Badge>
                      <Badge variant="outline">{module.lessons.length} lessons</Badge>
                    </div>

                    {progressPercent > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{progressPercent}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Ready to dive deeper?</CardTitle>
          <CardDescription>
            Explore interactive simulations that bring clinical chemistry to life
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/interactives">
            <Button>Explore Interactive Labs</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

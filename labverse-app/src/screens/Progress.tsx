import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { modules, lessons, cases } from '../data';
import useAppStore from '../store';
import { CheckCircle2, BookOpen, FileText, TrendingUp } from 'lucide-react';

export function Progress() {
  const { progress } = useAppStore();

  const totalLessons = lessons.length;
  const totalCases = cases.length;
  const completedLessons = progress.lessonsCompleted.length;
  const completedCases = progress.casesCompleted.length;

  const lessonsProgress = Math.round((completedLessons / totalLessons) * 100);
  const casesProgress = Math.round((completedCases / totalCases) * 100);

  const assessmentCount = Object.keys(progress.assessmentScores).length;
  const averageScore =
    assessmentCount > 0
      ? Math.round(
          Object.values(progress.assessmentScores).reduce(
            (acc, score) => acc + (score.score / score.totalPoints) * 100,
            0
          ) / assessmentCount
        )
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
        <p className="text-lg text-muted-foreground">
          Track your learning journey through LabVerse
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Lessons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedLessons}/{totalLessons}</div>
            <div className="mt-2">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${lessonsProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{lessonsProgress}% complete</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCases}/{totalCases}</div>
            <div className="mt-2">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${casesProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{casesProgress}% complete</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Avg Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {assessmentCount} assessment{assessmentCount !== 1 ? 's' : ''} taken
            </p>
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
              {Math.floor(progress.totalTimeSpent / 60)}h{' '}
              {Math.round(progress.totalTimeSpent % 60)}m
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total learning time</p>
          </CardContent>
        </Card>
      </div>

      {/* Module Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Module Progress</CardTitle>
          <CardDescription>Your progress across all learning modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {modules.map((module) => {
              const moduleCompletedLessons = module.lessons.filter((lessonId) =>
                progress.lessonsCompleted.includes(lessonId)
              ).length;
              const moduleProgress =
                module.lessons.length > 0
                  ? Math.round((moduleCompletedLessons / module.lessons.length) * 100)
                  : 0;

              return (
                <div key={module.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{module.icon}</span>
                      <div>
                        <h4 className="font-medium">{module.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {moduleCompletedLessons} of {module.lessons.length} lessons
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {moduleProgress === 100 && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                      <Badge variant={moduleProgress === 100 ? 'default' : 'secondary'}>
                        {moduleProgress}%
                      </Badge>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${moduleProgress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Assessments */}
      {assessmentCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
            <CardDescription>Your latest assessment results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.values(progress.assessmentScores)
                .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                .slice(0, 5)
                .map((score) => {
                  const percentage = Math.round((score.score / score.totalPoints) * 100);
                  return (
                    <div
                      key={score.assessmentId}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{score.assessmentId}</h4>
                        <p className="text-sm text-muted-foreground">
                          Attempt {score.attempts} •{' '}
                          {new Date(score.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={percentage >= 70 ? 'default' : 'destructive'}>
                          {percentage}%
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {score.score}/{score.totalPoints} points
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

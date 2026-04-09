import { Trophy, Timer, Play, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function QuizSection() {
  const quizzes = [
    { title: 'Data Structures Mock Test', subject: 'DSA', questions: 20, time: '30 min', difficulty: 'Medium' },
    { title: 'Python Programming Basics', subject: 'Python', questions: 15, time: '20 min', difficulty: 'Easy' },
    { title: 'Operating Systems Concepts', subject: 'OS', questions: 25, time: '40 min', difficulty: 'Hard' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Mock Quizzes</h2>
        <p className="text-muted-foreground text-sm">Test your knowledge with these practice tests.</p>
      </div>

      {/* Stats Card */}
      <Card className="bg-primary text-primary-foreground border-none shadow-lg">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs opacity-80">Your Rank</p>
            <h3 className="text-3xl font-bold">#42</h3>
            <p className="text-[10px] opacity-80">Top 5% of your class</p>
          </div>
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
            <Trophy className="h-8 w-8" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold">Available Quizzes</h3>
        {quizzes.map((quiz, i) => (
          <Card key={i} className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Play className="h-6 w-6 fill-current" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-sm">{quiz.title}</h4>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {quiz.questions} Qs</span>
                  <span className="flex items-center gap-1"><Timer className="h-3 w-3" /> {quiz.time}</span>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="text-[10px] mb-2">{quiz.difficulty}</Badge>
                <Button size="sm" className="h-8 text-xs px-4">Start</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { ClipboardList, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AssignmentsSection() {
  const assignments = [
    { title: 'Graph Algorithms Implementation', subject: 'DSA', dueDate: 'Tomorrow', status: 'pending', priority: 'high' },
    { title: 'Neural Network from Scratch', subject: 'ML', dueDate: 'Oct 12', status: 'pending', priority: 'medium' },
    { title: 'Process Scheduling Simulation', subject: 'OS', dueDate: 'Oct 15', status: 'submitted', priority: 'low' },
    { title: 'React Hooks Deep Dive', subject: 'Web Dev', dueDate: 'Oct 20', status: 'pending', priority: 'medium' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Assignments</h2>
        <p className="text-muted-foreground text-sm">Track your tasks and deadlines.</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4 mt-4">
          {assignments.filter(a => a.status === 'pending').map((assignment, i) => (
            <div key={i}>
              <AssignmentCard assignment={assignment} />
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-4">
          {assignments.filter(a => a.status === 'submitted').map((assignment, i) => (
            <div key={i}>
              <AssignmentCard assignment={assignment} />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AssignmentCard({ assignment }: { assignment: any }) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-4 flex items-start gap-4">
        <div className={`p-2 rounded-lg ${assignment.status === 'submitted' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
          {assignment.status === 'submitted' ? <CheckCircle2 className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">{assignment.title}</h4>
            <Badge variant={assignment.priority === 'high' ? 'destructive' : 'secondary'} className="text-[10px] h-4">
              {assignment.priority}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{assignment.subject}</p>
          <div className="flex items-center gap-1 mt-2 text-[10px] font-medium text-muted-foreground">
            <AlertCircle className="h-3 w-3" />
            <span>Due: {assignment.dueDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

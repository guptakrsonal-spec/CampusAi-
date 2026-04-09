import { motion } from 'motion/react';
import { 
  Bell, 
  ClipboardList, 
  FileText, 
  GraduationCap, 
  CreditCard, 
  Trophy,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { View } from '@/src/types';

interface HomeDashboardProps {
  setView: (view: View) => void;
}

export default function HomeDashboard({ setView }: HomeDashboardProps) {
  const dashboardCards = [
    { id: 'notices', title: 'Notices', icon: <Bell className="h-6 w-6 text-blue-500" />, color: 'bg-blue-500/10', count: 3 },
    { id: 'assignments', title: 'Assignments', icon: <ClipboardList className="h-6 w-6 text-orange-500" />, color: 'bg-orange-500/10', count: 5 },
    { id: 'notes', title: 'Notes', icon: <FileText className="h-6 w-6 text-green-500" />, color: 'bg-green-500/10', count: 12 },
    { id: 'quiz', title: 'Quiz', icon: <Trophy className="h-6 w-6 text-purple-500" />, color: 'bg-purple-500/10', count: 2 },
    { id: 'scholarship', title: 'Scholarship', icon: <GraduationCap className="h-6 w-6 text-pink-500" />, color: 'bg-pink-500/10', count: 1 },
    { id: 'fees', title: 'Fees', icon: <CreditCard className="h-6 w-6 text-cyan-500" />, color: 'bg-cyan-500/10', count: 0 },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <section className="space-y-2">
        <h2 className="text-2xl font-bold">Hello, John! 👋</h2>
        <p className="text-muted-foreground text-sm">Ready to ace your exams today?</p>
      </section>

      {/* Featured Banner */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/60 p-6 text-primary-foreground shadow-lg"
      >
        <div className="relative z-10 space-y-4">
          <Badge variant="secondary" className="bg-white/20 text-white border-none">New Course</Badge>
          <h3 className="text-xl font-bold">Advanced AI & Machine Learning</h3>
          <p className="text-sm opacity-90 max-w-[200px]">Master the future of technology with our latest bootcamp.</p>
          <Button variant="secondary" size="sm" className="font-semibold">
            Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-[-20px] right-[-20px] h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        <TrendingUp className="absolute bottom-4 right-4 h-24 w-24 opacity-10" />
      </motion.div>

      {/* Quick Access Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Quick Access</h3>
          <Button variant="link" size="sm" className="text-xs">View All</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView(card.id as View)}
            >
              <Card className="cursor-pointer border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                  <div className={`p-3 rounded-xl ${card.color}`}>
                    {card.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{card.title}</p>
                    {card.count > 0 && (
                      <Badge variant="secondary" className="text-[10px] h-4 px-1">
                        {card.count} New
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="space-y-4">
        <h3 className="font-semibold">Upcoming Events</h3>
        <div className="space-y-3">
          {[
            { title: 'Mid-Term Exam', time: 'Tomorrow, 10:00 AM', type: 'Exam' },
            { title: 'AI Workshop', time: 'Oct 15, 2:00 PM', type: 'Workshop' },
          ].map((event, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-accent/50 border border-border/50">
              <div className="p-2 rounded-lg bg-background shadow-sm">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{event.title}</h4>
                <p className="text-xs text-muted-foreground">{event.time}</p>
              </div>
              <Badge variant="outline" className="text-[10px]">{event.type}</Badge>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

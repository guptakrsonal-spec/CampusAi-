import { Bell, Calendar, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function NoticesSection() {
  const notices = [
    { title: 'Mid-Term Examination Schedule', date: 'Oct 08, 2023', category: 'Exam', content: 'The mid-term examination for all B.Tech students will commence from Oct 25. Detailed schedule is attached.', important: true },
    { title: 'Annual Cultural Fest - Aura 2023', date: 'Oct 05, 2023', category: 'Event', content: 'Registrations for Aura 2023 are now open. Participate in various competitions and win exciting prizes!', important: false },
    { title: 'Holiday Notice: Dussehra', date: 'Oct 02, 2023', category: 'Holiday', content: 'The campus will remain closed on Oct 24 on account of Dussehra.', important: false },
    { title: 'Placement Drive: Google India', date: 'Sep 30, 2023', category: 'Placement', content: 'Google India is visiting for a placement drive for final year students on Oct 10.', important: true },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Notices & Updates</h2>
        <p className="text-muted-foreground text-sm">Stay updated with the latest campus announcements.</p>
      </div>

      <div className="space-y-4">
        {notices.map((notice, i) => (
          <Card key={i} className={`border-none shadow-sm ${notice.important ? 'border-l-4 border-l-primary' : ''}`}>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between mb-1">
                <Badge variant={notice.important ? "default" : "secondary"} className="text-[10px]">
                  {notice.category}
                </Badge>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{notice.date}</span>
                </div>
              </div>
              <CardTitle className="text-base font-bold">{notice.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {notice.content}
              </p>
              <button className="text-primary text-xs font-semibold mt-3 flex items-center gap-1">
                Read More <Info className="h-3 w-3" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

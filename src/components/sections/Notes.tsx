import { FileText, Download, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function NotesSection() {
  const subjects = [
    { name: 'Data Structures', files: 12, size: '45MB', color: 'bg-blue-500' },
    { name: 'Machine Learning', files: 8, size: '120MB', color: 'bg-purple-500' },
    { name: 'Operating Systems', files: 15, size: '32MB', color: 'bg-green-500' },
    { name: 'Web Development', files: 20, size: '88MB', color: 'bg-orange-500' },
    { name: 'Database Systems', files: 10, size: '25MB', color: 'bg-red-500' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Study Notes</h2>
        <p className="text-muted-foreground text-sm">Access and download your course materials.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search subjects or topics..." className="pl-10" />
      </div>

      <div className="space-y-4">
        {subjects.map((subject, i) => (
          <Card key={i} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex items-center p-4 gap-4">
                <div className={`h-12 w-12 rounded-xl ${subject.color} flex items-center justify-center text-white`}>
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{subject.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px]">{subject.files} Files</Badge>
                    <span className="text-[10px] text-muted-foreground">{subject.size}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-5 w-5 text-primary" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

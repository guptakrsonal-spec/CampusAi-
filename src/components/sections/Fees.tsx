import { CreditCard, History, Download, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function FeesSection() {
  const history = [
    { title: 'Semester 5 Tuition Fee', date: 'Aug 15, 2023', amount: '₹45,000', status: 'Paid' },
    { title: 'Hostel & Mess Fee', date: 'Aug 10, 2023', amount: '₹25,000', status: 'Paid' },
    { title: 'Library Security Deposit', date: 'Jul 20, 2023', amount: '₹5,000', status: 'Paid' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Fees & Payments</h2>
        <p className="text-muted-foreground text-sm">Manage your academic and other campus fees.</p>
      </div>

      {/* Pending Fee Card */}
      <Card className="border-none shadow-md bg-gradient-to-br from-red-500/10 to-transparent">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Pending Balance</p>
              <h3 className="text-3xl font-bold">₹0.00</h3>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">No Dues</Badge>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/50">
            <AlertCircle className="h-4 w-4 text-primary" />
            <p className="text-[10px] text-muted-foreground">Next payment due on Jan 15, 2024 for Semester 6.</p>
          </div>
          <Button className="w-full" disabled>Pay Now</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Payment History</h3>
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <History className="h-4 w-4" /> History
          </Button>
        </div>
        
        <div className="space-y-3">
          {history.map((item, i) => (
            <Card key={i} className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="text-[10px] text-muted-foreground">{item.date}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-bold">{item.amount}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[9px] h-4 bg-green-500/10 text-green-600 border-none">
                      {item.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

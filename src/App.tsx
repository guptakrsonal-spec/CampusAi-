import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  BookOpen, 
  MessageSquare, 
  User, 
  Menu, 
  Bell, 
  Search, 
  Moon, 
  Sun,
  LogOut,
  Settings,
  CreditCard,
  FileText,
  ClipboardList,
  GraduationCap,
  Library,
  WifiOff,
  Star,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { View } from '@/src/types';

// Home Dashboard Component
import HomeDashboard from '@/src/components/dashboard/Home';
import NotesSection from '@/src/components/sections/Notes';
import AssignmentsSection from '@/src/components/sections/Assignments';
import NoticesSection from '@/src/components/sections/Notices';
import QuizSection from '@/src/components/sections/Quiz';
import FeesSection from '@/src/components/sections/Fees';
import ChatbotSection from '@/src/components/chatbot/Chatbot';

export default function App() {
  const [activeView, setActiveView] = useState<View>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="flex flex-col items-center gap-4"
        >
          <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
            <GraduationCap className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            CampusAI
          </h1>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                className="h-2 w-2 rounded-full bg-primary"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex h-16 w-16 rounded-2xl bg-primary items-center justify-center text-primary-foreground shadow-lg mb-4">
              <GraduationCap className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-muted-foreground">Login to your CampusAI account</p>
          </div>

          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="student@campus.edu" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-primary" />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="text-primary font-semibold">Forgot Password?</button>
                </div>
                <Button type="submit" className="w-full h-11 text-base font-semibold">
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account? <button className="text-primary font-semibold">Create Account</button>
          </p>
        </motion.div>
      </div>
    );
  }

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeDashboard setView={setActiveView} />;
      case 'notes':
        return <NotesSection />;
      case 'assignments':
        return <AssignmentsSection />;
      case 'notices':
        return <NoticesSection />;
      case 'quiz':
        return <QuizSection />;
      case 'fees':
        return <FeesSection />;
      case 'chatbot':
        return <ChatbotSection />;
      case 'courses':
        return <div className="p-6 text-center">Courses Section Coming Soon</div>;
      case 'profile':
        return <div className="p-6 text-center">Profile Section Coming Soon</div>;
      default:
        return <HomeDashboard setView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <Sidebar 
                  activeView={activeView} 
                  setActiveView={(view) => {
                    setActiveView(view);
                    setIsSidebarOpen(false);
                  }}
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              CampusAI
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            <Avatar className="h-8 w-8 hidden md:flex">
              <AvatarImage src="https://picsum.photos/seed/student/200" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="container mx-auto"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t bg-background/95 backdrop-blur md:hidden">
        <div className="grid h-full grid-cols-4 items-center justify-items-center">
          <NavButton 
            icon={<Home className="h-6 w-6" />} 
            label="Home" 
            active={activeView === 'home'} 
            onClick={() => setActiveView('home')} 
          />
          <NavButton 
            icon={<BookOpen className="h-6 w-6" />} 
            label="Courses" 
            active={activeView === 'courses'} 
            onClick={() => setActiveView('courses')} 
          />
          <NavButton 
            icon={<MessageSquare className="h-6 w-6" />} 
            label="AI Chat" 
            active={activeView === 'chatbot'} 
            onClick={() => setActiveView('chatbot')} 
          />
          <NavButton 
            icon={<User className="h-6 w-6" />} 
            label="Profile" 
            active={activeView === 'profile'} 
            onClick={() => setActiveView('profile')} 
          />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function Sidebar({ activeView, setActiveView, isDarkMode, toggleDarkMode }: { 
  activeView: View, 
  setActiveView: (view: View) => void,
  isDarkMode: boolean,
  toggleDarkMode: () => void
}) {
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="p-6 border-b">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src="https://picsum.photos/seed/student/200" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-xs text-muted-foreground">B.Tech CSE - Year 3</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => setActiveView('profile')}>
          View Profile
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-1">
          <SidebarItem icon={<ShoppingBag className="h-5 w-5" />} label="My Purchases" />
          <SidebarItem icon={<Star className="h-5 w-5" />} label="Join Beta Program" />
          <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-accent cursor-pointer" onClick={toggleDarkMode}>
            <div className="flex items-center gap-3">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="text-sm font-medium">Dark Mode</span>
            </div>
            <Badge variant={isDarkMode ? "default" : "outline"}>{isDarkMode ? "On" : "Off"}</Badge>
          </div>
          <SidebarItem icon={<WifiOff className="h-5 w-5" />} label="Offline Mode" />
          <div className="h-px bg-border my-2" />
          <SidebarItem icon={<GraduationCap className="h-5 w-5" />} label="Scholarship" view="home" onClick={() => setActiveView('home')} />
          <SidebarItem icon={<ClipboardList className="h-5 w-5" />} label="Test Series" />
          <SidebarItem icon={<FileText className="h-5 w-5" />} label="Notes" view="notes" onClick={() => setActiveView('notes')} />
          <SidebarItem icon={<ClipboardList className="h-5 w-5" />} label="Assignments" view="assignments" onClick={() => setActiveView('assignments')} />
          <SidebarItem icon={<Bell className="h-5 w-5" />} label="Notices" view="notices" onClick={() => setActiveView('notices')} />
          <SidebarItem icon={<CreditCard className="h-5 w-5" />} label="Fees" view="fees" onClick={() => setActiveView('fees')} />
          <SidebarItem icon={<Library className="h-5 w-5" />} label="Library" />
          <div className="h-px bg-border my-2" />
          <SidebarItem icon={<Settings className="h-5 w-5" />} label="Settings" />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, onClick, view }: { icon: React.ReactNode, label: string, onClick?: () => void, view?: View }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm font-medium"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

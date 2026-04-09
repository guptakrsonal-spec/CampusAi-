import React from 'react';

export type View = 'home' | 'courses' | 'chatbot' | 'profile' | 'notes' | 'assignments' | 'notices' | 'quiz' | 'fees';

export interface NavItem {
  label: string;
  icon: React.ReactNode;
  view: View;
}

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  action?: () => void;
  view?: View;
}

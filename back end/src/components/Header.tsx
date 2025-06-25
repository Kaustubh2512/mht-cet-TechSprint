
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Home, BookOpen, BarChart, FileText, LogIn, UserPlus } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Header = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <header className="py-4 px-6 md:px-10 backdrop-blur-sm sticky top-0 z-50 border-b border-neutral/20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-neutral font-bold text-xl">A</span>
            </div>
          </Link>
          <h1 className="text-xl font-bold">AI College Buddy</h1>
        </div>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" onClick={() => setActiveTab('home')}>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${activeTab === 'home' ? 'bg-accent/50' : ''}`}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/predictor" onClick={() => setActiveTab('predictor')}>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${activeTab === 'predictor' ? 'bg-accent/50' : ''}`}>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  <span>Predictor</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/colleges" onClick={() => setActiveTab('colleges')}>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${activeTab === 'colleges' ? 'bg-accent/50' : ''}`}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Colleges</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/insights" onClick={() => setActiveTab('insights')}>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${activeTab === 'insights' ? 'bg-accent/50' : ''}`}>
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>Insights</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/resources" onClick={() => setActiveTab('resources')}>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${activeTab === 'resources' ? 'bg-accent/50' : ''}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Resources</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="hidden md:flex">
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login to Your Account</DialogTitle>
                <DialogDescription>
                  Enter your credentials to access your personalized dashboard.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <Button variant="link" className="justify-start p-0 text-sm">Forgot password?</Button>
              </div>
              <div className="flex flex-col gap-2">
                <Button>Log In</Button>
                <p className="text-sm text-center mt-2">
                  Don't have an account? <Button variant="link" className="p-0">Sign Up</Button>
                </p>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                <UserPlus className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Account</DialogTitle>
                <DialogDescription>
                  Sign up to get personalized college recommendations.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="your@email.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" placeholder="••••••••" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
              </div>
              <Button className="w-full">Create Account</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;

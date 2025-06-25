import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Home, BookOpen, BarChart, FileText, LogIn, UserPlus } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface RegisterResponse {
  id: string;
  name: string;
  email: string;
}

const Header = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { toast } = useToast();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value
    });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.id]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post<LoginResponse>('http://localhost:5001/api/users/login', {
        email: loginData.email,
        password: loginData.password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        setIsLoginOpen(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match!",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Attempting to register user:', { ...signupData, password: '[REDACTED]' });
      
      // Register the user
      const registerResponse = await axios.post<RegisterResponse>('http://localhost:5001/api/users/register', {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password
      });
      
      console.log('Registration successful:', registerResponse.data);
      
      if (registerResponse.data) {
        // Login the user to get the token
        console.log('Attempting to login with new credentials');
        const loginResponse = await axios.post<LoginResponse>('http://localhost:5001/api/users/login', {
          email: signupData.email,
          password: signupData.password
        });
        
        console.log('Login successful:', { ...loginResponse.data, token: '[REDACTED]' });
        
        if (loginResponse.data.token) {
          localStorage.setItem('token', loginResponse.data.token);
          toast({
            title: "Success",
            description: "Account created successfully!",
          });
          setIsSignupOpen(false);
        }
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      console.error('Error response:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || 'Failed to create account. Please try again.';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
          
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
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
              <form onSubmit={handleLogin} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <Button variant="link" className="justify-start p-0 text-sm">Forgot password?</Button>
              </form>
              <div className="flex flex-col gap-2">
                <Button onClick={handleLogin} disabled={loading}>
                  {loading ? 'Logging in...' : 'Log In'}
                </Button>
                <p className="text-sm text-center mt-2">
                  Don't have an account? <Button variant="link" className="p-0" onClick={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}>Sign Up</Button>
                </p>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
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
              <form onSubmit={handleSignup} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={signupData.name}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••" 
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
              </form>
              <Button onClick={handleSignup} disabled={loading} className="w-full">
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;

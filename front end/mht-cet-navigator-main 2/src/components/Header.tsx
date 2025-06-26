import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Home, BookOpen, BarChart, FileText, LogIn, UserPlus, User, Eye, EyeOff } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [signupError, setSignupError] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);

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
      const response = await axios.post<LoginResponse>('https://mht-cet-navigator.onrender.com/api/users/login', {
        email: loginData.email,
        password: loginData.password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.user.name || '');
        localStorage.setItem('userEmail', response.data.user.email || '');
        setIsLoggedIn(true);
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

  const validatePassword = (password: string) => {
    const minLength = /.{8,}/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    const special = /[^A-Za-z0-9]/;
    if (!minLength.test(password)) return 'Password must be at least 8 characters long.';
    if (!upper.test(password)) return 'Password must contain at least one uppercase letter.';
    if (!lower.test(password)) return 'Password must contain at least one lowercase letter.';
    if (!number.test(password)) return 'Password must contain at least one number.';
    if (!special.test(password)) return 'Password must contain at least one special character.';
    return '';
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    const passwordValidation = validatePassword(signupData.password);
    if (passwordValidation) {
      setSignupError(passwordValidation);
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match!');
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
      const registerResponse = await axios.post<RegisterResponse>('https://mht-cet-navigator.onrender.com/api/users/register', {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password
      });
      
      console.log('Registration successful:', registerResponse.data);
      
      if (registerResponse.data) {
        // Login the user to get the token
        console.log('Attempting to login with new credentials');
        const loginResponse = await axios.post<LoginResponse>('https://mht-cet-navigator.onrender.com/api/users/login', {
          email: signupData.email,
          password: signupData.password
        });
        
        console.log('Login successful:', { ...loginResponse.data, token: '[REDACTED]' });
        
        if (loginResponse.data.token) {
          localStorage.setItem('token', loginResponse.data.token);
          localStorage.setItem('userName', loginResponse.data.user.name || '');
          localStorage.setItem('userEmail', loginResponse.data.user.email || '');
          setIsLoggedIn(true);
          setIsSignupOpen(false);
          toast({
            title: "Success",
            description: "Account created successfully!",
          });
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

  useEffect(() => {
    const syncLoginState = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
      setUserName(localStorage.getItem('userName') || '');
      setUserEmail(localStorage.getItem('userEmail') || '');
    };
    window.addEventListener('storage', syncLoginState);
    // Listen for custom event to open login modal
    const openLoginHandler = () => setIsLoginOpen(true);
    window.addEventListener('open-login-modal', openLoginHandler);
    return () => {
      window.removeEventListener('storage', syncLoginState);
      window.removeEventListener('open-login-modal', openLoginHandler);
    };
  }, []);

  return (
    <header className="py-4 px-6 md:px-10 backdrop-blur-sm sticky top-0 z-50 border-b border-neutral/20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" onClick={() => setActiveTab('home')} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-neutral font-bold text-xl">A</span>
            </div>
            <h1 className="text-xl font-bold">AI College Buddy</h1>
          </Link>
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
          
          {!isLoggedIn ? (
            <>
              <Button variant="outline" onClick={() => setIsLoginOpen(true)}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
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
                    <div className="grid gap-2 relative">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type={showLoginPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                      />
                      <button type="button" className="absolute right-2 top-9 text-gray-500" onClick={() => setShowLoginPassword(v => !v)} tabIndex={-1}>
                        {showLoginPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
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
                        placeholder="Bhupendra jogi" 
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
                    <div className="grid gap-2 relative">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type={showSignupPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        required
                      />
                      <button type="button" className="absolute right-2 top-9 text-gray-500" onClick={() => setShowSignupPassword(v => !v)} tabIndex={-1}>
                        {showSignupPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </div>
                    <div className="grid gap-2 relative">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showSignupConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        required
                      />
                      <button type="button" className="absolute right-2 top-9 text-gray-500" onClick={() => setShowSignupConfirm(v => !v)} tabIndex={-1}>
                        {showSignupConfirm ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </div>
                  </form>
                  {signupError && <p className="text-red-500 text-sm text-center mt-2">{signupError}</p>}
                  <Button onClick={handleSignup} disabled={loading} className="w-full">
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </DialogContent>
              </Dialog>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity" onClick={() => setIsSignupOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {userName.trim() ? userName.trim()[0].toUpperCase() : (userEmail.trim() ? userEmail.trim()[0].toUpperCase() : 'U')}
                  </div>
                  <span className="font-medium text-base">{userName.split(' ')[0] || userEmail}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('userName');
                  localStorage.removeItem('userEmail');
                  setIsLoggedIn(false);
                  setUserName('');
                  setUserEmail('');
                }}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

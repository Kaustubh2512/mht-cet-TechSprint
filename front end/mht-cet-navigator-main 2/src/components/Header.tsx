import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Home, BookOpen, BarChart, FileText, LogIn, UserPlus, User, Eye, EyeOff, Menu } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';

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
    <>
      <header className="py-4 px-6 md:px-10 backdrop-blur-sm sticky top-0 z-50 border-b border-neutral/20">
        <div className="container mx-auto flex items-center justify-between relative">
          {/* Profile/Login (left on mobile) */}
          <div className="flex items-center gap-2 md:order-1 order-1 w-1/3 justify-start"></div>
          {/* Logo (left on desktop, center on mobile) */}
          <div className="flex items-center gap-2 md:order-2 order-2 justify-start">
            <Link to="/" onClick={(e) => { setActiveTab('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-neutral font-bold text-xl">A</span>
              </div>
              <h1 className="text-xl font-bold whitespace-nowrap">AI College Buddy</h1>
            </Link>
          </div>
          {/* Theme Switcher always visible */}
          <div className="flex items-center md:hidden order-3 w-auto justify-center">
            <ThemeSwitcher />
          </div>
          {/* Desktop NavigationMenu (center, only on md+) */}
          <div className="hidden md:flex flex-1 justify-center order-3">
            <NavigationMenu>
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
          </div>
          {/* Hamburger (right on mobile) and desktop controls */}
          <div className="flex items-center gap-4 md:order-4 order-3 w-1/3 justify-end">
            {/* Mobile Hamburger Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex md:hidden items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ml-7">
                  <Menu className="h-7 w-7" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="md:hidden p-0">
                <div className="flex flex-col gap-4 p-6">
                  {/* User profile/login at top of drawer */}
                  {!isLoggedIn ? (
                    <Button variant="outline" className="w-full" onClick={() => { setIsLoginOpen(true); }}>
                      <LogIn className="mr-2 h-5 w-5" /> Login
                    </Button>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg cursor-pointer mx-auto mb-2">
                          {userName.trim() ? userName.trim()[0].toUpperCase() : (userEmail.trim() ? userEmail.trim()[0].toUpperCase() : 'U')}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
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
                  <nav className="flex flex-col gap-4 mt-2">
                    <Link to="/" className="flex items-center gap-2 text-lg font-medium" onClick={() => setActiveTab('home')}><Home className="h-5 w-5" /> Home</Link>
                    <Link to="/predictor" className="flex items-center gap-2 text-lg font-medium" onClick={() => setActiveTab('predictor')}><GraduationCap className="h-5 w-5" /> Predictor</Link>
                    <Link to="/colleges" className="flex items-center gap-2 text-lg font-medium" onClick={() => setActiveTab('colleges')}><BookOpen className="h-5 w-5" /> Colleges</Link>
                    <Link to="/insights" className="flex items-center gap-2 text-lg font-medium" onClick={() => setActiveTab('insights')}><BarChart className="h-5 w-5" /> Insights</Link>
                    <Link to="/resources" className="flex items-center gap-2 text-lg font-medium" onClick={() => setActiveTab('resources')}><FileText className="h-5 w-5" /> Resources</Link>
                    <SheetClose asChild>
                      <button className="mt-6 w-full py-2 rounded bg-primary text-white font-semibold">Close</button>
                    </SheetClose>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            {/* End Mobile Hamburger Menu */}
            {/* Desktop controls (unchanged) */}
            <div className="hidden md:flex items-center gap-4">
              {/* Only one ThemeSwitcher here */}
              <ThemeSwitcher />
              {!isLoggedIn ? (
                <>
                  <Button variant="outline" onClick={() => setIsLoginOpen(true)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
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
        </div>
      </header>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="p-4 sm:p-6 max-w-xs w-full sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Login to your account</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">Access personalized features and save your progress.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-4">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input id="email" type="email" value={loginData.email} onChange={handleLoginChange} required autoFocus />
            <Label htmlFor="password" className="text-sm">Password</Label>
            <div className="relative">
              <Input id="password" type={showLoginPassword ? 'text' : 'password'} value={loginData.password} onChange={handleLoginChange} required />
              <button type="button" className="absolute right-2 top-2 text-muted-foreground" onClick={() => setShowLoginPassword(v => !v)} tabIndex={-1}>
                {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Button type="submit" className="w-full mt-1 sm:mt-2" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
            <div className="text-xs sm:text-sm text-center mt-2">
              Don't have an account?{' '}
              <button type="button" className="text-primary underline" onClick={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}>Sign up</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogContent className="p-4 sm:p-6 max-w-xs w-full sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Create your account</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">Sign up to unlock all features and save your preferences.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignup} className="flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-4">
            <Label htmlFor="name" className="text-sm">Name</Label>
            <Input id="name" type="text" value={signupData.name} onChange={handleSignupChange} required autoFocus />
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input id="email" type="email" value={signupData.email} onChange={handleSignupChange} required />
            <Label htmlFor="password" className="text-sm">Password</Label>
            <div className="relative">
              <Input id="password" type={showSignupPassword ? 'text' : 'password'} value={signupData.password} onChange={handleSignupChange} required />
              <button type="button" className="absolute right-2 top-2 text-muted-foreground" onClick={() => setShowSignupPassword(v => !v)} tabIndex={-1}>
                {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
            <div className="relative">
              <Input id="confirmPassword" type={showSignupConfirm ? 'text' : 'password'} value={signupData.confirmPassword} onChange={handleSignupChange} required />
              <button type="button" className="absolute right-2 top-2 text-muted-foreground" onClick={() => setShowSignupConfirm(v => !v)} tabIndex={-1}>
                {showSignupConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {signupError && <div className="text-red-600 text-xs sm:text-sm text-center">{signupError}</div>}
            <Button type="submit" className="w-full mt-1 sm:mt-2" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</Button>
            <div className="text-xs sm:text-sm text-center mt-2">
              Already have an account?{' '}
              <button type="button" className="text-primary underline" onClick={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}>Login</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;

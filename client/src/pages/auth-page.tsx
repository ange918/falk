import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function AuthPage() {
  const { login, register, user } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    setLocation(`/profile/${user.id}`);
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    
    const success = await login(email);
    if (!success) {
      alert("User not found (Try 'anna@fashion.com' or 'jean@design.com')");
    } else {
      // Login successful, redirect happens in component update or manual push
      // But context update will trigger re-render
    }
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    
    await register({
      username: (form.elements.namedItem('username') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      type: (form.elements.namedItem('type') as HTMLInputElement).value as any,
      bio: (form.elements.namedItem('bio') as HTMLTextAreaElement).value,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' // Default avatar for now
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center p-12 bg-black text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-black tracking-tighter mb-4">FASH’LINK</h1>
          <p className="text-lg text-gray-400 mb-8">
            Connect with top stylists and discover the next generation of fashion talent.
            Exclusive contracts, professional network, and curated portfolios.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-neutral-900 rounded-lg overflow-hidden">
               <img src="https://images.unsplash.com/photo-1550614000-4b9519e49427?w=500&h=500&fit=crop" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="aspect-square bg-neutral-900 rounded-lg overflow-hidden translate-y-8">
               <img src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=500&h=500&fit=crop" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:hidden">
             <h1 className="text-3xl font-black tracking-tighter">FASH’LINK</h1>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>Enter your email to sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Loading..." : "Sign In"}
                    </Button>
                    <div className="text-xs text-center text-muted-foreground mt-4">
                      Try: <code className="bg-muted px-1 rounded">anna@fashion.com</code> or <code className="bg-muted px-1 rounded">jean@design.com</code>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Join the exclusive network</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" name="username" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">I am a...</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="stylist" name="type" value="stylist" className="accent-black" defaultChecked />
                          <label htmlFor="stylist">Stylist</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="young_stylist" name="type" value="young_stylist" className="accent-black" />
                          <label htmlFor="young_stylist">Young Stylist</label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" placeholder="Tell us about your style..." />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

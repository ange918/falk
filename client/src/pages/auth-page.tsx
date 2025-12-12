import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload } from "lucide-react";

export default function AuthPage() {
  const { login, register, user } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

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
      alert("Utilisateur non trouvé (Essayez 'anna@fashion.com' ou 'jean@design.com')");
    }
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedPolicy) {
      alert("Veuillez accepter la politique de confidentialité.");
      return;
    }

    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    
    // In a real app, we would handle the file upload here. 
    // For mockup, we use the default or a placeholder.
    
    await register({
      username: (form.elements.namedItem('username') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      type: (form.elements.namedItem('type') as HTMLInputElement).value as any,
      bio: (form.elements.namedItem('bio') as HTMLTextAreaElement).value,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' 
    });
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center p-12 bg-black text-white">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-black tracking-tighter mb-4">FASH’LINK</h1>
          <p className="text-lg text-gray-400 mb-8">
            Connectez-vous avec les meilleurs stylistes et découvrez la prochaine génération de talents.
            Contrats exclusifs, réseau professionnel et portfolios curatés.
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

      <div className="flex items-center justify-center p-6 lg:p-12 overflow-y-auto max-h-screen">
        <div className="w-full max-w-md space-y-8 py-8">
          <div className="text-center lg:hidden">
             <h1 className="text-3xl font-black tracking-tighter">FASH’LINK</h1>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="rounded-none border-t-0 shadow-none">
                <CardHeader>
                  <CardTitle>Bon retour</CardTitle>
                  <CardDescription>Entrez votre email pour accéder à votre compte</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" placeholder="m@example.com" required className="rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input id="password" name="password" type="password" required className="rounded-none" />
                    </div>
                    <Button type="submit" className="w-full bg-black text-white rounded-none" disabled={isLoading}>
                      {isLoading ? "Chargement..." : "Se connecter"}
                    </Button>
                    <div className="text-xs text-center text-muted-foreground mt-4">
                      Essayer: <code className="bg-muted px-1 rounded">anna@fashion.com</code> ou <code className="bg-muted px-1 rounded">jean@design.com</code>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="rounded-none border-t-0 shadow-none">
                <CardHeader>
                  <CardTitle>Créer un compte</CardTitle>
                  <CardDescription>Rejoignez le réseau exclusif</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" name="firstName" required className="rounded-none" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" name="lastName" required className="rounded-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Nom d'utilisateur (Pseudo)</Label>
                      <Input id="username" name="username" required className="rounded-none" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required className="rounded-none" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Numéro de téléphone</Label>
                      <Input id="phone" name="phone" type="tel" required className="rounded-none" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input id="password" name="password" type="password" required className="rounded-none" />
                    </div>

                    <div className="space-y-2">
                      <Label>Type de compte</Label>
                      <div className="flex gap-4 p-4 border border-input bg-neutral-50">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="stylist" name="type" value="stylist" className="accent-black" defaultChecked />
                          <label htmlFor="stylist" className="font-medium cursor-pointer">Styliste</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="young_stylist" name="type" value="young_stylist" className="accent-black" />
                          <label htmlFor="young_stylist" className="font-medium cursor-pointer">Jeune Talent</label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                       <Label>Photo de profil</Label>
                       <div className="border-2 border-dashed border-gray-200 p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                          <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                          <span className="text-xs text-gray-500">Cliquez pour uploader une photo</span>
                          <input type="file" className="hidden" accept="image/*" />
                       </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" placeholder="Parlez-nous de votre style..." className="rounded-none" />
                    </div>

                    <div className="flex items-start space-x-2 py-4">
                      <Checkbox 
                        id="terms" 
                        checked={acceptedPolicy} 
                        onCheckedChange={(c) => setAcceptedPolicy(c as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          J'accepte la politique de confidentialité
                        </label>
                        <Dialog>
                          <DialogTrigger asChild>
                            <span className="text-xs text-muted-foreground underline cursor-pointer hover:text-black">
                              Lire la politique de confidentialité
                            </span>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>Politique de Confidentialité</DialogTitle>
                              <DialogDescription>
                                Veuillez lire attentivement avant d'accepter.
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-[400px] mt-4 p-4 border rounded bg-neutral-50 text-sm">
                              <h3 className="font-bold mb-2">1. Collecte des données</h3>
                              <p className="mb-4">Nous collectons vos informations personnelles (nom, email, téléphone) uniquement dans le but de faciliter la mise en relation professionnelle sur FASH'LINK.</p>
                              
                              <h3 className="font-bold mb-2">2. Utilisation des données</h3>
                              <p className="mb-4">Vos données sont utilisées pour : gérer votre compte, vous envoyer des notifications liées aux contrats, et améliorer nos services.</p>
                              
                              <h3 className="font-bold mb-2">3. Partage des données</h3>
                              <p className="mb-4">Nous ne vendons pas vos données. Elles sont partagées uniquement avec les autres utilisateurs avec qui vous choisissez d'interagir (par exemple lors d'un contrat).</p>
                              
                              <h3 className="font-bold mb-2">4. Sécurité</h3>
                              <p className="mb-4">Nous mettons en œuvre des mesures de sécurité conformes aux standards de l'industrie pour protéger vos informations.</p>
                              
                              <h3 className="font-bold mb-2">5. Vos droits</h3>
                              <p className="mb-4">Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.</p>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-black text-white rounded-none h-12 uppercase font-bold" disabled={isLoading}>
                      {isLoading ? "Création en cours..." : "Créer mon compte"}
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

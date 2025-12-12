import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-black text-white py-20 text-center">
        <div className="container px-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Contact</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Une question ? Un projet ? Écrivez-nous.
          </p>
        </div>
      </div>

      <div className="container px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-wide">Nos Coordonnées</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-bold">Siège Social</h3>
                  <p className="text-gray-600">12 Rue de la Mode<br/>75001 Paris, France</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-gray-600">contact@fashlink.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-bold">Téléphone</h3>
                  <p className="text-gray-600">+33 1 23 45 67 89</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-50 p-8 border border-neutral-100">
            <div className="space-y-2">
              <Label>Nom complet</Label>
              <Input required className="bg-white rounded-none" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" required className="bg-white rounded-none" />
            </div>
            <div className="space-y-2">
              <Label>Sujet</Label>
              <Input required className="bg-white rounded-none" />
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea required className="bg-white rounded-none min-h-[150px]" />
            </div>
            <Button type="submit" className="w-full bg-black text-white rounded-none h-12 font-bold uppercase">
              Envoyer
            </Button>
          </form>

        </div>
      </div>

      <Footer />
    </div>
  );
}

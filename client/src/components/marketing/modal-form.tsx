import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ModalFormProps {
  type: 'stylist' | 'young_stylist';
  triggerLabel: string;
}

export function ModalForm({ type, triggerLabel }: ModalFormProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setOpen(false);
    toast({
      title: "Candidature envoyée !",
      description: "Votre profil est en cours de validation par notre équipe.",
    });
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-neutral-800 rounded-none h-12 px-8 uppercase font-bold tracking-wide">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-none">
        <DialogHeader>
          <DialogTitle className="uppercase tracking-widest font-black text-xl">
            {type === 'stylist' ? 'Espace Créateur' : 'Jeune Talent'}
          </DialogTitle>
          <DialogDescription>
            {type === 'stylist' 
              ? "Rejoignez la communauté et trouvez vos futurs collaborateurs."
              : "Postulez pour accéder aux meilleures opportunités."
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nom complet</Label>
                <Input required placeholder="Jean Dupont" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label>Email professionnel</Label>
                <Input type="email" required placeholder="contact@example.com" className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label>Ville</Label>
                <Input required placeholder="Paris" className="rounded-none" />
              </div>
              <Button type="button" onClick={() => setStep(2)} className="w-full rounded-none bg-black text-white">
                Suivant
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Spécialités</Label>
                <Input required placeholder="Haute Couture, Streetwear..." className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label>Portfolio (URL ou Description)</Label>
                <Textarea required placeholder="Lien vers book ou Instagram..." className="rounded-none" />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-none">
                  Retour
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 rounded-none bg-black text-white">
                  {loading ? "Envoi..." : "Confirmer"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

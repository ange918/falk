import { Footer } from "@/components/marketing/footer";
import { PackCard } from "@/components/marketing/pack-card";
import { useToast } from "@/hooks/use-toast";

const PACKS = [
  {
    id: "pack_free",
    name: "GRATUIT",
    price: "0€",
    features: [
      "Profil public basique",
      "Recherche limitée",
      "10 contacts / mois"
    ],
    highlight: false
  },
  {
    id: "pack_stylist",
    name: "PREMIUM STYLISTE",
    price: "29€/mois",
    features: [
      "Profil mis en avant",
      "Recherche illimitée",
      "Contacts illimités",
      "Badge 'Vérifié'",
      "Support prioritaire"
    ],
    highlight: true
  },
  {
    id: "pack_credits",
    name: "PACK URGENT",
    price: "15€",
    features: [
      "Boost de visibilité 7 jours",
      "5 contacts d'urgence",
      "Accès CVthèque 24h"
    ],
    highlight: false
  }
];

export default function PacksPage() {
  const { toast } = useToast();

  const handleBuy = (packName: string) => {
    toast({
      title: "Redirection vers le paiement",
      description: `Vous avez sélectionné le pack ${packName}. (Simulation)`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-black text-white py-20 text-center">
        <div className="container px-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Nos Offres</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Des solutions adaptées à chaque étape de votre carrière.
          </p>
        </div>
      </div>

      <div className="container px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PACKS.map(pack => (
            <PackCard 
              key={pack.id}
              {...pack}
              onBuy={() => handleBuy(pack.name)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

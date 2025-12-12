import { Footer } from "@/components/marketing/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

export default function AboutPage() {
  const { toast } = useToast();

  const handleBuy = (packName: string) => {
    toast({
      title: "Redirection vers le paiement",
      description: `Vous avez sélectionné le pack ${packName}. (Simulation)`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="relative py-32 bg-neutral-100">
        <div className="container px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">À Propos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            FASH'LINK réinvente la collaboration dans l'industrie de la mode.
          </p>
        </div>
      </div>

      {/* How it works */}
      <section className="py-20">
        <div className="container px-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-16">Comment ça marche</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "1. Créez votre profil",
                desc: "Détaillez vos compétences, votre style et uploadez votre portfolio."
              },
              {
                title: "2. Connectez-vous",
                desc: "Explorez les profils, filtrez par critères et initiez le contact."
              },
              {
                title: "3. Collaborez",
                desc: "Signez des contrats, gérez vos missions et développez votre réseau."
              }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold uppercase mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section (Integrated from Packs) */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200" id="offres">
        <div className="container px-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-6">Nos Offres</h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">
            Des solutions adaptées pour accélérer votre carrière, que vous soyez un talent émergent ou un créateur confirmé.
          </p>
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
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container px-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-16">L'Équipe</h2>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            {[
              { name: "Sarah Cohen", role: "Co-fondatrice & CEO", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop" },
              { name: "Marc Levy", role: "Directeur Artistique", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" }
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-4 border-white shadow-lg">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold uppercase">{member.name}</h3>
                <p className="text-gray-500 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4 w-full bg-neutral-50 border-t border-neutral-200">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-12">FAQ</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Est-ce gratuit ?</AccordionTrigger>
            <AccordionContent>
              L'inscription est gratuite. Des fonctionnalités premium sont disponibles via nos packs ci-dessus.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Comment sont vérifiés les profils ?</AccordionTrigger>
            <AccordionContent>
              Chaque profil est vérifié manuellement par notre équipe sous 48h.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Puis-je annuler un contrat ?</AccordionTrigger>
            <AccordionContent>
              Oui, selon les conditions définies lors de la signature du contrat.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <Footer />
    </div>
  );
}


import { Footer } from "@/components/marketing/footer";
import { Layout } from "@/components/layout/layout";
import { Check, MessageSquare, Search, Map, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function FeaturesPage() {
  const features = [
    {
      icon: Search,
      title: "Recherche Avancée",
      desc: "Filtrez par style, localisation, disponibilité et compétences techniques."
    },
    {
      icon: MessageSquare,
      title: "Messagerie Directe",
      desc: "Échangez en temps réel, partagez des moodboards et validez les détails."
    },
    {
      icon: Map,
      title: "Géolocalisation",
      desc: "Trouvez des talents ou des missions à proximité de votre atelier."
    },
    {
      icon: Star,
      title: "Notation & Avis",
      desc: "Système de réputation transparent pour garantir la qualité."
    },
    {
      icon: Shield,
      title: "Contrats Sécurisés",
      desc: "Génération automatique de contrats et protection juridique."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* We can reuse the main Layout header or a specific marketing header. 
          For now, let's assume we will update the main Layout header to handle everything 
          and wrap this page in Layout later, or just include Header manually. 
          To keep it simple and consistent with other marketing pages, I'll just use the page content here
          and we will wrap everything in the main router.
      */}
      
      <div className="bg-neutral-100 py-20 text-center">
        <div className="container px-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Fonctionnalités</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une suite d'outils complète conçue pour les professionnels de la mode.
          </p>
        </div>
      </div>

      <div className="container px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 border border-neutral-200 hover:border-black transition-colors group">
              <f.icon className="w-10 h-10 mb-6 text-gray-400 group-hover:text-black transition-colors" />
              <h3 className="text-xl font-bold uppercase tracking-wide mb-3">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black text-white py-20 text-center">
        <div className="container px-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Découvrez nos offres</h2>
          <Link href="/packs">
            <Button className="bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 font-bold uppercase">
              Voir les packs
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

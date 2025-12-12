import { Hero } from "@/components/marketing/hero";
import { StatCounters } from "@/components/marketing/stat-counters";
import { Gallery } from "@/components/marketing/gallery";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star, Shield, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero 
        title="FASH'LINK"
        subtitle="La première plateforme connectant les stylistes confirmés aux talents de demain. Créez des synergies uniques."
        ctaPrimary={{ label: "Je suis Styliste", href: "/styliste" }}
        ctaSecondary={{ label: "Jeune Talent", href: "/jeune-styliste" }}
        backgroundImage="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Value Proposition / Pourquoi FASH'LINK */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Pourquoi FASH'LINK ?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous créons l'écosystème ultime pour la mode de demain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="bg-neutral-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide">Excellence</h3>
              <p className="text-gray-600">
                Une sélection rigoureuse des meilleurs profils pour garantir des collaborations de haut niveau.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-neutral-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide">Sécurité</h3>
              <p className="text-gray-600">
                Contrats encadrés et paiements sécurisés pour travailler en toute sérénité.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-neutral-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide">Communauté</h3>
              <p className="text-gray-600">
                Rejoignez un réseau exclusif de professionnels passionnés par la mode.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter">À Propos de nous</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              FASH'LINK est né d'un constat simple : le talent n'a pas d'âge, mais il a besoin d'opportunités.
              Nous connectons les visions établies avec l'audace de la nouvelle génération.
              Plus qu'une plateforme, nous sommes un incubateur de tendances.
            </p>
            <Link href="/about">
              <Button variant="outline" className="uppercase font-bold tracking-wide rounded-none border-black hover:bg-black hover:text-white">
                En savoir plus
              </Button>
            </Link>
          </div>
          <div className="flex-1 h-80 bg-gray-200 w-full relative overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2074&auto=format&fit=crop" 
               className="object-cover w-full h-full"
               alt="Atelier mode"
             />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-black text-white text-center">
        <div className="container px-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">L'Expérience FASH'LINK</h2>
          <div className="max-w-4xl mx-auto aspect-video bg-neutral-900 relative group cursor-pointer overflow-hidden rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
              alt="Video Cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-widest text-gray-400">
              Voir le film de présentation
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-neutral-50 border-y border-neutral-200">
        <StatCounters />
      </section>

      {/* Featured Gallery */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Réalisations</h2>
              <p className="text-gray-600">Découvrez les projets nés sur FASH'LINK</p>
            </div>
            <Link href="/explore">
              <Button variant="link" className="text-black font-bold uppercase tracking-wide group p-0">
                Voir tout <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <Gallery />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-black text-white text-center">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">Prêt à commencer ?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold px-12 h-14 rounded-none uppercase tracking-wide text-lg">
                Rejoindre maintenant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

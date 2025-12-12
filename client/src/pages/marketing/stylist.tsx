import { Hero } from "@/components/marketing/hero";
import { Footer } from "@/components/marketing/footer";
import { ModalForm } from "@/components/marketing/modal-form";
import { Check } from "lucide-react";

export default function StylistePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero 
        title="ESPACE CRÉATEUR"
        subtitle="Trouvez les talents qui donneront vie à votre vision. Déléguez, collaborez et grandissez."
        backgroundImage="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
      />

      <section className="py-20 bg-white">
        <div className="container px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Pourquoi nous rejoindre ?</h2>
            <ul className="space-y-4">
              {[
                "Accès à une base de talents vérifiés",
                "Contrats simplifiés et sécurisés",
                "Outils de gestion de projet intégrés",
                "Visibilité accrue dans l'industrie"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg">
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <ModalForm type="stylist" triggerLabel="Créer mon profil Styliste" />
            </div>
          </div>
          <div className="aspect-square bg-neutral-100 relative overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop" 
               className="object-cover w-full h-full"
               alt="Stylist working"
             />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

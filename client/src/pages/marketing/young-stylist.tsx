import { Hero } from "@/components/marketing/hero";
import { Footer } from "@/components/marketing/footer";
import { ModalForm } from "@/components/marketing/modal-form";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useState } from "react";

export default function YoungStylistPage() {
  const [locating, setLocating] = useState(false);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleLocate = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocating(false);
        },
        (error) => {
          console.error(error);
          setLocating(false);
          alert("Impossible de vous localiser.");
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Hero 
        title="JEUNE TALENT"
        subtitle="Lancez votre carrière. Accédez à des opportunités exclusives et faites-vous repérer par les plus grands."
        backgroundImage="https://images.unsplash.com/photo-1589363460779-cd717d2ed252?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">Processus de sélection</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "01", title: "Inscription" },
                { step: "02", title: "Portfolio" },
                { step: "03", title: "Validation" },
                { step: "04", title: "Missions" },
              ].map((s, i) => (
                <div key={i} className="bg-neutral-50 p-6 border border-neutral-100">
                  <div className="text-4xl font-black text-neutral-200 mb-2">{s.step}</div>
                  <div className="font-bold uppercase">{s.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black text-white p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold uppercase mb-4">Missions à proximité</h3>
            <p className="text-gray-400 mb-8">Trouvez des opportunités autour de vous.</p>
            
            {location ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-green-400 font-bold mb-4 flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" /> 
                  Localisé à {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
                <p className="text-xl font-bold">4 missions trouvées dans votre secteur !</p>
              </div>
            ) : (
              <Button 
                onClick={handleLocate} 
                disabled={locating}
                className="bg-white text-black hover:bg-gray-200 rounded-none h-12 px-8 font-bold uppercase"
              >
                {locating ? "Localisation..." : "Me localiser"}
              </Button>
            )}
          </div>

          <div className="mt-16 text-center">
            <ModalForm type="young_stylist" triggerLabel="Postuler maintenant" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

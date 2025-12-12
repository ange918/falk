import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-neutral-800">
      <div className="container px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-black mb-4 tracking-tighter">FASH'LINK</h3>
          <p className="text-gray-400 text-sm">
            La plateforme de référence pour connecter les talents de la mode.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 uppercase text-sm tracking-widest">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/"><a className="hover:text-white transition-colors">Accueil</a></Link></li>
            <li><Link href="/about"><a className="hover:text-white transition-colors">À propos</a></Link></li>
            <li><Link href="/contact"><a className="hover:text-white transition-colors">Contact</a></Link></li>
            <li><Link href="/auth"><a className="hover:text-white transition-colors">Connexion / Inscription</a></Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase text-sm tracking-widest">Légal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
            <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase text-sm tracking-widest">Suivez-nous</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
      <div className="container px-4 mt-12 pt-8 border-t border-neutral-900 text-center text-xs text-gray-600">
        © 2024 FASH'LINK. Tous droits réservés.
      </div>
    </footer>
  );
}

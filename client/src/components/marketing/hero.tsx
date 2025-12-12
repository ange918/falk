import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  backgroundImage?: string;
}

export function Hero({ title, subtitle, ctaPrimary, ctaSecondary, backgroundImage }: HeroProps) {
  return (
    <div className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={backgroundImage || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"} 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="container relative z-20 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-light"
        >
          {subtitle}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {ctaPrimary && (
            <Link href={ctaPrimary.href}>
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold px-8 h-12 rounded-none uppercase tracking-wide">
                {ctaPrimary.label}
              </Button>
            </Link>
          )}
          {ctaSecondary && (
            <Link href={ctaSecondary.href}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8 h-12 rounded-none uppercase tracking-wide">
                {ctaSecondary.label}
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}

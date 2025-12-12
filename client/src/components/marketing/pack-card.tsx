import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PackCardProps {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
  onBuy?: () => void;
}

export function PackCard({ name, price, features, highlight = false, onBuy }: PackCardProps) {
  return (
    <Card className={cn(
      "relative flex flex-col h-full rounded-none border-2 transition-transform hover:-translate-y-1 duration-300",
      highlight ? "border-black shadow-xl scale-105 z-10" : "border-gray-200"
    )}>
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 text-xs font-bold uppercase tracking-widest">
          Recommandé
        </div>
      )}
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg uppercase tracking-widest font-bold text-gray-500">{name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-black tracking-tighter">{price}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 py-6">
        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <Check className="w-5 h-5 shrink-0 text-black" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onBuy}
          className={cn(
            "w-full rounded-none h-12 uppercase font-bold tracking-wide",
            highlight ? "bg-black text-white hover:bg-neutral-800" : "bg-white text-black border-2 border-black hover:bg-gray-50"
          )}
        >
          Choisir ce pack
        </Button>
      </CardFooter>
    </Card>
  );
}

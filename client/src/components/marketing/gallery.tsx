import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const IMAGES = [
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1984&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a302d2052574?q=80&w=2070&auto=format&fit=crop"
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % IMAGES.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {IMAGES.map((src, index) => (
          <div 
            key={index} 
            className="aspect-[3/4] overflow-hidden cursor-pointer group relative"
            onClick={() => setSelectedImage(index)}
          >
            <img 
              src={src} 
              alt={`Gallery ${index}`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none h-[80vh] flex items-center justify-center">
          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <button 
                onClick={handlePrev}
                className="absolute left-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <img 
                src={IMAGES[selectedImage]} 
                alt="Selected" 
                className="max-h-full max-w-full object-contain"
              />
              
              <button 
                onClick={handleNext}
                className="absolute right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

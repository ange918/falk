import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
}

function Counter({ end, label, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center p-8 border border-neutral-200 bg-white">
      <div className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
        {count}{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-gray-500 font-medium">
        {label}
      </div>
    </div>
  );
}

export function StatCounters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
      <Counter end={1250} label="Profils Validés" />
      <Counter end={850} label="Missions Publiées" />
      <Counter end={45} label="Partenaires" suffix="+" />
    </div>
  );
}

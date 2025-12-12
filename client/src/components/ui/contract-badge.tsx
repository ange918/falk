import { cn } from "@/lib/utils";

export function ContractBadge({ className }: { className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white tracking-wide uppercase",
      className
    )}>
      Occupé
    </span>
  );
}

import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Search, 
  MessageSquare, 
  User, 
  LogOut,
  Menu
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/">
          <a className="text-xl font-black tracking-tighter hover:opacity-80 transition-opacity">
            FASH’LINK
          </a>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/">
            <a className={location === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
              Home
            </a>
          </Link>
          <Link href="/explore">
            <a className={location === "/explore" ? "text-primary" : "text-muted-foreground hover:text-primary"}>
              Explore
            </a>
          </Link>
          <Link href="/inbox">
            <a className={location.startsWith("/inbox") ? "text-primary" : "text-muted-foreground hover:text-primary"}>
              Messages
            </a>
          </Link>
          <Link href={`/profile/${user.id}`}>
            <a className={location.startsWith("/profile") ? "text-primary" : "text-muted-foreground hover:text-primary"}>
              Profile
            </a>
          </Link>
          <Button variant="ghost" size="icon" onClick={logout} title="Logout">
            <LogOut className="h-4 w-4" />
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/explore">Explore</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/inbox">Messages</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/profile/${user.id}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { 
  LogOut,
  Menu,
  ChevronDown,
  User
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/">
          <a className="text-xl font-black tracking-tighter hover:opacity-80 transition-opacity uppercase">
            FASH’LINK
          </a>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-bold uppercase tracking-wide">
          {!user ? (
            <>
              <Link href="/about">
                <a className={location === "/about" ? "text-black" : "text-gray-500 hover:text-black transition-colors"}>
                  À propos
                </a>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:text-gray-600 transition-colors focus:outline-none uppercase font-bold tracking-wide">
                  Catégories <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/styliste" className="w-full cursor-pointer">Styliste</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/jeune-styliste" className="w-full cursor-pointer">Jeune Talent</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/fonctionnalites">
                <a className={location === "/fonctionnalites" ? "text-black" : "text-gray-500 hover:text-black transition-colors"}>
                  Fonctionnalités
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/explore">
                <a className={location === "/explore" ? "text-black" : "text-gray-500 hover:text-black transition-colors"}>
                  Explorer
                </a>
              </Link>
              <Link href="/inbox">
                <a className={location.startsWith("/inbox") ? "text-black" : "text-gray-500 hover:text-black transition-colors"}>
                  Messages
                </a>
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-4">
              <Link href="/auth">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                   <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth" className="hidden md:block">
                <Button className="bg-black text-white hover:bg-neutral-800 rounded-none font-bold uppercase tracking-wide">
                  S'inscrire
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href={`/profile/${user.id}`}>
                <a className="flex items-center gap-2 font-bold hover:opacity-80">
                  <span className="hidden md:inline">{user.username}</span>
                  <div className="w-8 h-8 bg-neutral-100 rounded-full overflow-hidden border">
                    <img src={user.avatar} className="w-full h-full object-cover" />
                  </div>
                </a>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {!user ? (
                  <>
                    <DropdownMenuItem asChild><Link href="/styliste">Styliste</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/jeune-styliste">Jeune Talent</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/fonctionnalites">Fonctionnalités</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/packs">Nos Offres</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/about">À propos</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/contact">Contact</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/auth">Connexion</Link></DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild><Link href="/explore">Explorer</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/inbox">Messages</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href={`/profile/${user.id}`}>Mon Profil</Link></DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Déconnexion</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}


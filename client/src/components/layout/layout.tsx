import { Header } from "./header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 border-t text-center text-xs text-muted-foreground">
        <div className="container px-4">
          © 2024 FASH’LINK. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

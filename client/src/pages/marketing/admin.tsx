import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock pending users
const MOCK_PENDING = [
  { id: 1, name: "Lucas Mode", email: "lucas@example.com", type: "young_stylist", date: "2024-05-10" },
  { id: 2, name: "Sophie Design", email: "sophie@example.com", type: "stylist", date: "2024-05-11" },
];

export default function AdminPage() {
  const [users, setUsers] = useState(MOCK_PENDING);
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  const handleAction = (id: number, action: 'approve' | 'reject') => {
    setUsers(users.filter(u => u.id !== id));
    toast({
      title: action === 'approve' ? "Utilisateur validé" : "Utilisateur rejeté",
      description: `L'action a été effectuée avec succès.`,
      variant: action === 'reject' ? "destructive" : "default"
    });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <form onSubmit={handleLogin} className="bg-white p-8 shadow-lg max-w-sm w-full space-y-4">
          <h1 className="text-xl font-bold text-center">Administration</h1>
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="w-full border p-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">Connexion</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black uppercase">Tableau de bord Admin</h1>
          <Button variant="outline" onClick={() => setAuthenticated(false)}>Déconnexion</Button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Inscriptions en attente</h2>
          </div>
          <div className="divide-y">
            {users.map(user => (
              <div key={user.id} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-gray-500">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-xs uppercase font-bold tracking-wide rounded">
                    {user.type}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">Inscrit le {user.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleAction(user.id, 'approve')}
                  >
                    <Check className="w-4 h-4 mr-1" /> Valider
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleAction(user.id, 'reject')}
                  >
                    <X className="w-4 h-4 mr-1" /> Rejeter
                  </Button>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                Aucune inscription en attente.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

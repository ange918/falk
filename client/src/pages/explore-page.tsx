import { useState, useEffect } from "react";
import { Link } from "wouter";
import { storage, User } from "@/lib/storage";
import { ContractBadge } from "@/components/ui/contract-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function ExplorePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<'all' | 'stylist' | 'young_stylist'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const allUsers = storage.getUsers();
    setUsers(allUsers);
  }, []);

  const filteredUsers = users.filter(u => {
    const matchesType = filter === 'all' || u.type === filter;
    const matchesSearch = u.username.toLowerCase().includes(search.toLowerCase()) || 
                          u.bio.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="container py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Explore Talent</h1>
          <p className="text-muted-foreground text-sm">Discover the industry's best stylists.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-8 w-full sm:w-[200px]" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filter === 'all' ? "default" : "outline"} 
              onClick={() => setFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button 
              variant={filter === 'stylist' ? "default" : "outline"} 
              onClick={() => setFilter('stylist')}
              size="sm"
            >
              Stylists
            </Button>
            <Button 
              variant={filter === 'young_stylist' ? "default" : "outline"} 
              onClick={() => setFilter('young_stylist')}
              size="sm"
            >
              Young Talent
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <Link key={user.id} href={`/profile/${user.id}`}>
            <a className="block group">
              <Card className={`overflow-hidden transition-all hover:shadow-md ${user.isOccupied ? 'opacity-70 grayscale' : ''}`}>
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={user.avatar} 
                      alt={user.username} 
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                    {user.isOccupied && (
                      <div className="absolute top-2 right-2">
                        <ContractBadge />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <h3 className="font-bold truncate">{user.username}</h3>
                      <p className="text-xs opacity-90 capitalize">{user.type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                      {user.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>
      
      {filteredUsers.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
              No profiles found matching your criteria.
          </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useAuth } from "@/context/auth-context";
import { storage, User, Post, Contract } from "@/lib/storage";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContractBadge } from "@/components/ui/contract-badge";
import { Grid, Lock, Mail, Users, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const [, params] = useRoute("/profile/:id");
  const { user: currentUser, updateUser } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState({ followers: 0, following: 0, posts: 0 });

  const userId = params?.id;

  useEffect(() => {
    if (userId) {
      const users = storage.getUsers();
      const user = users.find(u => u.id === userId);
      setProfileUser(user || null);

      if (user) {
        const allPosts = storage.getPosts();
        const userPosts = allPosts.filter(p => p.userId === userId);
        setPosts(userPosts);
        setStats({
          followers: user.followers.length,
          following: user.following.length,
          posts: userPosts.length
        });
      }
    }
  }, [userId]);

  if (!profileUser) return <Layout><div>Loading...</div></Layout>;

  const isOwnProfile = currentUser?.id === profileUser.id;
  const canContract = currentUser?.type === 'stylist' && profileUser.type === 'young_stylist' && !profileUser.isOccupied;
  const isContractedWithMe = currentUser?.type === 'stylist' && profileUser.contractWith === currentUser?.id;
  
  // Can message if: 
  // 1. Not occupied
  // 2. Occupied BUT contracted with ME
  // 3. It's my own profile (disable button but logic is moot)
  const canMessage = !profileUser.isOccupied || isContractedWithMe;

  const handleProposeContract = () => {
    if (!currentUser) return;
    
    // Create contract
    const contracts = storage.getContracts();
    const newContract: Contract = {
      id: Math.random().toString(36).substr(2, 9),
      stylistId: currentUser.id,
      youngStylistId: profileUser.id,
      status: 'active',
      startDate: new Date().toISOString()
    };
    contracts.push(newContract);
    storage.setContracts(contracts);

    // Update profile user status
    const updatedProfileUser = { 
      ...profileUser, 
      isOccupied: true,
      contractWith: currentUser.id
    };
    
    // We need to update this user in storage. 
    // Since we don't have a direct 'updateUserById' in context exposed for ANY user, we use storage directly
    const allUsers = storage.getUsers();
    const idx = allUsers.findIndex(u => u.id === profileUser.id);
    if (idx !== -1) {
      allUsers[idx] = updatedProfileUser;
      storage.setUsers(allUsers);
    }
    
    setProfileUser(updatedProfileUser);
    
    toast({
      title: "Contract Signed!",
      description: `You have successfully contracted ${profileUser.username}.`,
    });
  };

  const handleMessage = () => {
    // Check for existing conversation or create one mock
    setLocation('/inbox');
  };

  const handleFollow = () => {
    if (!currentUser || !profileUser) return;
    
    const isFollowing = currentUser.following.includes(profileUser.id);
    let newFollowing = [...currentUser.following];
    let newFollowers = [...profileUser.followers];

    if (isFollowing) {
      newFollowing = newFollowing.filter(id => id !== profileUser.id);
      newFollowers = newFollowers.filter(id => id !== currentUser.id);
    } else {
      newFollowing.push(profileUser.id);
      newFollowers.push(currentUser.id);
    }

    // Update current user
    updateUser({ ...currentUser, following: newFollowing });

    // Update profile user (in local state + storage)
    const updatedProfileUser = { ...profileUser, followers: newFollowers };
    setProfileUser(updatedProfileUser);
    
    const allUsers = storage.getUsers();
    const idx = allUsers.findIndex(u => u.id === profileUser.id);
    if (idx !== -1) {
      allUsers[idx] = updatedProfileUser;
      storage.setUsers(allUsers);
    }
  };

  return (
    <Layout>
      <div className="container max-w-4xl py-8 px-4">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-2">
            <AvatarImage src={profileUser.avatar} className="object-cover" />
            <AvatarFallback>{profileUser.username[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <h1 className="text-2xl font-bold">{profileUser.username}</h1>
              {profileUser.isOccupied && <ContractBadge />}
              
              {!isOwnProfile && (
                <div className="flex gap-2 mt-2 md:mt-0">
                  <Button 
                    variant={currentUser?.following.includes(profileUser.id) ? "outline" : "default"}
                    size="sm"
                    onClick={handleFollow}
                  >
                    {currentUser?.following.includes(profileUser.id) ? "Following" : "Follow"}
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    disabled={!canMessage}
                    onClick={handleMessage}
                    title={!canMessage ? "User is currently under contract" : "Send message"}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Message
                  </Button>

                  {canContract && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">Propose Contract</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Propose Official Contract</DialogTitle>
                          <DialogDescription>
                            By proposing a contract, you are securing {profileUser.username} exclusively. 
                            Their profile will be marked as "OCCUPIED" and other stylists will be blocked from messaging them.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button onClick={handleProposeContract}>Confirm & Sign</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-center md:justify-start gap-6 text-sm">
              <div className="text-center md:text-left">
                <span className="font-bold block text-lg">{stats.posts}</span>
                <span className="text-muted-foreground">posts</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-bold block text-lg">{stats.followers}</span>
                <span className="text-muted-foreground">followers</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-bold block text-lg">{stats.following}</span>
                <span className="text-muted-foreground">following</span>
              </div>
            </div>

            <div className="max-w-md">
              <p className="font-medium">{profileUser.type === 'stylist' ? 'Stylist' : 'Young Stylist'}</p>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">{profileUser.bio}</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Gallery */}
        <div className="grid grid-cols-3 gap-1 md:gap-4">
            {posts.map(post => (
                <div key={post.id} className="relative aspect-square group bg-neutral-100 overflow-hidden">
                    <img src={post.imageUrl} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2">
                         <Heart className="w-5 h-5 fill-white" /> {post.likes.length}
                    </div>
                </div>
            ))}
            {/* Add more placeholders to fill grid if empty */}
            {posts.length === 0 && (
                <div className="col-span-3 py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                    No posts yet
                </div>
            )}
        </div>
      </div>
    </Layout>
  );
}

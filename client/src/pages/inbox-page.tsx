import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { storage, Message, User } from "@/lib/storage";
import { Layout } from "@/components/layout/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InboxPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    
    // Find all users who have exchanged messages with current user
    const allMessages = storage.getMessages();
    const allUsers = storage.getUsers();
    
    const contactIds = new Set<string>();
    allMessages.forEach(m => {
      if (m.senderId === user.id) contactIds.add(m.receiverId);
      if (m.receiverId === user.id) contactIds.add(m.senderId);
    });

    // Also add people we follow or follow us to start chats easily? 
    // For now stick to existing messages + maybe contract partners
    if (user.contractWith) contactIds.add(user.contractWith);

    const contacts = allUsers.filter(u => contactIds.has(u.id));
    setConversations(contacts);

    if (contacts.length > 0 && !selectedUser) {
      setSelectedUser(contacts[0]);
    }
  }, [user]);

  useEffect(() => {
    if (!user || !selectedUser) return;
    
    const allMessages = storage.getMessages();
    const chat = allMessages.filter(m => 
      (m.senderId === user.id && m.receiverId === selectedUser.id) ||
      (m.receiverId === user.id && m.senderId === selectedUser.id)
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    setMessages(chat);
  }, [selectedUser, user]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user || !selectedUser) return;

    const msg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      receiverId: selectedUser.id,
      content: newMessage,
      createdAt: new Date().toISOString(),
      read: false
    };

    const allMessages = storage.getMessages();
    allMessages.push(msg);
    storage.setMessages(allMessages);
    
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  if (!user) return null;

  const isBlocked = selectedUser?.isOccupied && selectedUser.contractWith !== user.id;

  return (
    <Layout>
      <div className="container max-w-6xl py-6 h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full border rounded-lg overflow-hidden bg-white shadow-sm">
          
          {/* Sidebar */}
          <div className="border-r flex flex-col h-full bg-gray-50/50">
            <div className="p-4 border-b font-semibold">Messages</div>
            <ScrollArea className="flex-1">
              {conversations.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedUser(contact)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors text-left",
                    selectedUser?.id === contact.id && "bg-gray-100 font-medium"
                  )}
                >
                  <Avatar>
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="truncate">{contact.username}</div>
                    <div className="text-xs text-muted-foreground truncate">{contact.type}</div>
                  </div>
                  {contact.isOccupied && <Lock className="w-3 h-3 text-red-500" />}
                </button>
              ))}
              {conversations.length === 0 && (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  No conversations yet.
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="col-span-2 flex flex-col h-full bg-white">
            {selectedUser ? (
              <>
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedUser.avatar} />
                      <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{selectedUser.username}</span>
                  </div>
                  {isBlocked && (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> RESTRICTED
                    </span>
                  )}
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map(msg => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                          msg.senderId === user.id
                            ? "ml-auto bg-black text-white"
                            : "bg-gray-100"
                        )}
                      >
                        {msg.content}
                      </div>
                    ))}
                    {messages.length === 0 && !isBlocked && (
                       <div className="text-center text-muted-foreground text-sm py-10">
                         Start the conversation with {selectedUser.username}
                       </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t mt-auto">
                  {isBlocked ? (
                    <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm text-center border border-red-100">
                      Messaging is disabled. This user is currently under exclusive contract.
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                      className="flex gap-2"
                    >
                      <Input 
                        value={newMessage} 
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                      />
                      <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

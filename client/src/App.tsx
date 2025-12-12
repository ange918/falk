import { Switch, Route } from "wouter";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import ExplorePage from "@/pages/explore-page";
import ProfilePage from "@/pages/profile-page";
import InboxPage from "@/pages/inbox-page";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AuthPage} />
      <Route path="/explore" component={ExplorePage} />
      <Route path="/profile/:id" component={ProfilePage} />
      <Route path="/inbox" component={InboxPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster />
    </AuthProvider>
  );
}

export default App;

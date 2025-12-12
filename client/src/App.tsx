import { Switch, Route } from "wouter";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";

// App Pages
import AuthPage from "@/pages/auth-page";
import ExplorePage from "@/pages/explore-page";
import ProfilePage from "@/pages/profile-page";
import InboxPage from "@/pages/inbox-page";

// Marketing Pages
import HomePage from "@/pages/marketing/home";
import StylistePage from "@/pages/marketing/stylist";
import YoungStylistPage from "@/pages/marketing/young-stylist";
import FeaturesPage from "@/pages/marketing/features";
import PacksPage from "@/pages/marketing/packs";
import AboutPage from "@/pages/marketing/about";
import ContactPage from "@/pages/marketing/contact";
import AdminPage from "@/pages/marketing/admin";
import { Layout } from "@/components/layout/layout";

function Router() {
  return (
    <Switch>
      {/* Marketing Routes (Public) */}
      <Route path="/" component={HomePage} />
      <Route path="/styliste" component={StylistePage} />
      <Route path="/jeune-styliste" component={YoungStylistPage} />
      <Route path="/fonctionnalites" component={FeaturesPage} />
      <Route path="/packs" component={PacksPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/admin" component={AdminPage} />

      {/* App Routes */}
      <Route path="/auth" component={AuthPage} />
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
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </AuthProvider>
  );
}

export default App;

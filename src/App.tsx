import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Portfolio from "@/pages/portfolio";
import Builder from "@/pages/builder";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import PortfolioEditor from "@/pages/portfolio-editor";
import MediaLibrary from "@/pages/media-library";
import PublishedPortfolios from "@/pages/published-portfolios";
import ProfileSettings from "@/pages/profile-settings";
import SubscriptionPage from "@/pages/subscription";
import BillingHistory from "@/pages/billing-history";
import HelpPage from "@/pages/help";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading ? (
        <Route path="/"><div className="p-10 text-center">Loading...</div></Route>
      ) : !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/:slug" component={Portfolio} />
        </>
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/dashboard/create" component={PortfolioEditor} />
          <Route path="/dashboard/portfolios" component={PublishedPortfolios} />
          <Route path="/dashboard/media" component={MediaLibrary} />
          <Route path="/dashboard/settings" component={ProfileSettings} />
          <Route path="/dashboard/subscription" component={SubscriptionPage} />
          <Route path="/dashboard/billing" component={BillingHistory} />
          <Route path="/dashboard/help" component={HelpPage} />
          <Route path="/builder" component={Builder} />
          <Route path="/builder/:id" component={Builder} />
          <Route path="/:slug" component={Portfolio} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

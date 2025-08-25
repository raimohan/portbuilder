import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Plus, ExternalLink, Settings, Eye } from "lucide-react";
import type { Portfolio } from "@/types";

export default function Home() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: portfolios, isLoading: portfoliosLoading } = useQuery({
    queryKey: ["/api/portfolios"],
    enabled: isAuthenticated,
    retry: false,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">Portfolio Builder</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user?.profileImageUrl && (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = "/api/logout"}
                data-testid="button-logout"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Your Portfolios</h2>
              <p className="text-gray-600 mt-2">
                Create and manage your professional portfolios
              </p>
            </div>
            <Link href="/builder">
              <Button className="bg-black text-white hover:bg-gray-800" data-testid="button-create-portfolio">
                <Plus className="w-4 h-4 mr-2" />
                Create Portfolio
              </Button>
            </Link>
          </div>
        </div>

        {/* Portfolios Grid */}
        {portfoliosLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : portfolios && portfolios.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio: Portfolio) => (
              <Card key={portfolio.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{portfolio.title || "Untitled Portfolio"}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        {portfolio.description || "No description"}
                      </CardDescription>
                    </div>
                    <Badge variant={portfolio.isPublished ? "default" : "secondary"}>
                      {portfolio.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="portfolio-mockup rounded-lg p-4 mb-4 h-32 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
                      <div className="h-2 bg-gray-300 rounded w-20 mx-auto mb-1"></div>
                      <div className="h-2 bg-gray-300 rounded w-16 mx-auto"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Link href={`/builder/${portfolio.id}`}>
                        <Button size="sm" variant="outline" data-testid={`button-edit-${portfolio.id}`}>
                          <Settings className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      {portfolio.isPublished && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(`/${portfolio.slug}`, '_blank')}
                          data-testid={`button-view-${portfolio.id}`}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      )}
                    </div>
                    {portfolio.isPublished && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => window.open(`/${portfolio.slug}`, '_blank')}
                        data-testid={`button-external-${portfolio.id}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Plus className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No portfolios yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first portfolio and showcase your work to the world.
              </p>
              <Link href="/builder">
                <Button className="bg-black text-white hover:bg-gray-800" data-testid="button-create-first-portfolio">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Portfolio
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

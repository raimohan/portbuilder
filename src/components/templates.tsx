import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { Template } from "@/types";

export default function Templates() {
  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
    retry: false,
  });

  return (
    <section id="templates" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Professional Templates
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose from our curated collection of modern, responsive templates
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-white rounded-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {templates?.map((template: Template) => (
              <Card key={template.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <img 
                  src={template.previewImage || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop"} 
                  alt={`${template.name} template`} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h4 className="font-semibold text-black mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={template.isPremium ? "default" : "secondary"}
                      className={template.isPremium ? "bg-black text-white" : "bg-gray-100 text-gray-700"}
                    >
                      {template.isPremium ? "Pro" : "Free"}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-black hover:bg-gray-100 p-0 h-auto font-normal"
                      data-testid={`button-preview-${template.id}`}
                    >
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Button 
            onClick={() => window.location.href = "/api/login"}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            data-testid="button-view-all-templates"
          >
            View All Templates
            <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

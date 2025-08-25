import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Mail, MapPin } from "lucide-react";

import type { PublicPortfolio } from "@/types";

export default function Portfolio() {
  const [match, params] = useRoute("/:slug");
  const slug = params?.slug;

  const { data: portfolio, isLoading, error } = useQuery<PublicPortfolio>({
    queryKey: [`/api/public/portfolios/${slug}`],
    enabled: !!slug,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-8">The portfolio you're looking for doesn't exist or isn't published.</p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-black text-white hover:bg-gray-800"
            data-testid="button-home"
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const { user, projects, skills } = portfolio;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {user?.profileImageUrl && (
            <img 
              src={user.profileImageUrl} 
              alt={`${user.firstName} ${user.lastName}`}
              className="w-32 h-32 rounded-full mx-auto mb-8 object-cover"
            />
          )}
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            {user?.firstName} {user?.lastName}
          </h1>
          
          {portfolio.description && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              {portfolio.description}
            </p>
          )}

          {user?.bio && (
            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
              {user.bio}
            </p>
          )}

          <div className="flex justify-center items-center space-x-6 text-gray-500">
            {user?.email && (
              <a 
                href={`mailto:${user.email}`} 
                className="flex items-center hover:text-black transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600">
                A selection of my recent work
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
                  {project.imageUrl && (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-black mb-3">{project.title}</h3>
                    {project.description && (
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex space-x-3">
                      {project.projectUrl && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(project.projectUrl, '_blank')}
                          data-testid={`button-project-${project.id}`}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                          data-testid={`button-github-${project.id}`}
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
                Skills & Expertise
              </h2>
              <p className="text-xl text-gray-600">
                Technologies and tools I work with
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill: any) => (
                <div key={skill.id} className="text-center p-6 rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold text-black mb-2">{skill.name}</h3>
                  {skill.category && (
                    <Badge variant="outline" className="mb-3">
                      {skill.category}
                    </Badge>
                  )}
                  {skill.proficiency && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-black h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.proficiency * 10}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
          <p className="text-gray-300 mb-6">
            Interested in collaborating? I'd love to hear from you.
          </p>
          
          {user?.email && (
            <Button 
              onClick={() => window.location.href = `mailto:${user.email}`}
              className="bg-white text-black hover:bg-gray-100"
              data-testid="button-contact-footer"
            >
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
          )}

          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400">
            <p>Built with Portfolio Builder</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

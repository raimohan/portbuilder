import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Eye, 
  Save, 
  Sparkles,
  ExternalLink,
  Github,
  Mail,
  Settings,
  Rocket
} from "lucide-react";

import type { Portfolio, Project, Skill, Template } from "@/types";

interface PortfolioBuilderProps {
  portfolioId?: string;
}

// Form schemas
const profileSchema = z.object({
  title: z.string().min(1, "Portfolio title is required"),
  description: z.string().optional(),
  bio: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores"),
});

const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  projectUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  technologies: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.string().optional(),
  proficiency: z.number().min(1).max(10).default(5),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type ProjectFormData = z.infer<typeof projectSchema>;
type SkillFormData = z.infer<typeof skillSchema>;

export default function PortfolioBuilder({ portfolioId }: PortfolioBuilderProps) {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isPublished, setIsPublished] = useState(false);

  const steps = ["Profile", "Projects", "Skills", "Template", "Publish"];

  // Fetch existing portfolio if editing
  const { data: portfolio, isLoading: portfolioLoading } = useQuery<Portfolio>({
    queryKey: [`/api/portfolios/${portfolioId}`],
    enabled: !!portfolioId,
    retry: false,
  });

  // Fetch templates
  const { data: templates } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
    retry: false,
  });

  // Fetch projects if editing
  const { data: existingProjects } = useQuery<Project[]>({
    queryKey: [`/api/portfolios/${portfolioId}/projects`],
    enabled: !!portfolioId,
    retry: false,
  });

  // Fetch skills if editing
  const { data: existingSkills } = useQuery<Skill[]>({
    queryKey: [`/api/portfolios/${portfolioId}/skills`],
    enabled: !!portfolioId,
    retry: false,
  });

  // Profile form
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      title: "",
      description: "",
      bio: "",
      username: "",
    },
  });

  // Project form
  const projectForm = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      projectUrl: "",
      githubUrl: "",
      technologies: [],
      featured: false,
    },
  });

  // Skill form
  const skillForm = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      category: "",
      proficiency: 5,
    },
  });

  // Initialize forms with existing data
  useEffect(() => {
    if (portfolio) {
      setIsEditing(true);
      setIsPublished(portfolio.isPublished || false);
      setSelectedTemplate(portfolio.templateId || "");
      
      profileForm.reset({
        title: portfolio.title || "",
        description: portfolio.description || "",
        bio: user?.bio || "",
        username: portfolio.slug || "",
      });
    }
  }, [portfolio, user, profileForm]);

  useEffect(() => {
    if (existingProjects) {
      setProjects(existingProjects);
    }
  }, [existingProjects]);

  useEffect(() => {
    if (existingSkills) {
      setSkills(existingSkills);
    }
  }, [existingSkills]);

  // Create/Update portfolio mutation
  const createPortfolioMutation = useMutation({
    mutationFn: async (data: any) => {
      if (portfolioId) {
        return await apiRequest("PATCH", `/api/portfolios/${portfolioId}`, data);
      } else {
        return await apiRequest("POST", "/api/portfolios", data);
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolios"] });
      toast({
        title: "Success",
        description: isEditing ? "Portfolio updated successfully" : "Portfolio created successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: "Failed to save portfolio",
        variant: "destructive",
      });
    },
  });

  // Publish portfolio mutation
  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!portfolioId) throw new Error("No portfolio ID");
      return await apiRequest("POST", `/api/portfolios/${portfolioId}/publish`, {});
    },
    onSuccess: () => {
      setIsPublished(true);
      queryClient.invalidateQueries({ queryKey: [`/api/portfolios/${portfolioId}`] });
      toast({
        title: "Success",
        description: "Portfolio published successfully! 🎉",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: "Failed to publish portfolio",
        variant: "destructive",
      });
    },
  });

  // AI content generation mutation
  const generateContentMutation = useMutation({
    mutationFn: async (type: string) => {
      const response = await apiRequest("POST", "/api/ai/generate", { 
        type, 
        context: profileForm.getValues() 
      });
      return response.json();
    },
    onSuccess: (data, type) => {
      if (type === "bio") {
        profileForm.setValue("bio", data.content);
      }
      toast({
        title: "Content Generated",
        description: "AI has generated content for you!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive",
      });
    },
  });

  const handleProfileSubmit = async (data: ProfileFormData) => {
    try {
      const portfolioData = {
        title: data.title,
        description: data.description,
        slug: data.username,
        templateId: selectedTemplate || (templates?.[0]?.id),
      };

      const response = await createPortfolioMutation.mutateAsync(portfolioData);
      const result = await response.json();
      
      if (!portfolioId) {
        // If creating new portfolio, redirect to edit mode
        setLocation(`/builder/${result.id}`);
      }
      
      setCurrentStep(1);
    } catch (error) {
      console.error("Profile submission error:", error);
    }
  };

  const addProject = async (data: ProjectFormData) => {
    if (!portfolioId) {
      // Add to local state if portfolio not created yet
      const newProject = {
        ...data,
        id: `temp-${Date.now()}`,
        portfolioId: "",
        order: projects.length,
        createdAt: new Date(),
      } as Project;
      setProjects([...projects, newProject]);
      projectForm.reset();
      return;
    }

    try {
      const response = await apiRequest("POST", `/api/portfolios/${portfolioId}/projects`, data);
      const newProject = await response.json();
      setProjects([...projects, newProject]);
      queryClient.invalidateQueries({ queryKey: [`/api/portfolios/${portfolioId}/projects`] });
      projectForm.reset();
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    }
  };

  const removeProject = async (projectId: string) => {
    if (projectId.startsWith('temp-')) {
      // Remove from local state
      setProjects(projects.filter(p => p.id !== projectId));
      return;
    }

    try {
      await apiRequest("DELETE", `/api/projects/${projectId}`, {});
      setProjects(projects.filter(p => p.id !== projectId));
      queryClient.invalidateQueries({ queryKey: [`/api/portfolios/${portfolioId}/projects`] });
      toast({
        title: "Success",
        description: "Project removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove project",
        variant: "destructive",
      });
    }
  };

  const addSkill = async (data: SkillFormData) => {
    if (!portfolioId) {
      // Add to local state if portfolio not created yet
      const newSkill = {
        ...data,
        id: `temp-${Date.now()}`,
        portfolioId: "",
        order: skills.length,
        createdAt: new Date(),
      } as Skill;
      setSkills([...skills, newSkill]);
      skillForm.reset();
      return;
    }

    try {
      const response = await apiRequest("POST", `/api/portfolios/${portfolioId}/skills`, data);
      const newSkill = await response.json();
      setSkills([...skills, newSkill]);
      queryClient.invalidateQueries({ queryKey: [`/api/portfolios/${portfolioId}/skills`] });
      skillForm.reset();
      toast({
        title: "Success",
        description: "Skill added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
    }
  };

  const removeSkill = async (skillId: string) => {
    if (skillId.startsWith('temp-')) {
      // Remove from local state
      setSkills(skills.filter(s => s.id !== skillId));
      return;
    }

    try {
      await apiRequest("DELETE", `/api/skills/${skillId}`, {});
      setSkills(skills.filter(s => s.id !== skillId));
      queryClient.invalidateQueries({ queryKey: [`/api/portfolios/${portfolioId}/skills`] });
      toast({
        title: "Success",
        description: "Skill removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove skill",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (portfolioLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
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
              <Button 
                variant="ghost" 
                onClick={() => setLocation("/")}
                data-testid="button-back-home"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold text-black">
                {isEditing ? "Edit Portfolio" : "Create Portfolio"}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {portfolioId && (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => window.open(`/${portfolio?.slug}`, '_blank')}
                    disabled={!isPublished}
                    data-testid="button-preview"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => publishMutation.mutate()}
                    disabled={publishMutation.isPending}
                    data-testid="button-publish"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    {isPublished ? "Published" : "Publish"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  index <= currentStep 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 font-medium ${
                  index <= currentStep ? 'text-black' : 'text-gray-500'
                }`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className={`mx-4 h-0.5 w-16 ${
                    index < currentStep ? 'bg-black' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Portfolio Profile
              </CardTitle>
              <CardDescription>
                Set up your basic portfolio information and personal details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
                  <FormField
                    control={profileForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="My Professional Portfolio" 
                            {...field} 
                            data-testid="input-title"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username (URL slug)</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">yoursite.com/</span>
                            <Input 
                              placeholder="your-name" 
                              {...field} 
                              data-testid="input-username"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A brief description of your portfolio..." 
                            {...field} 
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          Personal Bio
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => generateContentMutation.mutate("bio")}
                            disabled={generateContentMutation.isPending}
                            data-testid="button-generate-bio"
                          >
                            <Sparkles className="w-4 h-4 mr-1" />
                            {generateContentMutation.isPending ? "Generating..." : "AI Generate"}
                          </Button>
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about yourself..." 
                            {...field} 
                            rows={4}
                            data-testid="textarea-bio"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      disabled={createPortfolioMutation.isPending}
                      data-testid="button-next-profile"
                    >
                      {createPortfolioMutation.isPending ? "Saving..." : "Next"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Add your projects to showcase your work and experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Project Form */}
              <Form {...projectForm}>
                <form onSubmit={projectForm.handleSubmit(addProject)} className="space-y-4 p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold">Add New Project</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={projectForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="My Awesome Project" 
                              {...field} 
                              data-testid="input-project-title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={projectForm.control}
                      name="projectUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Live URL (optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://myproject.com" 
                              {...field} 
                              data-testid="input-project-url"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={projectForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your project..." 
                            {...field} 
                            data-testid="textarea-project-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={projectForm.control}
                      name="githubUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub URL (optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://github.com/user/repo" 
                              {...field} 
                              data-testid="input-github-url"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={projectForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL (optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/image.jpg" 
                              {...field} 
                              data-testid="input-image-url"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" data-testid="button-add-project">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </form>
              </Form>

              {/* Projects List */}
              {projects.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Your Projects ({projects.length})</h4>
                  {projects.map((project) => (
                    <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-semibold text-black">{project.title}</h5>
                          {project.description && (
                            <p className="text-gray-600 mt-1">{project.description}</p>
                          )}
                          <div className="flex space-x-4 mt-2 text-sm">
                            {project.projectUrl && (
                              <a 
                                href={project.projectUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-black hover:underline flex items-center"
                                data-testid={`link-project-${project.id}`}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Live Demo
                              </a>
                            )}
                            {project.githubUrl && (
                              <a 
                                href={project.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-black hover:underline flex items-center"
                                data-testid={`link-github-${project.id}`}
                              >
                                <Github className="w-3 h-3 mr-1" />
                                Source Code
                              </a>
                            )}
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeProject(project.id)}
                          data-testid={`button-remove-project-${project.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} data-testid="button-prev-projects">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={nextStep} data-testid="button-next-projects">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
              <CardDescription>
                Add your skills and rate your proficiency level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Skill Form */}
              <Form {...skillForm}>
                <form onSubmit={skillForm.handleSubmit(addSkill)} className="space-y-4 p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold">Add New Skill</h4>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={skillForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="React, Python, Design..." 
                              {...field} 
                              data-testid="input-skill-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={skillForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger data-testid="select-skill-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="soft">Soft Skills</SelectItem>
                                <SelectItem value="language">Language</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={skillForm.control}
                      name="proficiency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proficiency (1-10)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              max="10" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                              data-testid="input-skill-proficiency"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" data-testid="button-add-skill">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </form>
              </Form>

              {/* Skills List */}
              {skills.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Your Skills ({skills.length})</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-semibold text-black">{skill.name}</h5>
                            {skill.category && (
                              <Badge variant="secondary" className="text-xs mt-1">
                                {skill.category}
                              </Badge>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removeSkill(skill.id)}
                            data-testid={`button-remove-skill-${skill.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-black h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(skill.proficiency || 5) * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{skill.proficiency}/10</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} data-testid="button-prev-skills">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={nextStep} data-testid="button-next-skills">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose Template</CardTitle>
              <CardDescription>
                Select a template that best represents your style and profession.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {templates && (
                <div className="grid md:grid-cols-2 gap-6">
                  {templates.map((template: Template) => (
                    <div 
                      key={template.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        selectedTemplate === template.id 
                          ? 'border-black bg-gray-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                      data-testid={`template-${template.id}`}
                    >
                      <img 
                        src={template.previewImage || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=200&fit=crop"} 
                        alt={template.name}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                      <h4 className="font-semibold text-black mb-1">{template.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge 
                          variant={template.isPremium ? "default" : "secondary"}
                          className={template.isPremium ? "bg-black text-white" : "bg-gray-100 text-gray-700"}
                        >
                          {template.isPremium ? "Pro" : "Free"}
                        </Badge>
                        {selectedTemplate === template.id && (
                          <Badge className="bg-green-100 text-green-800 border-none">
                            Selected
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} data-testid="button-prev-template">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={nextStep} 
                  disabled={!selectedTemplate}
                  data-testid="button-next-template"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Rocket className="w-5 h-5 mr-2" />
                Publish Your Portfolio
              </CardTitle>
              <CardDescription>
                Review your portfolio and publish it to make it live.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Portfolio Summary */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold mb-4">Portfolio Summary</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Title:</span>
                    <span className="ml-2 font-medium">{profileForm.getValues('title')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">URL:</span>
                    <span className="ml-2 font-medium">/{profileForm.getValues('username')}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Projects:</span>
                    <span className="ml-2 font-medium">{projects.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Skills:</span>
                    <span className="ml-2 font-medium">{skills.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Template:</span>
                    <span className="ml-2 font-medium">
                      {templates?.find(t => t.id === selectedTemplate)?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <Badge 
                      variant={isPublished ? "default" : "secondary"}
                      className="ml-2"
                    >
                      {isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                {portfolioId && (
                  <Button 
                    variant="outline"
                    onClick={() => window.open(`/${portfolio?.slug}`, '_blank')}
                    disabled={!isPublished}
                    className="flex-1"
                    data-testid="button-preview-final"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Portfolio
                  </Button>
                )}
                
                <Button 
                  onClick={() => publishMutation.mutate()}
                  disabled={publishMutation.isPending || !portfolioId}
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                  data-testid="button-publish-final"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  {publishMutation.isPending ? "Publishing..." : isPublished ? "Update & Republish" : "Publish Portfolio"}
                </Button>
              </div>

              {isPublished && portfolio?.slug && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-semibold text-green-800">Portfolio is live!</span>
                  </div>
                  <p className="text-green-700 text-sm mb-3">
                    Your portfolio is now published and accessible to everyone.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/${portfolio.slug}`, '_blank')}
                      className="border-green-300 text-green-700 hover:bg-green-50"
                      data-testid="button-view-live"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Portfolio
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/${portfolio.slug}`);
                        toast({
                          title: "Link copied!",
                          description: "Portfolio URL has been copied to clipboard",
                        });
                      }}
                      className="border-green-300 text-green-700 hover:bg-green-50"
                      data-testid="button-copy-link"
                    >
                      📋 Copy Link
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} data-testid="button-prev-publish">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={() => setLocation("/")}
                  variant="outline"
                  data-testid="button-done"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Plus, 
  Upload, 
  Trash2,
  Layout,
  Palette,
  Type,
  Image as ImageIcon
} from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';

interface PortfolioData {
  id?: string;
  title: string;
  description: string;
  template: string;
  about: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    technologies: string[];
  }>;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    twitter: string;
  };
  published: boolean;
}

const templates = [
  { id: 'minimal', name: 'Minimal', image: '/templates/minimal.png', description: 'Clean and simple design' },
  { id: 'modern', name: 'Modern', image: '/templates/modern.png', description: 'Contemporary and professional' },
  { id: 'creative', name: 'Creative', image: '/templates/creative.png', description: 'Bold and artistic' },
  { id: 'corporate', name: 'Corporate', image: '/templates/corporate.png', description: 'Business-focused design' },
];

export default function PortfolioEditor() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [portfolio, setPortfolio] = useState<PortfolioData>({
    title: '',
    description: '',
    template: 'minimal',
    about: {
      name: user?.displayName || '',
      title: '',
      bio: '',
      avatar: user?.photoURL || '',
    },
    projects: [],
    contact: {
      email: user?.email || '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      twitter: '',
    },
    published: false,
  });

  const handleSave = async (publish = false) => {
    setIsSaving(true);
    try {
      // TODO: Save to Firebase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      
      setPortfolio(prev => ({ ...prev, published: publish }));
      
      toast({
        title: publish ? 'Portfolio published!' : 'Portfolio saved!',
        description: publish 
          ? 'Your portfolio is now live and accessible to visitors.'
          : 'Your changes have been saved as a draft.',
      });
    } catch (error) {
      toast({
        title: 'Error saving portfolio',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      image: '',
      link: '',
      technologies: [],
    };
    setPortfolio(prev => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const removeProject = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };

  const updateProject = (id: string, field: string, value: any) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button variant="ghost" onClick={() => setIsPreviewMode(false)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsPreviewMode(false)}>
                  Edit
                </Button>
                <Button onClick={() => handleSave(true)} disabled={isSaving}>
                  {isSaving ? 'Publishing...' : 'Publish Portfolio'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preview content would go here */}
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-4">{portfolio.title || 'Portfolio Preview'}</h1>
            <p className="text-gray-600 mb-8">{portfolio.description || 'Portfolio description will appear here'}</p>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">About</h2>
                <div className="flex items-center space-x-4">
                  {portfolio.about.avatar && (
                    <img 
                      src={portfolio.about.avatar} 
                      alt={portfolio.about.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-medium">{portfolio.about.name}</h3>
                    <p className="text-gray-600">{portfolio.about.title}</p>
                    <p className="text-gray-700 mt-2">{portfolio.about.bio}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolio.projects.map((project) => (
                    <Card key={project.id}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{project.title || 'Project Title'}</h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {project.description || 'Project description will appear here'}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-xl font-semibold text-gray-900">Portfolio Editor</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsPreviewMode(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={() => handleSave(false)} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button onClick={() => handleSave(true)} disabled={isSaving}>
                {isSaving ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" className="flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="template" className="flex items-center">
              <Layout className="w-4 h-4 mr-2" />
              Template
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center">
              <ImageIcon className="w-4 h-4 mr-2" />
              Media
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Set the title and description for your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Portfolio Title</Label>
                  <Input
                    id="title"
                    value={portfolio.title}
                    onChange={(e) => setPortfolio(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter portfolio title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={portfolio.description}
                    onChange={(e) => setPortfolio(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of your portfolio"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>
                  Personal information that will be displayed on your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={portfolio.about.name}
                      onChange={(e) => setPortfolio(prev => ({ 
                        ...prev, 
                        about: { ...prev.about, name: e.target.value }
                      }))}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={portfolio.about.title}
                      onChange={(e) => setPortfolio(prev => ({ 
                        ...prev, 
                        about: { ...prev.about, title: e.target.value }
                      }))}
                      placeholder="e.g., Full Stack Developer"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={portfolio.about.bio}
                    onChange={(e) => setPortfolio(prev => ({ 
                      ...prev, 
                      about: { ...prev.about, bio: e.target.value }
                    }))}
                    placeholder="Tell visitors about yourself"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Projects Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Projects
                  <Button onClick={addProject} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </CardTitle>
                <CardDescription>
                  Showcase your best work and projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {portfolio.projects.map((project, index) => (
                  <div key={project.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Project {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Project Title</Label>
                        <Input
                          value={project.title}
                          onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                          placeholder="Project title"
                        />
                      </div>
                      <div>
                        <Label>Project Link</Label>
                        <Input
                          value={project.link}
                          onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        placeholder="Describe your project"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Technologies (comma-separated)</Label>
                      <Input
                        value={project.technologies.join(', ')}
                        onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                        placeholder="React, TypeScript, Node.js"
                      />
                    </div>
                  </div>
                ))}
                {portfolio.projects.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Plus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No projects added yet</p>
                    <Button onClick={addProject} className="mt-2">
                      Add Your First Project
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  How visitors can get in touch with you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={portfolio.contact.email}
                      onChange={(e) => setPortfolio(prev => ({ 
                        ...prev, 
                        contact: { ...prev.contact, email: e.target.value }
                      }))}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={portfolio.contact.phone}
                      onChange={(e) => setPortfolio(prev => ({ 
                        ...prev, 
                        contact: { ...prev.contact, phone: e.target.value }
                      }))}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={portfolio.contact.location}
                    onChange={(e) => setPortfolio(prev => ({ 
                      ...prev, 
                      contact: { ...prev.contact, location: e.target.value }
                    }))}
                    placeholder="City, Country"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={portfolio.contact.linkedin}
                      onChange={(e) => setPortfolio(prev => ({ 
                        ...prev, 
                        contact: { ...prev.contact, linkedin: e.target.value }
                      }))}
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={portfolio.contact.github}
                      onChange={(e) => setPortfolio(prev => ({ 
                        ...prev, 
                        contact: { ...prev.contact, github: e.target.value }
                      }))}
                      placeholder="github.com/username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={portfolio.contact.twitter}
                      onChange={(e) => setPortfolio(prev => ({ 
                        ...prev, 
                        contact: { ...prev.contact, twitter: e.target.value }
                      }))}
                      placeholder="twitter.com/username"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="template" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
                <CardDescription>
                  Select a design template for your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        portfolio.template === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPortfolio(prev => ({ ...prev, template: template.id }))}
                    >
                      <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
                        <Layout className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media Library</CardTitle>
                <CardDescription>
                  Upload and manage images for your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">Drag and drop images here</p>
                  <p className="text-sm text-gray-500">or click to browse</p>
                  <Button className="mt-4">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Images
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Settings</CardTitle>
                <CardDescription>
                  Configure additional settings for your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SEO Settings</h4>
                    <p className="text-sm text-gray-600">Optimize your portfolio for search engines</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Analytics</h4>
                    <p className="text-sm text-gray-600">Track visitor statistics</p>
                  </div>
                  <Button variant="outline">Setup</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Custom Domain</h4>
                    <p className="text-sm text-gray-600">Use your own domain name</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Link, Rocket, Check } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Sparkles,
      title: "AI Content Generator",
      description: "Auto-create compelling About sections, skill descriptions, and project summaries. Let AI write your story professionally.",
      benefits: [
        "Professional bio writing",
        "Project descriptions",
        "Skills optimization"
      ]
    },
    {
      icon: Link,
      title: "Dynamic Routes",
      description: "Get your personalized URL like /username for instant sharing. Professional domains and SEO-optimized pages.",
      benefits: [
        "Custom /username URLs",
        "Domain connection",
        "SEO optimization"
      ]
    },
    {
      icon: Rocket,
      title: "One-click Deploy",
      description: "Publish instantly on Netlify, Vercel, or our hosting. Fast global CDN and automatic SSL certificates.",
      benefits: [
        "Netlify/Vercel integration",
        "Global CDN delivery",
        "Auto SSL certificates"
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Everything you need to build amazing portfolios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features that make portfolio creation effortless and professional
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-black mb-4">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 text-sm text-gray-500">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

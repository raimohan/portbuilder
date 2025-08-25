import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        { name: "1 portfolio site", included: true },
        { name: "Basic templates", included: true },
        { name: "/username URL", included: true },
        { name: "AI content generation", included: true },
        { name: "Branded footer", included: false }
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "per month",
      description: "Most popular choice",
      features: [
        { name: "Unlimited portfolio sites", included: true },
        { name: "Premium templates", included: true },
        { name: "Custom domain", included: true },
        { name: "Remove branding", included: true },
        { name: "Advanced analytics", included: true }
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Business",
      price: "$29",
      period: "per month",
      description: "For teams and agencies",
      features: [
        { name: "Everything in Pro", included: true },
        { name: "Team collaboration", included: true },
        { name: "White-label solution", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: true }
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free and upgrade as you grow
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={plan.name} className={`bg-white text-black rounded-2xl p-8 shadow-lg ${plan.popular ? 'ring-4 ring-gray-300 relative' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center mb-8 pb-0">
                <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                <div className="text-4xl font-bold mb-2">
                  {plan.price}
                  {plan.period && <span className="text-base font-normal text-gray-600 ml-1">{plan.period}</span>}
                </div>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-black" : "text-gray-400"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => window.location.href = "/api/login"}
                  className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200"
                  data-testid={`button-plan-${plan.name.toLowerCase()}`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Check, Clock, Smartphone } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex items-center">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center w-full">
          {/* Left Content */}
          <div className="mb-12 lg:mb-0 animate-fade-in">
            <Badge className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700 mb-6 border-none">
              <Sparkles className="w-4 h-4 mr-2 text-green-600" />
              AI-Powered Portfolio Creation
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
              <span className="block text-black">Build Your</span>
              <span className="block gradient-text">Portfolio</span>
              <span className="block gradient-text">in Minutes</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create stunning, responsive portfolios with AI-powered content generation. 
              No coding required. Deploy instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={() => window.location.href = "/auth"}
                size="lg"
                className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                data-testid="button-build-portfolio"
              >
                Build Your Portfolio
                <span className="ml-2">→</span>
              </Button>
              <Button 
                onClick={() => {
                  const element = document.getElementById('templates');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                size="lg"
                className="border-2 border-black text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-all duration-200"
                data-testid="button-browse-templates"
              >
                Browse Templates
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-600 mr-2" />
                No coding required
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-green-600 mr-2" />
                Deploy in seconds
              </div>
              <div className="flex items-center">
                <Smartphone className="w-4 h-4 text-green-600 mr-2" />
                Mobile responsive
              </div>
            </div>
          </div>
          
          {/* Right Content - Portfolio Preview */}
          <div className="relative animate-slide-up floating">
            <div className="relative transition-transform duration-700 ease-out will-change-transform lg:scale-[1.1] xl:scale-[1.25]">
              <img 
                src="https://i.postimg.cc/qB2YH2gP/Chat-GPT-Image-Aug-24-2025-08-53-01-PM.png"
                alt="Portfolio Builder Preview" 
                className="w-full h-auto drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4))'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

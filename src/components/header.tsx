import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-2xl font-bold text-black hover:text-gray-800 transition-colors"
              data-testid="button-logo"
            >
              Portfolio Builder
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                data-testid="nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                data-testid="nav-features"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('templates')} 
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                data-testid="nav-templates"
              >
                Templates
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                data-testid="nav-pricing"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                data-testid="nav-faq"
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-600 hover:text-black transition-colors duration-200 font-medium"
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={() => window.location.href = "/api/login"}
              className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              data-testid="button-build-now"
            >
              Build Now
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-100 mt-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200"
                data-testid="nav-mobile-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200"
                data-testid="nav-mobile-features"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('templates')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200"
                data-testid="nav-mobile-templates"
              >
                Templates
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200"
                data-testid="nav-mobile-pricing"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200"
                data-testid="nav-mobile-faq"
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200"
                data-testid="nav-mobile-contact"
              >
                Contact
              </button>
              <div className="px-3 py-2">
                <Button 
                  onClick={() => window.location.href = "/api/login"}
                  className="w-full bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200"
                  data-testid="button-mobile-build-now"
                >
                  Build Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

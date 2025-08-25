import { Button } from "@/components/ui/button";
import { Mail, Play } from "lucide-react";

export default function Footer() {
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
  };

  return (
    <>
      {/* Final CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to build your portfolio?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of professionals who've already created stunning portfolios. 
            Start building yours today — it's free!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={() => window.location.href = "/api/login"}
              size="lg"
              className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              data-testid="button-start-building"
            >
              Start Building Now
              <span className="ml-2">→</span>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200"
              data-testid="button-watch-demo"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <span className="mr-2">🛡️</span>
              No credit card required
            </div>
            <div className="flex items-center">
              <span className="mr-2">⏱️</span>
              2 minutes to get started
            </div>
            <div className="flex items-center">
              <span className="mr-2">👥</span>
              Join 10,000+ users
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-bold text-black mb-4">Portfolio Builder</div>
              <p className="text-gray-600 mb-4">
                The fastest way to create professional portfolios with AI-powered content and one-click deployment.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-black transition-colors duration-200" data-testid="link-twitter">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors duration-200" data-testid="link-linkedin">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors duration-200" data-testid="link-github">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-black mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button 
                    onClick={() => scrollToSection('features')} 
                    className="hover:text-black transition-colors duration-200"
                    data-testid="footer-features"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('templates')} 
                    className="hover:text-black transition-colors duration-200"
                    data-testid="footer-templates"
                  >
                    Templates
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('pricing')} 
                    className="hover:text-black transition-colors duration-200"
                    data-testid="footer-pricing"
                  >
                    Pricing
                  </button>
                </li>
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-changelog">Changelog</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-roadmap">Roadmap</a></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h4 className="font-semibold text-black mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-docs">Documentation</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-blog">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-help">Help Center</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-community">Community</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-status">Status</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-semibold text-black mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-about">About</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-careers">Careers</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-privacy">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-terms">Terms</a></li>
                <li><a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-contact">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Portfolio Builder. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-600 mt-4 md:mt-0">
              <a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-privacy-policy">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-terms-service">Terms of Service</a>
              <a href="#" className="hover:text-black transition-colors duration-200" data-testid="footer-cookie-policy">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

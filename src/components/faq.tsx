import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How quickly can I create a portfolio?",
      answer: "Most users complete their portfolio in under 10 minutes. Our AI-assisted onboarding wizard guides you through profile setup, project addition, and template customization quickly and efficiently."
    },
    {
      question: "Can I use my own domain name?",
      answer: "Yes! Pro and Business plans include custom domain support. We provide step-by-step DNS setup instructions and handle SSL certificates automatically for your custom domain."
    },
    {
      question: "Is the AI content generation really helpful?",
      answer: "Absolutely! Our AI analyzes your profile information and creates professional bios, project descriptions, and skill summaries. You can always edit and customize the generated content to match your voice."
    },
    {
      question: "Can I export my portfolio?",
      answer: "Yes! You can export your portfolio as a ZIP file containing HTML/CSS or as React components. This gives you complete ownership and the ability to host anywhere you prefer."
    },
    {
      question: "What kind of analytics do you provide?",
      answer: "We provide privacy-first analytics including visitor counts, traffic sources, popular projects, geographic data, and engagement metrics. Pro users get advanced analytics with detailed insights and reporting."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Portfolio Builder
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button 
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
                data-testid={`button-faq-${index}`}
              >
                <span className="font-semibold text-black">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                    openFAQ === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

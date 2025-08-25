export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Sign Up & Enter Details",
      description: "Create your account and tell us about yourself. Our AI will help guide you through the process."
    },
    {
      number: 2,
      title: "Choose Template & Customize",
      description: "Select from our professional templates and customize colors, fonts, and layout to match your style."
    },
    {
      number: 3,
      title: "Publish & Share",
      description: "Deploy your portfolio instantly and share your personalized URL. Your site is live in seconds."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to your professional portfolio
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center relative">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="text-white text-2xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
              
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

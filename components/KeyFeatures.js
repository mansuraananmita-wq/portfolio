export default function KeyFeatures() {
  const features = [
    {
      title: "Design",
      description: "Custom, clean design with a focus on great typography",
    },
    {
      title: "Development",
      description: "Optimized for mobile, SEO friendly, with fast loading speeds",
    },
    {
      title: "Interactions",
      description:
        "Animations and engaging interactions to stand out from competitors",
    },
  ];

  return (
    <div className="mb-16">
      <p className="font-bold text-[7vw] tracking-wide lg:py-[10vh] py-4 gradient-text">
        Key features
      </p>
      <div className="grid flex-wrap gap-8 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative rounded-2xl bg-gradient-to-br from-white to-slate-50 p-0.5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
          >
            <div className="h-full bg-white rounded-xl p-8 hover-lift">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 bg-white rounded-lg"></div>
                </div>
                <p className="font-bold text-[4.5vw] lg:text-3xl mb-3 text-slate-800">
                  {feature.title}
                </p>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

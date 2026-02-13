import React from 'react';
import { Utensils, ChefHat, Truck } from 'lucide-react';

const processes = [
    {
        icon: Utensils,
        title: "Curated Selection",
        description: "Our menu is a thoughtful curation of Italian classics, handpicked to offer a diverse and exquisite culinary journey."
    },
    {
        icon: ChefHat,
        title: "Masterful Craft",
        description: "Every dish is prepared by expert chefs using the freshest, high-quality ingredients to ensure authentic taste."
    },
    {
        icon: Truck,
        title: "Premium Delivery",
        description: "Experience white-glove delivery service that ensures your meal arrives fresh, hot, and ready to be savored."
    }
];

export default function About() {
    return (
        <section id="about" className="py-24 bg-zinc-900 text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="space-y-6">
                        <p className="text-sm font-medium tracking-[0.3em] text-gray-400 uppercase">Our Story</p>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight">
                            Redefining the <span className="italic text-gray-400">art</span> of dining at home.
                        </h2>
                        <p className="text-gray-300 text-lg font-light leading-relaxed">
                            Zara was born from a simple yet ambitious vision: to bring the sophistication of fine dining directly to your doorstep. We believe that convenience shouldn't come at the cost of quality.
                        </p>
                        <p className="text-gray-300 text-lg font-light leading-relaxed">
                            Our culinary philosophy is rooted in tradition but driven by innovation. We source only the finest ingredients, partnering with local farmers and premium suppliers to ensure every bite tells a story of excellence.
                        </p>
                    </div>
                    <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
                        <img
                            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80"
                            alt="Chef plating food"
                            className="object-cover w-full h-full opacity-80 hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>

                {/* Process Flow */}
                <div className="text-center mb-16">
                    <p className="text-sm font-medium tracking-[0.3em] text-gray-400 uppercase mb-4">The Process</p>
                    <h3 className="text-3xl font-serif font-medium">How We Serve You</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent z-0"></div>

                    {processes.map((step, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                                <step.icon className="w-10 h-10" strokeWidth={1.5} />
                            </div>
                            <h4 className="text-xl font-medium mb-3">{step.title}</h4>
                            <p className="text-gray-400 font-light leading-relaxed max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

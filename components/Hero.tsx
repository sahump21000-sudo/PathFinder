import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900 via-[#0f172a] to-[#0f172a] -z-10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="text-center max-w-4xl mx-auto space-y-8 z-10">
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-brand-100">AI-Powered Career Guidance</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Don't Follow the Crowd. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
            Find Your True Path.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Confused after 12th? Whether you want the stability of a Government job or the growth of the Private sector, we use advanced AI and real-time data to find every possible opportunity for you—even the ones nobody talks about.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-brand-500/25 flex items-center gap-2"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-lg transition-all flex items-center gap-2 backdrop-blur-sm">
            <Compass className="w-5 h-5 text-brand-400" />
            How it Works
          </button>
        </div>
      </div>
      
      {/* Stats ticker or trust indicators could go here */}
      <div className="absolute bottom-10 text-slate-500 text-sm">
        Powered by Google Gemini 3 & Live Search Data
      </div>
    </div>
  );
};

export default Hero;
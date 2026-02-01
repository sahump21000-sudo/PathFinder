import React, { useState } from 'react';
import Hero from './components/Hero';
import Wizard from './components/Wizard';
import Results from './components/Results';
import { UserProfile, CareerPath } from './types';
import { generateCareerPaths } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'hero' | 'wizard' | 'results'>('hero');
  const [paths, setPaths] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setView('wizard');
    setError(null);
  };

  const handleFormSubmit = async (profile: UserProfile) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateCareerPaths(profile);
      setPaths(result.paths);
      setView('results');
    } catch (err) {
      setError("We encountered an issue analyzing the data. Please check your connection and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPaths([]);
    setView('hero');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-brand-500 selection:text-white">
      
      {/* Navbar for Logo */}
      <div className="absolute top-0 left-0 w-full p-6 z-50 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="w-8 h-8 bg-gradient-to-tr from-brand-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-brand-500/20">
            CC
          </div>
          <span className="font-bold text-xl tracking-tight">CareerCompass</span>
        </div>
      </div>

      {error && (
        <div className="fixed top-20 right-4 z-50 bg-red-500/90 text-white px-6 py-4 rounded-lg shadow-xl backdrop-blur-md border border-red-400 animate-in slide-in-from-top-4">
          <p>{error}</p>
          <button onClick={() => setError(null)} className="text-xs underline mt-2">Dismiss</button>
        </div>
      )}

      {view === 'hero' && <Hero onStart={handleStart} />}
      {view === 'wizard' && <Wizard onSubmit={handleFormSubmit} isLoading={loading} />}
      {view === 'results' && <Results paths={paths} onReset={handleReset} />}
      
    </div>
  );
};

export default App;
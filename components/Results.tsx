import React, { useState } from 'react';
import { CareerPath } from '../types';
import { Briefcase, Building2, Users, Trophy, ExternalLink, Gem, DollarSign, ChevronRight, GraduationCap, Lock, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultsProps {
  paths: CareerPath[];
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ paths, onReset }) => {
  const [activeTab, setActiveTab] = useState<'Government' | 'Private'>('Government');
  const [selectedJob, setSelectedJob] = useState<CareerPath | null>(null);

  // Check what sectors we actually have data for
  const hasGovt = paths.some(p => p.sector === 'Government');
  const hasPrivate = paths.some(p => p.sector === 'Private');
  
  // Set initial tab based on available data
  React.useEffect(() => {
    if (!hasGovt && hasPrivate) setActiveTab('Private');
  }, [paths]);

  const currentSectorPaths = paths.filter(p => p.sector === activeTab);

  // Grouping Logic
  const highComp = currentSectorPaths.filter(p => p.category === 'High Competition');
  const moderateComp = currentSectorPaths.filter(p => p.category === 'Moderate Competition');
  const hiddenGems = currentSectorPaths.filter(p => p.category === 'Hidden Gem');

  const Section = ({ title, items, icon: Icon, colorClass, desc }: any) => (
    <div className="mb-10">
      <div className={`flex items-center gap-3 mb-4 pb-2 border-b border-slate-800 ${colorClass}`}>
        <Icon className="w-6 h-6" />
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
        <span className="ml-auto bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-full">{items.length}</span>
      </div>
      
      {items.length === 0 ? (
        <div className="text-slate-500 italic text-sm p-4 text-center border border-dashed border-slate-800 rounded-lg">
          No jobs found in this specific category for {activeTab}.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((path: CareerPath, idx: number) => (
            <div 
              key={path.id}
              onClick={() => setSelectedJob(path)}
              className="group bg-slate-800/30 hover:bg-slate-800 border border-slate-700/50 hover:border-brand-500/30 rounded-lg p-4 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                   path.category === 'High Competition' ? 'bg-red-500/10 text-red-500' :
                   path.category === 'Hidden Gem' ? 'bg-pink-500/10 text-pink-500' : 'bg-yellow-500/10 text-yellow-500'
                 }`}>
                   {idx + 1}
                 </div>
                 <div>
                   <h4 className="text-lg font-semibold text-white group-hover:text-brand-400 transition-colors">{path.title}</h4>
                   <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                     <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {path.averageSalary}</span>
                     <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {path.competitionLevel}</span>
                   </div>
                 </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white" />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 md:p-8 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Your Career Strategy</h2>
            <p className="text-slate-400">Categorized roadmap based on your preferences</p>
          </div>
          <button onClick={onReset} className="px-4 py-2 text-sm border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800">
            Start Over
          </button>
        </div>

        {/* Top Tabs (Govt / Private) */}
        <div className="flex mb-8 bg-slate-900/50 p-1 rounded-xl border border-slate-800">
          {hasGovt && (
            <button
              onClick={() => setActiveTab('Government')}
              className={`flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'Government' 
                  ? 'bg-brand-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" /> GOVERNMENT SECTOR
            </button>
          )}
          {hasPrivate && (
            <button
              onClick={() => setActiveTab('Private')}
              className={`flex-1 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'Private' 
                  ? 'bg-brand-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" /> PRIVATE SECTOR
            </button>
          )}
        </div>

        {/* 3-Column Layout for Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: High Competition / Elite */}
          <div className="bg-[#162032] rounded-2xl p-6 border border-slate-800">
             <Section 
               title="Elite & Difficult" 
               desc="High Prestige, High Competition"
               items={highComp} 
               icon={Trophy} 
               colorClass="text-red-400 border-red-500/30" 
             />
          </div>

          {/* Column 2: Moderate / Standard */}
          <div className="bg-[#162032] rounded-2xl p-6 border border-slate-800">
             <Section 
               title="Stable & Popular" 
               desc="Moderate Competition, Accessible"
               items={moderateComp} 
               icon={Star} 
               colorClass="text-yellow-400 border-yellow-500/30" 
             />
          </div>

          {/* Column 3: Hidden Gems */}
          <div className="bg-[#162032] rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
             {/* Decorative shine for hidden gems */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
             <Section 
               title="Hidden Gems" 
               desc="Low Competition, Underrated"
               items={hiddenGems} 
               icon={Gem} 
               colorClass="text-pink-400 border-pink-500/30" 
             />
          </div>

        </div>
      </div>

      {/* Modal Details */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setSelectedJob(null)}>
          <div className="bg-[#1e293b] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700 max-h-[90vh] overflow-y-auto flex flex-col animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700 bg-slate-900/50 flex justify-between items-start">
              <div>
                <div className="flex gap-2 mb-2">
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${selectedJob.sector === 'Government' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>{selectedJob.sector}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-slate-700 text-slate-300">{selectedJob.category}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm text-slate-500 uppercase font-bold mb-2">Description</h4>
                <p className="text-slate-300 leading-relaxed">{selectedJob.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-sm text-green-400 uppercase font-bold mb-1 flex items-center gap-2"><GraduationCap className="w-4 h-4"/> Eligibility</h4>
                  <p className="text-xs text-white">{selectedJob.eligibility}</p>
                </div>
                 <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-sm text-yellow-400 uppercase font-bold mb-1 flex items-center gap-2"><Users className="w-4 h-4"/> Competition</h4>
                  <p className="text-xs text-white">{selectedJob.competitionLevel}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{selectedJob.estimatedApplicants}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-brand-400 uppercase font-bold mb-3 flex items-center gap-2"><ExternalLink className="w-4 h-4"/> Sources</h4>
                <div className="bg-black/20 p-4 rounded-lg space-y-2">
                  {selectedJob.officialWebsite && (
                    <a href={selectedJob.officialWebsite} target="_blank" className="flex items-center justify-between text-white font-medium hover:text-brand-400 border-b border-slate-700/50 pb-2 mb-2">
                      Official Application Link <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {selectedJob.sourceUrls.map((url, i) => (
                    <a key={i} href={url} target="_blank" className="block text-xs text-slate-400 hover:text-brand-400 truncate">• {url}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
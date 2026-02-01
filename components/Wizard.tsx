import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Sparkles, MapPin, Banknote, Shield, Landmark, Building2, Stethoscope, Code, Gavel } from 'lucide-react';
import { UserProfile, EducationLevel, Stream, SectorPreference } from '../types';

interface WizardProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const COMMON_DOMAINS = [
  { id: 'Defence/Police', label: 'Army / Police / Defence', icon: Shield },
  { id: 'Banking/Finance', label: 'Banking & Finance', icon: Landmark },
  { id: 'Civil Services', label: 'Civil Services (IAS/State)', icon: Landmark },
  { id: 'Engineering/IT', label: 'Engineering & IT', icon: Code },
  { id: 'Medical', label: 'Medical / Healthcare', icon: Stethoscope },
  { id: 'Management', label: 'Management / MBA', icon: Building2 },
  { id: 'Law', label: 'Law / Judiciary', icon: Gavel },
  { id: 'Teaching', label: 'Teaching / Education', icon: CheckCircle },
];

const Wizard: React.FC<WizardProps> = ({ onSubmit, isLoading }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    level: EducationLevel.CLASS_12,
    stream: Stream.SCIENCE_PCM,
    subjects: '',
    targetDomains: [],
    preference: SectorPreference.BOTH,
    locationScope: 'All India',
    targetState: '',
    salaryExpectation: '3-6 LPA'
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const toggleDomain = (domain: string) => {
    setProfile(prev => ({
      ...prev,
      targetDomains: prev.targetDomains.includes(domain)
        ? prev.targetDomains.filter(d => d !== domain)
        : [...prev.targetDomains, domain]
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <h2 className="text-2xl font-bold text-white mb-2">Current Education Level</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(EducationLevel).map((level) => (
          <button
            key={level}
            onClick={() => setProfile({ ...profile, level })}
            className={`p-6 rounded-xl border text-left transition-all ${
              profile.level === level
                ? 'bg-brand-600 border-brand-500 text-white shadow-lg'
                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">{level}</span>
              {profile.level === level && <CheckCircle className="w-5 h-5" />}
            </div>
          </button>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold text-white mt-8 mb-2">Stream / Background</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.values(Stream).map((stream) => (
          <button
            key={stream}
            onClick={() => setProfile({ ...profile, stream })}
            className={`p-4 rounded-xl border text-left transition-all ${
              profile.stream === stream
                ? 'bg-brand-600 border-brand-500 text-white'
                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span className="font-medium">{stream}</span>
          </button>
        ))}
      </div>
       <div className="mt-4">
        <input 
          type="text"
          value={profile.subjects}
          onChange={(e) => setProfile({...profile, subjects: e.target.value})}
          placeholder="Specific Subjects (e.g. Psychology, Economics)"
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-brand-500 transition-all"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <h2 className="text-2xl font-bold text-white mb-2">Target Sectors</h2>
      <p className="text-slate-400">Select specific areas you are interested in (Multiple allowed)</p>
      
      <div className="grid grid-cols-2 gap-4">
        {COMMON_DOMAINS.map((domain) => {
          const Icon = domain.icon;
          const isSelected = profile.targetDomains.includes(domain.id);
          return (
            <button
              key={domain.id}
              onClick={() => toggleDomain(domain.id)}
              className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                isSelected
                  ? 'bg-brand-600 border-brand-500 text-white'
                  : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-brand-400'}`} />
              <span className="font-medium text-sm">{domain.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8">
        <h3 className="text-white font-bold mb-4">Overall Preference</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.values(SectorPreference).map((pref) => (
            <button
              key={pref}
              onClick={() => setProfile({ ...profile, preference: pref })}
              className={`px-4 py-3 rounded-lg text-sm font-bold transition-all border ${
                profile.preference === pref
                  ? 'bg-white text-brand-900 border-white'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
              }`}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <h2 className="text-2xl font-bold text-white mb-2">Location & Salary</h2>
      
      <div className="space-y-4">
        <label className="text-white font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-400" /> Job Location
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => setProfile({ ...profile, locationScope: 'All India' })}
            className={`flex-1 p-4 rounded-xl border transition-all ${
              profile.locationScope === 'All India'
                ? 'bg-brand-600 border-brand-500 text-white'
                : 'bg-slate-800/50 border-slate-700 text-slate-300'
            }`}
          >
            All India (Central)
          </button>
          <button
             onClick={() => setProfile({ ...profile, locationScope: 'State Specific' })}
             className={`flex-1 p-4 rounded-xl border transition-all ${
              profile.locationScope === 'State Specific'
                ? 'bg-brand-600 border-brand-500 text-white'
                : 'bg-slate-800/50 border-slate-700 text-slate-300'
            }`}
          >
            State Specific
          </button>
        </div>
        
        {profile.locationScope === 'State Specific' && (
          <div className="mt-2 animate-in fade-in slide-in-from-top-2">
            <input 
              type="text"
              value={profile.targetState}
              onChange={(e) => setProfile({...profile, targetState: e.target.value})}
              placeholder="Enter your State (e.g. Maharashtra, UP, Bihar)"
              className="w-full bg-slate-800 border border-brand-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              autoFocus
            />
          </div>
        )}
      </div>

      <div className="space-y-4 mt-8">
        <label className="text-white font-semibold flex items-center gap-2">
          <Banknote className="w-4 h-4 text-green-400" /> Expected Salary Range
        </label>
        <select
          value={profile.salaryExpectation}
          onChange={(e) => setProfile({...profile, salaryExpectation: e.target.value})}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500"
        >
          <option value="Start (< 3 LPA)">Entry Level / Start (&lt; 3 LPA)</option>
          <option value="3-6 LPA">3 - 6 LPA (Standard)</option>
          <option value="6-10 LPA">6 - 10 LPA (Good)</option>
          <option value="10-15 LPA">10 - 15 LPA (High)</option>
          <option value="15+ LPA">15+ LPA (Very High)</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-between text-slate-400 text-sm">
          <span>Step {step} of 3</span>
          <div className="flex gap-1">
            <div className={`h-1.5 w-8 rounded-full ${step >= 1 ? 'bg-brand-500' : 'bg-slate-700'}`}></div>
            <div className={`h-1.5 w-8 rounded-full ${step >= 2 ? 'bg-brand-500' : 'bg-slate-700'}`}></div>
            <div className={`h-1.5 w-8 rounded-full ${step >= 3 ? 'bg-brand-500' : 'bg-slate-700'}`}></div>
          </div>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-2xl">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <div className="mt-8 flex justify-between pt-6 border-t border-slate-700">
            {step > 1 ? (
              <button 
                onClick={handleBack}
                disabled={isLoading}
                className="px-6 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Back
              </button>
            ) : <div></div>}
            
            {step < 3 ? (
              <button 
                onClick={handleNext}
                className="px-8 py-3 bg-white text-brand-900 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={() => onSubmit(profile)}
                disabled={isLoading}
                className="px-8 py-3 bg-brand-600 text-white rounded-lg font-bold hover:bg-brand-500 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Finding Perfect Jobs...
                  </>
                ) : (
                  <>
                    See My Roadmap <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trees, 
  Info, 
  BrainCircuit, 
  ChevronRight, 
  BookOpen, 
  Zap, 
  Layers,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import TreeVisualizer from './components/Visualizers/TreeVisualizer';
import DataPlayground from './components/Playground/DataPlayground';
import AITutor from './components/Educational/AITutor';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'learn' | 'explore'>('learn');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-ink selection:text-white pb-20">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-10 pt-10 relative">
        <div className="fixed right-6 top-1/2 -translate-y-1/2 vertical-text text-[10px] font-bold tracking-widest opacity-20 pointer-events-none">
          VOL. 04 // MACHINE LEARNING SERIES
        </div>

        <header className="flex justify-between items-end border-b border-ink pb-8 mb-12">
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-[0.3em] uppercase mb-3 text-muted">
              Volume 04 // Machine Learning Series
            </span>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 border-2 border-ink flex items-center justify-center -rotate-3 hover:rotate-0 transition-transform">
                <Trees className="w-8 h-8" />
              </div>
              <h1 className="text-7xl lg:text-9xl serif italic leading-none tracking-tight">
                The Random Forest
              </h1>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <span className="text-6xl serif italic block leading-none">01</span>
            <span className="text-xs font-bold tracking-widest uppercase mt-2">Chapter Index</span>
            <nav className="flex items-center mt-6 border border-ink p-1">
              <button 
                onClick={() => setActiveTab('learn')}
                className={cn(
                  "px-4 py-1 text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeTab === 'learn' ? "bg-ink text-white" : "text-ink hover:bg-zinc-100"
                )}
              >
                Theory
              </button>
              <button 
                onClick={() => setActiveTab('explore')}
                className={cn(
                  "px-4 py-1 text-[10px] font-bold uppercase tracking-widest transition-all border-l border-ink",
                  activeTab === 'explore' ? "bg-ink text-white" : "text-ink hover:bg-zinc-100"
                )}
              >
                Explore
              </button>
            </nav>
          </div>
        </header>

        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-12 gap-10"
        >
          {activeTab === 'learn' ? (
            <>
              {/* Left Column: Theory */}
              <section className="col-span-12 lg:col-span-4 flex flex-col border-r border-ink pr-10">
                <motion.div variants={itemVariants} className="prose prose-sm prose-zinc">
                  <h2 className="text-3xl serif mb-6 italic">The Strength of Crowds</h2>
                  <p className="text-sm leading-relaxed mb-6 text-zinc-700">
                    A Random Forest is an ensemble learning method that operates by constructing a multitude of decision trees at training time. 
                    It is designed to solve the problem of single trees "overfitting" by aggregating their collective wisdom.
                  </p>
                  
                  <div className="bg-white p-8 border border-ink mb-10 relative">
                    <div className="absolute top-2 right-2 text-[8px] font-bold opacity-30">TECH SPEC // 04.A</div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                       <Layers className="w-4 h-4" /> Core Mechanism
                    </h3>
                    <ul className="space-y-4">
                      {[
                        { title: "Bagging", desc: "Bootstrap Aggregating" },
                        { title: "Sub-sampling", desc: "Random Feature Selection" },
                        { title: "Voting", desc: "Statistical Mode/Mean" }
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-ink mt-1.5 shrink-0" />
                          <div>
                            <span className="text-[11px] font-bold uppercase block tracking-wider">{item.title}</span>
                            <span className="text-[10px] text-muted uppercase tracking-tighter">{item.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <div className="mt-auto pt-10">
                  <button 
                    onClick={() => setActiveTab('explore')}
                    className="w-full py-5 border border-ink text-xs font-bold uppercase tracking-[0.3em] hover:bg-ink hover:text-white transition-all group flex items-center justify-center gap-3"
                  >
                    Enter Simulation <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </section>

              {/* Right Column: Visual and Tutor */}
              <section className="col-span-12 lg:col-span-8 flex flex-col gap-10">
                <motion.div variants={itemVariants} className="bg-cream-dark border border-ink p-1">
                  <div className="bg-white p-1">
                    <TreeVisualizer depth={3} seed={123} className="border-none shadow-none bg-transparent" />
                  </div>
                  <div className="p-3 border-t border-ink flex justify-between items-center bg-cream-dark">
                     <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">Decision Path // Visualization Model</span>
                     <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-ink" />
                        <div className="w-2 h-2 rounded-full border border-ink" />
                     </div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={itemVariants} className="space-y-6">
                    <h3 className="text-xl serif italic flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-muted" /> Theoretical Context
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-600">
                      Randomness is our greatest strength. By forcing each tree to see only a subset of features, we uncover patterns that a single "greedy" tree would miss. This is the essence of diversity in computation.
                    </p>
                    <div className="flex gap-10 border-t border-ink/10 pt-6">
                       <div>
                         <span className="text-[10px] font-bold uppercase block tracking-widest mb-1">Max Depth</span>
                         <span className="text-2xl font-mono">12.0</span>
                       </div>
                       <div>
                         <span className="text-[10px] font-bold uppercase block tracking-widest mb-1">Estimators</span>
                         <span className="text-2xl font-mono">100</span>
                       </div>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <AITutor />
                  </motion.div>
                </div>
              </section>
            </>
          ) : (
            <section className="col-span-12">
               <motion.div
                 variants={itemVariants}
                 className="mb-10 flex items-end justify-between border-b border-ink/20 pb-4"
               >
                 <div>
                   <h2 className="text-5xl serif italic leading-none">Simulation Sandbox</h2>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-2">Active Environment // V1.0</p>
                 </div>
                 <button 
                  onClick={() => setActiveTab('learn')}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-ink hover:bg-ink hover:text-white transition-all flex items-center gap-2"
                >
                  <ChevronRight className="w-3 h-3 rotate-180" /> Return to Index
                </button>
               </motion.div>
               <DataPlayground />
            </section>
          )}
        </motion.main>

        <footer className="mt-20 border-t border-ink pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex gap-12 text-[10px] font-bold uppercase tracking-widest">
             <span className="opacity-40">© 2026 ALGORITHMIC PRESS</span>
             {['Terms of Knowledge', 'Data Science Curated', 'Library'].map((link, i) => (
                <a key={i} href="#" className="hover:line-through transition-all">{link}</a>
             ))}
           </div>
           <div className="flex items-center gap-6">
             <span className="text-[10px] font-bold uppercase tracking-widest truncate">Next: Hyperparameter Tuning</span>
             <div className="w-16 h-px bg-ink" />
             <span className="text-xl serif italic">02</span>
           </div>
        </footer>
      </div>
    </div>
  );
}

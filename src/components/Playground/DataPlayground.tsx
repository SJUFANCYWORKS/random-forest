import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { Settings, RefreshCw, BarChart3, Trees } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface Point {
  x: number;
  y: number;
  label: 'A' | 'B';
}

const DataPlayground: React.FC = () => {
  const [numTrees, setNumTrees] = useState(5);
  const [maxDepth, setMaxDepth] = useState(3);
  const [seed, setSeed] = useState(1);

  // Generate some "classic" non-linear data
  const data: Point[] = useMemo(() => {
    const points: Point[] = [];
    const count = 50;
    for (let i = 0; i < count; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dist = Math.sqrt(Math.pow(x-50, 2) + Math.pow(y-50, 2));
        const label = dist + (Math.random() * 10 - 5) < 35 ? 'A' : 'B';
        points.push({ x, y, label });
    }
    return points;
  }, [seed]);

  const classAPoints = data.filter(p => p.label === 'A');
  const classBPoints = data.filter(p => p.label === 'B');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Simulation Controls */}
      <div className="bg-white border border-ink p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-10 border-b border-ink pb-4">
          <Settings className="w-5 h-5 text-ink" />
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-ink">Hyperparameters</h3>
        </div>

        <div className="space-y-10">
          <div>
            <div className="flex justify-between mb-3 items-end">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Number of Estimators</label>
              <span className="text-2xl serif italic text-ink leading-none">{numTrees}</span>
            </div>
            <input 
              type="range" min="1" max="100" step="1"
              value={numTrees}
              onChange={(e) => setNumTrees(parseInt(e.target.value))}
              className="w-full h-1 bg-ink/10 appearance-none cursor-pointer accent-ink"
            />
            <p className="text-[9px] text-muted uppercase mt-3 italic tracking-tighter">Affects voting stability</p>
          </div>

          <div>
            <div className="flex justify-between mb-3 items-end">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Max Depth Limit</label>
              <span className="text-2xl serif italic text-ink leading-none">{maxDepth}</span>
            </div>
            <input 
              type="range" min="1" max="8" step="1"
              value={maxDepth}
              onChange={(e) => setMaxDepth(parseInt(e.target.value))}
              className="w-full h-1 bg-ink/10 appearance-none cursor-pointer accent-ink"
            />
            <p className="text-[9px] text-muted uppercase mt-3 italic tracking-tighter">Controls node complexity</p>
          </div>

          <button 
            onClick={() => setSeed(s => s + 1)}
            className="w-full py-4 border border-ink text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-ink hover:text-white transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Recalculate Dataset
          </button>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="lg:col-span-2 bg-cream-dark border border-ink p-8 relative overflow-hidden">
        <div className="absolute top-6 left-6 z-10">
            <h3 className="serif italic text-2xl flex items-center gap-3">
              <BarChart3 className="w-5 h-5" />
              Decision Surface
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-1 opacity-50">Spatial Classification Mapping</p>
        </div>

        <div className="h-[450px] w-full mt-16 bg-white border border-ink flex items-center justify-center relative shadow-inner">
          <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
             {Array.from({ length: Math.min(numTrees, 12) }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute bg-ink/20 border border-ink/10"
                  style={{
                    left: `${Math.random() * 80}%`,
                    top: `${Math.random() * 80}%`,
                    width: `${15 + Math.random() * 30}%`,
                    height: `${15 + Math.random() * 30}%`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
             ))}
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
              <CartesianGrid strokeDasharray="2 2" stroke="#e5e5e5" />
              <XAxis type="number" dataKey="x" name="feature 1" hide />
              <YAxis type="number" dataKey="y" name="feature 2" hide />
              <ZAxis type="number" range={[100, 300]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #1A1A1A', color: '#1A1A1A', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }} />
              <Scatter name="Class A" data={classAPoints} fill="#1A1A1A" shape="rect" />
              <Scatter name="Class B" data={classBPoints} fill="#fff" stroke="#1A1A1A" strokeWidth={1.5} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 flex gap-8 justify-center border-t border-ink/10 pt-4">
            <div className="flex items-center gap-3 uppercase tracking-widest text-[9px] font-bold text-muted">
                <div className="w-3 h-3 bg-ink" />
                <span>Class A: Predominant</span>
            </div>
            <div className="flex items-center gap-3 uppercase tracking-widest text-[9px] font-bold text-muted">
                <div className="w-3 h-3 border border-ink bg-white" />
                <span>Class B: Minority</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DataPlayground;

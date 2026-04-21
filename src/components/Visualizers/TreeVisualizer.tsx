import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Trees, Info, BrainCircuit, Play, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Node {
  id: string;
  label: string;
  isLeaf?: boolean;
  value?: string;
  children?: [Node, Node];
}

interface TreeVisualizerProps {
  depth: number;
  seed: number;
  variant?: 'single' | 'ensemble';
  className?: string;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ depth, seed, variant = 'single', className }) => {
  // Simple deterministic random generator for tree structure
  const generateTree = (currentDepth: number, maxDepth: number, id: string): Node => {
    const isLeaf = currentDepth >= maxDepth || (currentDepth > 1 && Math.random() > 0.7);
    
    if (isLeaf) {
      const value = Math.random() > 0.5 ? 'Class A' : 'Class B';
      return { id, label: value, isLeaf: true, value };
    }

    const feature = ['Age', 'Income', 'Score', 'Time'][Math.floor(Math.random() * 4)];
    const threshold = Math.floor(Math.random() * 100);
    
    return {
      id,
      label: `${feature} < ${threshold}`,
      children: [
        generateTree(currentDepth + 1, maxDepth, `${id}-L`),
        generateTree(currentDepth + 1, maxDepth, `${id}-R`),
      ]
    };
  };

  const tree = useMemo(() => generateTree(1, depth, 'root'), [depth, seed]);

  const renderNode = (node: Node, x: number, y: number, offset: number) => {
    return (
      <React.Fragment key={node.id}>
        {node.children && (
          <>
            {/* Lines to children */}
            <line 
              x1={x} y1={y} 
              x2={x - offset} y2={y + 80} 
              stroke="#94a3b8" 
              strokeWidth="2" 
            />
            <line 
              x1={x} y1={y} 
              x2={x + offset} y2={y + 80} 
              stroke="#94a3b8" 
              strokeWidth="2" 
            />
            {renderNode(node.children[0], x - offset, y + 80, offset / 1.8)}
            {renderNode(node.children[1], x + offset, y + 80, offset / 1.8)}
          </>
        )}
        
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <rect 
            x={x - 16} y={y - 16} width="32" height="32" rx="4"
            fill={node.isLeaf ? (node.value === 'Class A' ? '#1A1A1A' : '#ffffff') : '#ffffff'} 
            stroke="#1A1A1A"
            strokeWidth="1.5"
          />
          {node.isLeaf && (
            <text 
              x={x} y={y + 5} 
              textAnchor="middle" 
              className={cn("text-[10px] font-bold", node.value === 'Class A' ? "fill-white" : "fill-ink")}
            >
              {node.value === 'Class A' ? 'A' : 'B'}
            </text>
          )}
          <text 
            x={x} y={y + 35} 
            textAnchor="middle" 
            className="text-[9px] font-bold uppercase tracking-tighter fill-zinc-500"
          >
            {node.label}
          </text>
        </motion.g>
      </React.Fragment>
    );
  };

  return (
    <div className={cn("bg-white rounded-xl border border-slate-200 p-6 overflow-hidden relative", className)}>
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <Trees className="w-5 h-5 text-forest-600" />
        <span className="font-display font-semibold text-slate-900">
          {variant === 'single' ? 'Decision Tree View' : 'Tree Sample'}
        </span>
      </div>
      <svg width="100%" height="400" viewBox="0 0 600 400" preserveAspectRatio="xMidYMin meet">
        <g transform="translate(300, 40)">
          {renderNode(tree, 0, 0, 140)}
        </g>
      </svg>
    </div>
  );
};

export default TreeVisualizer;

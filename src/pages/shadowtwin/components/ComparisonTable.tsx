import React from 'react';
import { ComparisonData } from '../types';

interface ComparisonTableProps {
  data: ComparisonData[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Real You vs
        <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"> ShadowTwin</span>
        <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-full ml-3">AI-Generated</span>
      </h3>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6">
          {data.map((item, index) => (
            <div key={index} className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-teal-400/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="text-white font-bold text-lg">{item.category}</h4>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                  <h5 className="text-gray-400 font-medium mb-2">Real You</h5>
                  <p className="text-white">{item.realYou}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-lg border border-violet-400/20">
                  <h5 className="text-violet-400 font-medium mb-2">ShadowTwin</h5>
                  <p className="text-white">{item.shadowTwin}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
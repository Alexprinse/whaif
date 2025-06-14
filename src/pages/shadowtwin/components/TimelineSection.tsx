import React from 'react';
import { TimelineEvent } from '../types';

interface TimelineSectionProps {
  events: TimelineEvent[];
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ events }) => {
  return (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Your Alternate
        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Timeline</span>
        <span className="text-sm text-green-400 bg-green-500/10 px-2 py-1 rounded-full ml-3">AI-Generated</span>
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-violet-500 via-blue-500 to-cyan-500 rounded-full" />
        
        <div className="space-y-12">
          {events.map((event, index) => (
            <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="p-6 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl hover:border-violet-400/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {event.icon}
                    </div>
                    <div>
                      <p className="text-violet-400 font-bold">Age {event.age}</p>
                      <p className="text-gray-400 text-sm">{event.year}</p>
                    </div>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">{event.title}</h4>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="relative z-10 w-6 h-6 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full border-4 border-black flex-shrink-0" />
              
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
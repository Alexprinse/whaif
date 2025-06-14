import React, { useState } from 'react';
import { X, User, MessageSquare, Briefcase, Sparkles, Camera, Upload, ArrowRight, ArrowLeft } from 'lucide-react';
import { ShadowTwinFormData } from '../types';

interface ShadowTwinInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ShadowTwinFormData) => void;
}

const ShadowTwinInputModal: React.FC<ShadowTwinInputModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ShadowTwinFormData>({
    name: '',
    currentBio: '',
    majorDecisions: '',
    dreamsNotPursued: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 5;

  if (!isOpen) return null;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
        }
        break;
      case 2:
        if (!formData.currentBio.trim()) {
          newErrors.currentBio = 'Please tell us about your current life';
        }
        break;
      case 3:
        if (!formData.majorDecisions.trim()) {
          newErrors.majorDecisions = 'Please share your major life decisions';
        }
        break;
      case 4:
        if (!formData.dreamsNotPursued.trim()) {
          newErrors.dreamsNotPursued = 'Please tell us about dreams you didn\'t pursue';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      currentBio: '',
      majorDecisions: '',
      dreamsNotPursued: ''
    });
    setCurrentStep(1);
    setErrors({});
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, selfie: file });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <User className="text-white" size={20} className="lg:w-6 lg:h-6" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">What's your name?</h3>
              <p className="text-gray-400 text-sm lg:text-base">Let's start with the basics</p>
            </div>
            
            <div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full p-3 lg:p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-400/20 transition-all duration-300 text-center text-base lg:text-lg"
              />
              {errors.name && <p className="text-red-400 text-sm mt-2 text-center">{errors.name}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <MessageSquare className="text-white" size={20} className="lg:w-6 lg:h-6" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Tell us about your current life</h3>
              <p className="text-gray-400 text-sm lg:text-base">Your background, career, relationships, and current situation</p>
            </div>
            
            <div>
              <textarea
                value={formData.currentBio}
                onChange={(e) => setFormData({ ...formData, currentBio: e.target.value })}
                placeholder="Describe your background, education, career, relationships, and current situation..."
                rows={6}
                className="w-full p-3 lg:p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none text-sm lg:text-base"
              />
              {errors.currentBio && <p className="text-red-400 text-sm mt-2">{errors.currentBio}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center">
                <Briefcase className="text-white" size={20} className="lg:w-6 lg:h-6" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">What major life decisions did you make?</h3>
              <p className="text-gray-400 text-sm lg:text-base">Career choices, relationships, education, financial decisions</p>
            </div>
            
            <div>
              <textarea
                value={formData.majorDecisions}
                onChange={(e) => setFormData({ ...formData, majorDecisions: e.target.value })}
                placeholder="Career choices, where you moved, relationships, education paths, financial decisions..."
                rows={6}
                className="w-full p-3 lg:p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 resize-none text-sm lg:text-base"
              />
              {errors.majorDecisions && <p className="text-red-400 text-sm mt-2">{errors.majorDecisions}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                <Sparkles className="text-white" size={20} className="lg:w-6 lg:h-6" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">What dreams did you not pursue?</h3>
              <p className="text-gray-400 text-sm lg:text-base">Creative pursuits, travel dreams, alternative careers</p>
            </div>
            
            <div>
              <textarea
                value={formData.dreamsNotPursued}
                onChange={(e) => setFormData({ ...formData, dreamsNotPursued: e.target.value })}
                placeholder="Creative pursuits, travel dreams, business ideas, alternative careers, relationships..."
                rows={6}
                className="w-full p-3 lg:p-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-pink-400/50 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 resize-none text-sm lg:text-base"
              />
              {errors.dreamsNotPursued && <p className="text-red-400 text-sm mt-2">{errors.dreamsNotPursued}</p>}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Camera className="text-white" size={20} className="lg:w-6 lg:h-6" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Upload a photo (optional)</h3>
              <p className="text-gray-400 text-sm lg:text-base">This helps create a more personalized simulation</p>
            </div>
            
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="selfie-upload"
              />
              <label
                htmlFor="selfie-upload"
                className="flex flex-col items-center justify-center w-full p-6 lg:p-8 bg-black/30 backdrop-blur-md border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 cursor-pointer group"
              >
                {formData.selfie ? (
                  <div className="text-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-cyan-400/30">
                      <img 
                        src={URL.createObjectURL(formData.selfie)} 
                        alt="Your photo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-cyan-400 font-medium text-sm lg:text-base">{formData.selfie.name}</p>
                    <p className="text-gray-500 text-xs lg:text-sm mt-1">Click to change photo</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload size={24} className="lg:w-8 lg:h-8 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <p className="font-medium text-sm lg:text-base">Click to upload your photo</p>
                    <p className="text-xs lg:text-sm text-gray-500 mt-1">JPG, PNG up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-white/10">
          <div className="flex items-center gap-3 lg:gap-4">
            <h2 className="text-lg lg:text-2xl font-bold text-white">Create Your ShadowTwin</h2>
            <div className="flex items-center gap-2 px-2 lg:px-3 py-1 bg-violet-500/20 border border-violet-400/30 rounded-full">
              <span className="text-violet-400 text-xs lg:text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X size={18} className="lg:w-5 lg:h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 lg:px-6 pt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-6">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-t border-white/10">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
          >
            <ArrowLeft size={14} className="lg:w-4 lg:h-4" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 lg:px-8 py-2 lg:py-3 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg text-white font-medium hover:scale-105 transition-all duration-300 text-sm lg:text-base"
          >
            {currentStep === totalSteps ? (
              <>
                <Sparkles size={14} className="lg:w-4 lg:h-4" />
                Generate ShadowTwin
              </>
            ) : (
              <>
                Next
                <ArrowRight size={14} className="lg:w-4 lg:h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShadowTwinInputModal;
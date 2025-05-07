import React from 'react';
import { Button, DotLottiePlayer } from '.';

const StepLayout = ({ 
  title, 
  subtitle,
  animation = "/json/chicolentes.json",
  children,
  onNext,
  onPrev,
  nextLabel = "Next",
  prevLabel = "Previous",
  nextDisabled = false,
  showPrevButton = true
}) => {
  return (
    <div className="bg-[#e8f8ee] rounded-3xl p-6 md:p-10 shadow-sm">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-64 h-64 mb-4">
            <DotLottiePlayer
              src={animation}
              autoplay={true}
              loop={true}
            />
          </div>
          <div className="text-center">
            {title && title.split('\n').map((line, i) => (
              <h2 key={i} className="text-2xl font-bold text-[#147A31]">{line}</h2>
            ))}
            {subtitle && <p className="text-lg text-gray-600 mt-2">{subtitle}</p>}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {children}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        {showPrevButton ? (
          <Button
            variant="secondary"
            onClick={onPrev}
          >
            {prevLabel}
          </Button>
        ) : <div></div>}
        
        <Button
          variant="primary"
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default StepLayout; 
export default function StepIndicator({ currentStep }) {
  const steps = [
    { number: 1, label: 'Upload File' },
    { number: 2, label: 'Add Metadata' },
  ];

  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-button
                ${currentStep >= step.number
                  ? 'bg-brand-primary text-white'
                  : 'bg-neutral-subtle text-text-muted'
                }
              `}
            >
              {step.number}
            </div>
            <span className={`text-caption mt-2 ${currentStep >= step.number ? 'text-text-high' : 'text-text-muted'}`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-24 h-0.5 mx-4 ${currentStep > step.number ? 'bg-brand-primary' : 'bg-neutral-border'}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
